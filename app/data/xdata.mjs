import { routes } from './routes.mjs';
import { jsonld } from './jsonld.mjs';

// defaults
const repo = 'angeal185/trademeet-issues',
news_repo = 'angeal185/trademeet-news',
report_repo = 'angeal185/trademeet-report',
base_email = 'trademeet@protonmail.ch',
hub_repo = 'angeal185/trademeet-hub',
report_repo_issue = '1',
report_message = '2',
news_id = 142029577,
origin = 'https://angeal185.github.io/trademeet',
code_base = 'https://github.com/angeal185/trademeet',
hub_base = 'https://angeal185.github.io/trademeet-hub',
github_api = 'https://api.github.com',
api = origin +'/api',
issues_feed = origin +'/atom/issues.atom',
news_feed = origin +'/atom/news.atom';

const xdata = Object.assign({
  default:{
    version: '1.0.0', // don't delete me
    title: 'trademeet',
    logo: './app/img/logo.png',
    origin: origin,
    params: true,
    error: '/error',
    base_path: '/portal',
    delete_meta: false,
    webmanifest: './app/manifest.webmanifest',
    base_script_name: 'main',
    csp: '',
    meta: [{
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },{
      name: 'msapplication-config',
      content: './app/browserconfig.xml'
    },{
      name: 'apple-mobile-web-app-title',
      content: 'trademeet'
    },{
      name: 'application-name',
      content: 'trademeet'
    }],
    styles:[{
      href: './app/css/bootstrap.min.css',
      rel: 'stylesheet'
    },{
      href: './app/css/main.min.css',
      rel: 'stylesheet'
    },{
      rel: 'alternate',
      type: 'application/atom+xml',
      title: "trademeet issues feed",
      href: issues_feed
    },{
      rel: 'alternate',
      type: 'application/atom+xml',
      title: "trademeet news feed",
      href: news_feed
    },{
      rel: 'apple-touch-icon',
      href: './app/img/ico/apple-touch-icon.png',
      sizes: '180x180'
    },{
      rel: 'mask-icon',
      href: './app/img/ico/safari-pinned-tab.svg',
      color: '#000000'
    }],
    js_head:[],
    js_body:[],
    jsonLD: jsonld,
    strip_unsafe: ['eval'],
    storage: {
      max_age: 9999999999,
      prefix: 'rt'
    },
    stream: {
      download: {
        type: 'text/plain',
        charset: 'utf-8'
      },
      json: {
        method: 'GET',
        headers: {
          'Sec-Fetch-Dest': 'object',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      },
      jsonauth: {
        method: 'GET',
        headers: {
          'Sec-Fetch-Dest': 'object',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      },
      fetch: {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.squirrel-girl-preview',
          'Content-Type': 'application/json',
          'Sec-Fetch-Dest': 'object',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      },
      post: {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json ',
          'Content-Type': 'application/json',
          'Sec-Fetch-Dest': 'object',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      },
      react: {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.squirrel-girl-preview',
          'Content-Type': 'application/json',
          'Sec-Fetch-Dest': 'object',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      },
      md: {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Sec-Fetch-mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      }
    },
    idb: {
      version: 1,
      title: "db",
      objects: ["cache"],
      cache_maxage: 60000
    }
  },
  app: {
    api: api,
    search: github_api +'/search/',
    forum_id: 142029577,
    user_logo: './app/img/user.png',
    user_data: github_api +'/user',
    users_data: github_api+ '/users/',
    code_base: code_base,
    hub_base: hub_base,
    new_token_base: github_api +'/settings/tokens/new',
    issues_feed: issues_feed,
    news_feed: news_feed,
    comment_per_page: 100,
    hub: {
      user_base: 'https://{{user}}.github.io/trademeet-user-hub/',
      user_react: github_api +'/repos/{{user}}/trademeet-user-hub/issues/1/reactions',
      user_comments: github_api +'/repos/{{user}}/trademeet-user-hub/issues/1'
    },
    contact: {
      base_email: base_email,
      create_message: github_api +'/repos/'+ report_repo +'/issues/'+ report_message +'/comments',
    },
    forum: {
      latest_issues_max: 3,
      max_tags: 3,
      max_tag_length: 16,
      max_issue_length: 500,
      max_issue_title_length: 32,
      max_comment_length: 500,
      issues_per_page: 100, // don't change me yet
      base_url: github_api +'/'+ repo +'/repos/issues',
      tag_cloud_len: 20,
      cat_search: github_api +'/search/issues?q=[cat:{{category}}]in:title+repo:'+ repo +'+type:issue+state:open&page={{page}}',
      search: github_api +'/search/issues?q={{search}}in:title+repo:'+ repo +'+type:issue+state:open&page={{page}}',
      cat_issue: github_api +'/repos/'+ repo +'/issues/{{issue}}/comments?page={{page}}',
      latest: github_api +'/repos/'+ repo +'/issues?sort=created&state=open&per_page=30',
      popular: github_api +'/repos/'+ repo +'/issues?sort=comments&state=open&per_page=30',
      create_issue: github_api +'/repos/'+ repo +'/issues',
      create_comment: github_api +'/repos/'+ repo +'/issues/{{issue}}/comments',
      create_report: github_api +'/repos/'+ report_repo +'/issues/'+ report_repo_issue +'/comments',
      user_issues: github_api +'/search/issues?q=[catin:title+repo:'+ repo +'+type:issue+state:open+{{type}}:{{user}}',
    },
    news: {
      base_url: github_api +'/'+ news_repo +'/repos/issues',
      news_issue: github_api +'/repos/'+ news_repo +'/issues/{{issue}}/comments',
      issues: github_api +'/search/issues?q=+repo:'+ news_repo +'+type:issue+state:open+label:news&page={{page}}'
    }
  }
}, routes)

export { xdata }
