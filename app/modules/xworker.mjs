import { utils } from './utils.mjs'
function xworker(){
  let worker = new Worker('./worker.js');
  window.removeEventListener('start-worker', xworker)

  worker.onmessage = function(evt){
    evt = evt.data;

    if(evt.type === 'reload'){
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister().then(function(registrations) {
            utils.toast('info', 'app reload required');
            setTimeout(function(){
              location.reload()
            },2000)
          })
        }
      });

    }
  }

  worker.postMessage({type: 'validate'});
}

export { xworker }
