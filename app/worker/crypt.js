
const wcs = self.crypto.subtle;
const crypt = {
  fetch(src, obj, cb){
    self.fetch(src, {
      method: 'GET',
      headers: {
        'Content-Type': obj.ct
      }
    })
    .then(function(res){
      if (res.status >= 200 && res.status < 300) {
        res.text().then(function(data){
          cb(false, data)
        });
      } else {
        return Promise.reject(new Error(res.statusText))
      }
    })
    .catch(function(err){
      cb(err)
    })
  },
  hash(str, cb){
    str = new TextEncoder().encode(str);
    wcs.digest({name: "SHA-512"},str)
    .then(function(hash){
      hash =  String.fromCharCode.apply(null, new Uint8Array(hash))


      cb(false, btoa(hash));
    })
    .catch(function(err){
      cb(err)
    });
  },
  getHash(itype){
    let scripts = digest[itype].items,
    cnt = 0
    for (let i = 0; i < scripts.length; i++) {
      crypt.fetch(scripts[i].url, {ct: digest.scripts.ct}, function(err,res){
        if(err){return console.log(err)}
        crypt.hash(res, function(err,hash){
          if(err){return console.log(err)}
          scripts[i].hash = hash;
          cnt++
          if(cnt === scripts.length){
            console.log(JSON.stringify(scripts,0,2))
          }
        })

      })
      // body...
    }
  }
}
