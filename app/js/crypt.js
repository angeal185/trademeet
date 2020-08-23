const wcs = self.crypto.subtle;
const crypt = {
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
  }
}
