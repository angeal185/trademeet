importScripts('./app/worker/config.js','./app/worker/digest.js', './app/worker/crypt.js');

function install(cache){
  let url = ORIGIN + '/'
  fetch(url).then(function(res){
    if (res.status >= 200 && res.status < 300) {

      let resclone = new Response(BASE_PAGE, {
        status:200,
        statusText: 'ok',
        url: ORIGIN +'/',
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Language": "en-US",
          "Content-Length": res.headers.get("Content-Length"),
          "Content-Security-Policy": CSP,
          "Date": res.headers.get("date"),
          "Digest": "sha-512="+ digest.index,
          'Expect-CT': EXPECT_CT,
          "Feature-Policy": FP,
          "Last-Modified": res.headers.get("Last-Modified"),
          "NEL": NEL,
          'Report-To': REPORT_TO,
          "Server": "Anon",
          "Strict-Transport-Security": "max-age=31536000",
          "Set-Cookie": "session=ok; Max-Age=999999",
          "X-Content-Dest": "index",
          "X-Content-Type-Options": "nosniff",
          "X-DNS-Prefetch-Control": "off",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block"
        }
      });
      return cache.put(url, resclone);
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
    self.skipWaiting();
    caches.open(CURRENT_CACHES.static).then(function(cache){
      self.skipWaiting();
      return install(cache);
    })
  });



  self.addEventListener('activate', function(event) {
    self.skipWaiting();    
  });



  self.onfetch = function(event) {

    if(event.request.method !== 'GET'){
      return fetch(event.request).then(function(response) {
        return response
      })
    }

    let req,integ;
    if(STATIC_FILES.indexOf(event.request.url) !== -1){
      for (let i = 0; i < digest.items.length; i++) {
        if(ORIGIN + digest.items[i].url === event.request.url){
          integ = 'sha384-' + digest.items[i].hash;
        }
      }
      console.log(event.request)
      req = new Request(event.request.url , {
        bodyUsed: event.request.bodyUsed,
        cache: "reload",
        credentials: "omit",
        mode: "same-origin",
        destination: event.request.destination,
        headers: event.request.headers,
        integrity: integ,
        isHistoryNavigation: false,
        keepalive: false,
        method: event.request.method,
        redirect: "error",
        referrerPolicy: "no-referrer",
        signal: event.request.signal,
        status: 200
      });

      console.log(req)

    } else {
      req = event.request;
    }




    event.respondWith(
      caches.open(CURRENT_CACHES.static).then(function(cache) {
        return cache.match(req).then(function(response) {

          if(response && response.headers){

            if(response.headers.get("X-Content-Dest") === 'index'){
              return response;
            }

            let compare = response.headers.get("Digest");
            if(response && compare){
              for (let i = 0; i < digest.items.length; i++) {
                if('sha384-'+digest.items[i].hash === compare){
                  return response;
                }
              }
            }

          }


          return fetch(req.clone()).then(function(response) {
            let res;
            if (response.status < 400 && integ) {
              res = new Response(response.body, {
                status:200,
                statusText: 'ok',
                headers: {
                  "Content-Type": response.headers.get("Content-Type"),
                  "Content-Length": response.headers.get("Content-Length"),
                  "Digest": integ,
                  "Server": "Anon"
                }
              })
              cache.put(req, res.clone());
            } else {
              res = response
            }
            return res;
          });
        }).catch(function(error) {
          console.error('  Error in fetch handler:', error);
        });
      })
    );
  }

}

self.onmessage = function(evt){
  if (evt.data.type === 'update'){
    self.registration.update();
     return self.skipWaiting();
  }
}
