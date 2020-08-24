import { x } from './modules/xscript.mjs';

let att = parseInt(sessionStorage.getItem('install')),
cnt = 0,
loading = x('div', {class: 'logo'},
  x('span', 'Trademeet')
),
pc = x('small', '0%'),
install = x('div', {class: 'install'}, 'Installing ', pc),
tpl = x('div', {class: 'loader'},
  x('div', {class: 'overlay one'}),
  x('div', {class: 'overlay two'}),
  x('div', {class: 'cog one'},
    x('div', {class: 'overlay'}),
    x('div', {class: 'wrap one'},
      x('div', {class: 'box one'}),
      x('div', {class: 'box two'}),
      x('div', {class: 'box filler one'}),
      x('div', {class: 'box filler two'}),
      x('div', {class: 'box filler base one'}),
      x('div', {class: 'box filler base two'})
    ),
    x('div', {class: 'wrap two'},
      x('div', {class: 'box one'}),
      x('div', {class: 'box two'}),
      x('div', {class: 'box filler one'}),
      x('div', {class: 'box filler two'}),
      x('div', {class: 'box filler base one'}),
      x('div', {class: 'box filler base two'})
    )
  ),
  x('div', {class: 'cog two'},
    x('div', {class: 'wrap one'},
      x('div', {class: 'box one'}),
      x('div', {class: 'box two'}),
      x('div', {class: 'box filler one'}),
      x('div', {class: 'box filler two'}),
      x('div', {class: 'box filler base one'}),
      x('div', {class: 'box filler base two'})
    ),
    x('div', {class: 'wrap two'},
      x('div', {class: 'box one'}),
      x('div', {class: 'box two'}),
      x('div', {class: 'box filler one'}),
      x('div', {class: 'box filler two'}),
      x('div', {class: 'box filler base one'}),
      x('div', {class: 'box filler base two'})
    ),
    x('div', {class: 'overlay'})
  )
)

document.body.append(loading,install,tpl);

let interval = setInterval(function(){
  cnt++
  pc.textContent = cnt+'%';
  if(cnt === 100){
    clearInterval(interval)
  }
},25)

function reinstall(x,y){
  navigator.serviceWorker.getRegistrations().then(function(reg) {
    for(let registration of reg) {
      registration.unregister();
    }
    setTimeout(function(){
      sessionStorage.setItem('install', y)
      location.reload()
    }, x)
  })
}

if(att && att > 5){
  reinstall(1000,0)
} else {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(function(reg){
      setTimeout(function(){
        sessionStorage.setItem('install', att+1)
        location.reload()
      }, 3000)
    }).catch(function(error){
      reinstall(1000,0)
    });
  } else {
    clearInterval(interval);
    pc.textContent = 'obsolete browser detected';
  }
}

setTimeout(function(){
  reinstall(1000,0)
}, 90000)
