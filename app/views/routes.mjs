import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { utils } from '../modules/utils.mjs';
import { router } from '../modules/jsnode.mjs';
import { purify } from '../modules/purify.mjs';


const routes = {
  portal(stream, data){

    let item = x('div', {class:'row'});

    for (let i = 0; i < data.list.length; i++) {
      item.append(
        x('div', {class: 'col-lg-6'},
          x('div', {class: 'card mb-4'},
            x('div', {class: 'card-body text-center'},
              x('h4', {
                class:'capital',
              }, data.list[i].title),
              x('p', data.list[i].description),
              x('button', {
                class: 'mt-2 btn btn-outline-primary btn-sm sh-95',
                onclick(){
                  router.rout(data.list[i].dest)
                }
              }, 'Select')
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
  hub_user(stream, data){

    let user = data.user,
    src = xdata.app.hub.user_base.replace('{{user}}', user),
    csrc = xdata.app.hub.user_comments.replace('{{user}}', user),
    avatar = x('img', {class: 'img-thumbnail user-img'}),
    headimg = x('img', {class: 'img-fluid'}),
    page_views = x('button', {
      class: 'btn btn-sm btn-outline-primary mr-2'
    }, x('span', {class: 'icon-eye'}), ' Views ', x('span')),
    page_likes = x('button', {
      class: 'btn btn-sm btn-outline-primary ml-2',
      title: 'like '+ user +'\'s profile'
    }, x('span', {class: 'icon-heart'}), ' Likes ', x('span')),
    user_page = x('div',
      x('div', {class: 'hub-head'},
        headimg,
        avatar,
        x('h3', {class: 'mt-2'}, user),
        x('span', {class: 'text-center'}, page_views, page_likes),
        x('hr')
      )
    ),
    user_profile = x('div',
      x('hr', {class: 'mb-4 mt-2'}),
    ),
    item = x('div', user_page, user_profile),
    reactions = xdata.app.hub.user_react.replace('{{user}}', user),
    tk = 'token '+ stream.ssGet('tk'),
    obj = {
      url: reactions,
      opt: xdata.default.stream.react
    },
    jheaders = xdata.default.stream.jsonauth,
    fheaders = xdata.default.stream.fetch;

    obj.opt.headers['Authorization'] = tk;
    obj.opt.body = JSON.stringify({content: 'eyes'});
    jheaders.headers['Authorization'] = tk;
    fheaders.headers['Authorization'] = tk;


    utils.get(src + 'api/profile.json', xdata.default.stream.json, function(err,profileData){
      if(err){return console.error(err)}
      headimg.src = profileData.head_img;

      utils.get(xdata.app.users_data + user, jheaders, function(err,userData){
        if(err){return console.error(err);}
        avatar.src = userData.avatar_url;

        utils.react(obj, function(err,res){
          if(err){console.error(err)}

          let profile_div = x('div', {class: 'row'}),
          skills_div = x('div', {class: 'row'}),
          experience_div = x('div', {class: 'row'}),
          contact_div = x('div', {class: 'row'}),
          showcase_div = x('div', {class: 'row'}),
          keys = Object.keys(profileData.user);

          utils.get_md(src + 'index.md', xdata.default.stream.md, function(err,res){
            if(err){return console.error(err)}
            res = utils.parseMD(res);
            if(typeof res === 'object' && !res.length){
              user_page.append(res)
            } else {
              user_page.append(...res)
            }
          })


          utils.get(csrc, fheaders, function(err,userIssue){
            if(err){return console.error(err);}
            let v = userIssue.reactions.eyes;
            page_views.lastChild.textContent = v;
            page_views.title = v + ' page views';
            page_likes.lastChild.textContent = userIssue.reactions.heart;

          })


          for (let i = 0, keys = Object.keys(profileData.user); i < (keys.length -1); i++) {
            profile_div.append(
              x('div', {class: 'col-lg-6'},
                x('div', {class: 'form-group'},
                  x('label', keys[i]),
                  x('input', {
                    class: 'form-control',
                    type: 'text',
                    readOnly: 'true',
                    value: profileData.user[keys[i]]
                  })
                )
              )
            )
          }

          for (let i = 0; i < profileData.skills.length; i++) {
            skills_div.append(
              x('div', {class: 'col-lg-6'},
                x('div', {class: 'card mb-4'},
                  x('div', {class: 'card-body'},
                    x('h3', profileData.skills[i].type),
                    x('h5', 'Years: ', x('span', profileData.skills[i].years)),
                    x('h5', 'Level: ', x('span', profileData.skills[i].level))
                  )
                )
              )
            )
          }

          for (let i = 0; i < profileData.work_history.length; i++) {
            experience_div.append(
              x('div', {class: 'col-lg-6'},
                x('div', {class: 'card mb-4'},
                  x('div', {class: 'card-body'},
                    x('h5', 'Title: ', x('span', profileData.work_history[i].title)),
                    x('h5', 'Organization: ', x('span', profileData.work_history[i].organization)),
                    x('h5', 'Duration: ', x('span', profileData.work_history[i].duration)),
                    x('h5', 'Role: ', x('span', profileData.work_history[i].role))
                  )
                )
              )
            )
          }

          for (let i = 0; i < profileData.showcase.length; i++) {
            showcase_div.append(
              x('div', {class: 'col-lg-6'},
                x('div', {class: 'card mb-4'},
                  x('div', {class: 'card-body'},
                    x('h5', profileData.showcase[i].title),
                    x('p', x('span', profileData.showcase[i].description)),
                    x('a', {
                      target:'_blank',
                      href: utils.sanitizeURI(profileData.showcase[i].link)
                    }, 'link')
                  )
                )
              )
            )
          }

          for (let i = 0; i < profileData.contact.length; i++) {
            contact_div.append(
              x('div', {class: 'col-lg-6'},
                x('div', {class: 'card mb-4'},
                  x('div', {class: 'card-body'},
                    x('h5', 'Contact type: ', x('span', profileData.contact[i].type)),
                    x('h5', profileData.contact[i].data)
                  )
                )
              )
            )
          }

          user_profile.append(
            x('h2', 'Biography'),
            x('div', {class: 'card mb-4'},
              x('div', {class: 'card-body'},
                x('p', profileData.user.biography)
              )
            ),
            x('hr', {class: 'mb-2 mt-2'}),
            x('h2', 'User data'),
            x('div', {class: 'card mb-4'},
              x('div', {class: 'card-body'},
                profile_div
              )
            ),
            x('hr', {class: 'mb-2 mt-2'}),
            x('h2', 'Skills'),
            skills_div,
            x('hr', {class: 'mb-2 mt-2'}),
            x('h2', 'Experience'),
            experience_div,
            x('hr', {class: 'mb-2 mt-2'}),
            x('h2', 'Showcase'),
            showcase_div,
            x('hr', {class: 'mb-2 mt-2'}),
            x('h2', 'Contact'),
            contact_div
          )

        })
      })
    })



    return item;

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

    
    let obj = {}
    return x('div', {'class': 'row justify-content-center'},
      x('div', {'class': 'col-lg-9'},
        x('div', {'class': 'card'},
          x('div', {'class': 'card-body'},
            x('h3', {'class': 'text-center'}, data.msg),
            x('div', {class: 'form-group'},
              x('input', {
                class: 'form-control mb-2',
                placeHolder: 'name',
                title: '16 characters max',
                onkeyup(evt){
                  let val = evt.target.value;
                  if(val.length > 16){
                    val = evt.target.value = val.slice(0,16);
                  }
                  obj.name = val;
                }
              }),
              x('input', {
                class: 'form-control mb-2',
                placeHolder: 'email',
                title: '32 characters max',
                onkeyup(evt){
                  let val = evt.target.value;
                  if(val.length > 32){
                    val = evt.target.value = val.slice(0,32)
                  }
                  obj.email = val;
                }
              }),
              x('textarea', {
                class: 'form-control mb-2',
                title: '256 characters max',
                placeHolder: 'message',
                rows: 4,
                onkeyup(evt){
                  let val = evt.target.value;
                  if(val.length > 256){
                    val = evt.target.value = val.slice(0,256)
                  }
                  obj.msg = val
                }
              }),
              x('button', {
                class:'btn btn-outline-primary mt-4',
                onclick: function(evt){
                  let tk = stream.ssGet('tk');
                  if(!tk){
                    return utils.toast('danger', 'Login required to post message')
                  }
                  if(
                    !obj.msg || obj.msg.length > 256 ||
                    !obj.email || obj.email.length > 32 ||
                    !obj.name || obj.name.length > 16
                  ){
                    return utils.toast('warning', 'invalid form data')
                  }

                  let data = Object.assign({}, xdata.default.stream.post, {
                    body: JSON.stringify({body:JSON.stringify(obj)})
                  });

                  data.headers['Authorization'] = 'token '+ tk;
                  utils.get(xdata.app.contact.create_message, data, function(err,res){
                    if(err){
                      utils.toast('danger', 'Send message failed');
                      return console.error(err)
                    }
                    utils.toast('success', 'Message sent');
                    evt.target.setAttribute('disabled', '');
                  })

                }
              }, 'Submit')
            )
          )
        ),
        x('h5', {class: 'text-center mt-2'},
          x('a',{
            target: '_blank',
            title: 'contact us directly',
            href: 'mailto://'+ xdata.app.contact.base_email
          },xdata.app.contact.base_email)
        )
      )
    )
  }
}

export { routes }
