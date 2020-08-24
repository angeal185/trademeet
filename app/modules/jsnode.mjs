if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function(reg){
    console.log('%cService-worker: %conline', 'color:cyan', 'color:lime');
  }).catch(function(error){
    console.log('%cService-worker: %coffline', 'color:cyan', 'color:red');
  });
}

import { router, stream, defaults } from './router.mjs'
import { x } from './xscript.mjs'
export { router, stream, defaults, x}
