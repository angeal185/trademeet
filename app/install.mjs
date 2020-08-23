if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then(function(reg){
    setTimeout(function(){
      location.reload()
    }, 3000)
  }).catch(function(error){
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });
    console.log('%cService worker offline', 'color:red');
  });
}

setTimeout(function(){
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
},10000)
