importScripts('./app/worker/config.js','./app/worker/digest.js', './app/worker/crypt.js');

function install(cache){
  let url = ORIGIN + '/'
  fetch(url).then(function(res){
    if (res.status >= 200 && res.status < 300) {

      let resclone = new Response(BASE_PAGE, {
        status:200,
        statusText: 'OK',
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Length": res.headers.get("Content-Length"),
          "Content-Security-Policy": CSP,
          "Date": res.headers.get("date"),
          "Digest": "sha-512="+ digest.index,
          "Feature-Policy": FP,
          "Last-Modified": res.headers.get("Last-Modified"),
          "Server": "Anon",
          "Strict-Transport-Security": "max-age=31536000",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block"
        }
      });
      cache.put(url, resclone).then(function(res) {
        return //cache.addAll(STATIC_FILES);
      });

    } else {
      return Promise.reject(new Error(res.statusText))
    }
  })
  .catch(function(err){
    console.log(err)
    throw 'error'
  })
}

if(!DEV_MODE){
  self.addEventListener('install', function(event){
    event.waitUntil(
      caches.open(CURRENT_CACHES.static).then(function(cache){
        return install(cache);
      })
    );
  });


/*
  self.addEventListener('activate', function(event) {

    const expected = new Set(Object.values(CURRENT_CACHES));
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (!expected.has(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
*/


  self.addEventListener('fetch', function(event) {

    event.respondWith(
      caches.open(CURRENT_CACHES.static).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          if(response){
            return response;
          }

          return fetch(event.request.clone()).then(function(response) {
            if (
              response.status < 400 &&
              response.headers.has('content-type') &&
              CONTENT_TYPES.indexOf(response.headers.get('content-type')) !== -1
            ) {

              cache.put(event.request, response.clone());
            }
            return response;
          });
        }).catch(function(error) {
          console.error('  Error in fetch handler:', error);
        });
      })
    );
  });

}
