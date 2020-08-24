let ORIGIN =
'https://angeal185.github.io/trademeet',
//'http://localhost:8000',
DEV_MODE = false,
CACHE_VERSION = 1,
CURRENT_CACHES = {
  static: 'static-cache-v1'
},
STATIC_FILES = [
  '/app/defaults.mjs',
  '/app/main.mjs',
  '/app/data/xdata.mjs',
  '/app/data/jsonld.mjs',
  '/app/data/routes.mjs',
  '/app/views/xviews.mjs',
  '/app/views/routes.mjs',
  '/app/views/tpl.mjs',
  '/app/modules/jsnode.mjs',
  '/app/modules/router.mjs',
  '/app/modules/stream.mjs',
  '/app/modules/utils.mjs',
  '/app/modules/xidb.mjs',
  '/app/modules/xscript.mjs',
  '/app/modules/xutils.mjs',
  '/app/css/bootstrap.min.css',
  '/app/css/main.min.css',
  '/app/fonts/roboto-regular.woff2',
  '/app/fonts/roboto-bold.woff2',
  '/app/fonts/roboto-light.woff2',
  '/app/fonts/roboto-medium.woff2',
  '/app/fonts/ico.woff2'
],
CONTENT_TYPES = [
//  'application/javascript',
  'text/css',
  'text/html',
//  'font/woff2'
],
hub_base = 'https://angeal185.github.io/trademeet-hub',
github_api = 'https://api.github.com',
CSP = "default-src 'self';img-src *;object-src 'none';frame-src 'none';block-all-mixed-content;upgrade-insecure-requests;connect-src https://*.github.io/trademeet-user-hub/ https://angeal185.github.io/trademeet/ http://localhost:8000 https://raw.githubusercontent.com/wiki/angeal185/trademeet/ "+ ORIGIN +"/ "+ hub_base +"/ "+ github_api,
FP = "microphone 'none'",
BASE_PAGE = new Blob(['<!DOCTYPE html><script src="./app/main.mjs" type="module" name="main" defer></script></head><body></body></html>'], {type : 'text/html'})

for (let i = 0; i < STATIC_FILES.length; i++) {
  STATIC_FILES[i] = ORIGIN + STATIC_FILES[i]
}
