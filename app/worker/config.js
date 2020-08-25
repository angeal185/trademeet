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
  'text/html'
//  'font/woff2'
],
hub_base = 'https://angeal185.github.io/trademeet-hub',
github_api = 'https://api.github.com',
RT = "https://trademeet.report-uri.com/a/d/g",
RP = "https://trademeet.report-uri.com/r/d/csp/enforce",
ECT = "https://trademeet.report-uri.com/r/d/ct/enforce",
NEL = '{"report_to":"default","max_age":31536000,"include_subdomains":false}',
CSP = "default-src 'self';img-src *;object-src 'none';frame-src 'none';block-all-mixed-content;upgrade-insecure-requests;connect-src https://*.github.io/trademeet-user-hub/ https://angeal185.github.io/trademeet/ http://localhost:8000 https://raw.githubusercontent.com/wiki/angeal185/trademeet/ "+ ORIGIN +"/ "+ hub_base +"/ "+ github_api +';report-to default;report-uri '+ RP +';',
FP = "accelerometer 'none';autoplay 'none';camera 'none';document-domain 'none';encrypted-media 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';magnetometer 'none';microphone 'none';xr-spatial-tracking 'none';usb 'none';sync-xhr 'self';picture-in-picture 'none';payment 'none';midi 'none';",
EXPECT_CT = 'report-uri="'+ ECT +'", enforce, max-age=31536000',
REPORT_TO = '{"group":"default","max_age":31536000,"endpoints":[{"url":'+ RT +'}],"include_subdomains":false}',
BASE_PAGE = new Blob(['<!DOCTYPE html><script src="./app/main.mjs" type="module" name="main" defer></script></head><body></body></html>'], {type : 'text/html'})

for (let i = 0; i < STATIC_FILES.length; i++) {
  STATIC_FILES[i] = ORIGIN + STATIC_FILES[i]
}
