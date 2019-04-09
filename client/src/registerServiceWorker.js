/* eslint-disable no-console */

import { register } from 'register-service-worker'

function postMsg(msg, swreg) {
  if (swreg && swreg.active) {
    swreg.active.postMessage({msg: msg});
  } else {
    self.navigator.serviceWorker.ready.then(function(reg) {
      reg.active.postMessage({msg: msg});
    })  
  }
}


if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (swreg) {
      console.log('[rsw] App is served from cache.');
      postMsg("sw:ready", swreg)
    },
    registered (swreg) {
      console.log('[rsw] Service worker has been registered.')
      postMsg("sw:registered", swreg)
    },
    cached (swreg) {
      console.log('[rsw] Content has been cached for offline use.')
      postMsg("sw:cached", swreg)
    },
    updatefound (swreg) {
      console.log('[rsw] New content is downloading.')
      postMsg("sw:updatefound", swreg)
    },
    updated (swreg) {
      console.log('[rsw] New content is available; please refresh.')
      postMsg("sw:updated", swreg)
    },
    offline () {
      console.log('[rsw] No internet connection found. App is running in offline mode.')
      postMsg("sw:offline")
    },
    error (error) {
      console.error('[rsw] Error during service worker registration:', error)
      postMsg("sw:error:" + error);
    }
  })
}
