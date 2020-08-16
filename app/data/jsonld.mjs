let jsonld = [{
  "@context": "http://schema.org/",
  "@graph": [{
    "type": "WebApplication",
    "applicationCategory": "software",
    "author": {
      "id": "x:1"
    },
    "copyrightHolder": {
      "id": "x:1"
    },
    "copyrightYear": "2020",
    "creator": {
      "id": "x:1"
    },
    "dateModified": "2020-12-21T11:35:49-04:00",
    "datePublished": "2020-11-31T19:48:00-05:00",
    "description": "some description",
    "downloadUrl": "https://github.com/angeal185/trademeet",
    "headline": "trademeet",
    "image": "x:2",
    "inLanguage": "en",
    "mainEntityOfPage": "https://angeal185.github.io/trademeet",
    "name": "trademeet",
    "operatingSystem": "Web Browser",
    "publisher": {
      "id": "x:1"
    },
    "url": "https://angeal185.github.io/trademeet"
  },{
    "type":"MediaObject",
    "encodingFormat": "application/atom+xml",
    "contentUrl": "https://angeal185.github.io/trademeet/atom/news.atom",
    "description":	"trademeet news feed",
    "author": {
      "id": "x:1"
    }
  },{
    "type":"MediaObject",
    "encodingFormat": "application/atom+xml",
    "contentUrl": "https://angeal185.github.io/trademeet/atom/issues.atom",
    "description":	"trademeet issues feed",
    "author": {
      "id": "x:1"
    }
  },{
    "type": "BreadcrumbList",
    "description": "Breadcrumbs list",
    "itemListElement": [{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet",
            "name": "Homepage"
        },
        "position": 1
      },{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet/#/forum",
            "name": "Forum"
        },
        "position": 2
      },{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet/#/news",
            "name": "News"
        },
        "position": 3
      },{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet/#/terms",
            "name": "Terms"
        },
        "position": 4
      },{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet/#/contact",
            "name": "Contact"
        },
        "position": 5
      },{
        "type": "ListItem",
        "item": {
            "id": "https://github.com/angeal185/trademeet/#/login",
            "name": "Login"
        },
        "position": 6
      }],
      "name": "Breadcrumbs"
    },{
      "id": "x:1",
      "type": "Person",
      "name": "Ben eaves"
    },{
      "id": "x:2",
      "type": "ImageObject",
      "height": "250",
      "url": "https://angeal185.github.io/trademeet/app/img/logo.png",
      "width": "250"
    }]
}]

export { jsonld }
