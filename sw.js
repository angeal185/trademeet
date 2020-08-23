importScripts('./app/js/digest.js', './app/js/crypt.js');



let ORIGIN =
'https://angeal185.github.io/trademeet',
//'http://localhost:8000',
DEV_MODE = false,
CACHE_VERSION = 1,
CURRENT_CACHES = {
  static: 'static-cache-v1'
},
STATIC_FILES = [
  '/app/manifest.webmanifest',
  '/app/defaults.mjs',
  '/app/main.mjs',
  '/app/data/xdata.mjs',
  '/app/data/jsonld.mjs',
  '/app/data/routes.mjs',
  '/app/views/xviews.mjs',
  '/app/views/routes.mjs',
  '/app/views/tpl.mjs',
  '/app/modules/jsnode.mjs',
  '/app/modules/router.mjs',
  '/app/modules/stream.mjs',
  '/app/modules/utils.mjs',
  '/app/modules/xidb.mjs',
  '/app/modules/xscript.mjs',
  '/app/modules/xutils.mjs',
  '/app/css/bootstrap.min.css',
  '/app/css/main.min.css',
  '/app/fonts/roboto-regular.woff2',
  '/app/fonts/roboto-bold.woff2',
  '/app/fonts/roboto-light.woff2',
  '/app/fonts/roboto-medium.woff2',
  '/app/fonts/ico.woff2'
],
CONTENT_TYPES = [
//  'application/javascript',
//  'text/css',
  'text/html',
//  'font/woff2'
],
hub_base = 'https://angeal185.github.io/trademeet-hub',
github_api = 'https://api.github.com',
CSP = "default-src 'self';img-src *;object-src 'none';frame-src 'none';block-all-mixed-content;upgrade-insecure-requests;connect-src https://*.github.io/trademeet-user-hub/ https://angeal185.github.io/trademeet/ http://localhost:8000 https://raw.githubusercontent.com/wiki/angeal185/trademeet/ "+ ORIGIN +"/ "+ hub_base +"/ "+ github_api,
FP = "microphone 'none'",
BASE_PAGE = new Blob(['<!DOCTYPE html><script src="./app/main.mjs" type="module" name="main" defer></script></head><body></body></html>'], {type : 'text/html'})

for (let i = 0; i < STATIC_FILES.length; i++) {
  STATIC_FILES[i] = ORIGIN + STATIC_FILES[i]
}

if(!DEV_MODE){
  self.addEventListener('install', function(event){
    event.waitUntil(
      caches.open(CURRENT_CACHES.static).then(function(cache){
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
          throw 'error'
        })

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
