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
      caches.open(CURRENT_CACHES.static).then(function(cache) {
        let scripts = digest.scripts.items,
        css = digest.css.items,
        fonts = digest.fonts.items,
        arr = [scripts,css,fonts];

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

        for (let x = 0; x < arr.length; x++) {
          for (let i = 0; i < arr[x].length; i++) {
            cache.match(ORIGIN + arr[x][i].url).then(function(res) {
              if(res){
                res.text().then(function(data){
                  crypt.hash(data, function(err,hash){
                    if(err){return console.log(err)}
                    if(hash !== arr[x][i].hash){
                      cache.delete(arr[x][i].url).then(function(){
                        fetch(ORIGIN + arr[x][i].url)
                        .then(function(){
                          console.log('%cWeb-worker: %ccache item '+ arr[x][i].url +' updated', 'color:cyan', 'color:lime');
                        })
                        .catch(function(){
                          console.log('%cWeb-worker: %ccache item '+ arr[x][i].url +' update failed', 'color:cyan', 'color:red');
                        });
                      })
                    }
                  })
                })
              }
            })
          }
        }
      })

    }

  },
  onerror(err){
    console.error(err)
  }
}

Object.assign(self, obj);

console.log('%cWeb-worker: %conline', 'color:cyan', 'color:lime');
