const crypto = require('crypto'),
watch = require('./admin/watch'),
fs = require('fs');



function ud(){

  for (let i = 0; i < watch.items.length; i++) {
    watch.items[i].hash = crypto.createHash('sha384').update(fs.readFileSync('.'+ watch.items[i].url)).digest('base64');
  }
  let str = 'const digest = '+ JSON.stringify(watch,0,2)
  fs.writeFileSync('./app/worker/digest.js', str)
}

for (let i = 0; i < watch.items.length; i++) {
  fs.watchFile('.'+ watch.items[i].url, function(curr, prev){
    console.log('updating '+ watch.items[i].url)
    ud()
  });
}
