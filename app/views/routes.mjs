import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { utils } from '../modules/utils.mjs';
import { router } from '../modules/jsnode.mjs';
import { purify } from '../modules/purify.mjs';


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

    let item = x('div', {class: 'form-control'},
      x('div', {class: 'input-group'},
        x('input', {
          class: 'form-control',
          placeHolder: 'search hub...'
        }),
        x('div', {class: 'input-group-append'},
          x('div', {
            class: 'icon-search input-group-text',
            onclick(){
              utils.get('./api/hub.json', xdata.default.stream.json, function(err,res){
                if(err){
                  utils.toast('danger', 'Failed to fetch hub data');
                  return console.error(err)
                }

              })
            }
          })
        )
      )
    )

    return item
  },
  wiki_article(stream, data){

    let loading = x('div', 'Fetching data', x('span',{class: 'spinner-grow spinner-grow-sm ml-2'}))
    let item = x('div', loading)
    utils.get_md(data.url, xdata.default.stream.md, function(err,res){
      if(err){
        utils.toast('danger', 'Failed to fetch wiki data');
        item.append(x('p', 'Failed to fetch wiki data'));
        console.error(err)
      } else {
        item.append(...utils.parseMD(res));
      }
      loading.remove();
    })
    return item;
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

      let wrow = x('div'),
      witem;

      for (let i = 0; i < res.length; i++) {
        witem = x('div', {class: 'list-group'},
          x('div', {class: 'list-group-item active'}, res[i].category)
        )
        for (let j = 0; j < res[i].items.length; j++) {
          witem.append(
            x('div', {
                class: 'list-group-item cp',
                onclick(){
                  router.rout('/wiki/article', {
                    url: res[i].base_url + res[i].items[j].path,
                    data: res[i].items[j]
                  })
                }
              },
              x('img', {
                class: 'min-img mr-3',
                title: 'Author: '+ res[i].items[j].author,
                src: res[i].items[j].avatar,
              }),
              x('span', res[i].items[j].title),
              x('span', {class: 'icon-clock float-right', title: 'Read time'},
                res[i].items[j].duration
              )
            )
          )
        }
        wrow.append(witem)
      }
      item.append(wrow)
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
