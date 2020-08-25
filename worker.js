importScripts(
  './app/worker/config.js',
  './app/worker/digest.js',
  './app/worker/crypt.js'
);

let obj = {
  onmessage(evt){
    if(!evt.isTrusted){return;}

    evt = evt.data;

    if(evt.type === 'validate'){
      console.log('%cWeb-worker: %cvalidating cache items', 'color:cyan', 'color:lime');
      let expected = new Set(Object.values(CURRENT_CACHES));

      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (!expected.has(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      })

      caches.open(CURRENT_CACHES.static).then(function(cache) {

        cache.match(ORIGIN +'/').then(function(res) {
          if(res){
            res.text().then(function(data){
              crypt.hash(data, function(err,hash){
                if(err){return console.log(err)}
                if(hash !== digest.index){
                  cache.delete(ORIGIN +'/').then(function(){
                    self.postMessage({type: 'reload'});
                  })
                }
              })
            })
          }
        })

      })

    }

  },
  onerror(err){
    console.error(err)
  }
}

Object.assign(self, obj);

console.log('%cWeb-worker: %conline', 'color:cyan', 'color:lime');
