import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { utils } from '../modules/utils.mjs';
import { router } from '../modules/jsnode.mjs';

const routes = {
  portal(stream, data){
    let arr = ['developers', 'entrepreneurs'],
    item = x('div', {class:'row'});

    for (let i = 0; i < arr.length; i++) {
      item.append(
        x('div', {class: 'col-lg-6'},
          x('div', {class: 'card'},
            x('div', {class: 'card-body text-center'},
              x('h4', {
                class:'capital',
                onclick(){

                }
              }, arr[i]),
              x('p', 'I am seeking ', arr[i]),
              x('button', {
                class: 'mt-2 btn btn-outline-primary sh-95'
              }, 'Seek')
            )
          )
        )
      )
    }

    return item
  },
  developers(stream, data){

  },
  entrepreneurs(stream, data){

  },
  hub(stream, data){

  },
  wiki(stream, data){

    let item = x('div',
      x('h3', data.msg)
    )
    utils.get('./api/wiki.json', xdata.default.stream.json, function(err,res){
      if(err){
        utils.toast('danger', 'Failed to fetch wiki data');
        return console.error(err)
      }
      console.log(res)
    })
    
    return item;
  },
  terms(stream, data){
    return x('p', data.msg)
  },
  contact(stream, data){
    return x('p', data.msg)
  }
}

export { routes }
