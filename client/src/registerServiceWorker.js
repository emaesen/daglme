/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (swreg) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB', swreg
      );
      swreg.active.postMessage({msg: "sw:ready"});
    },
    registered (swreg) {
      console.log('Service worker has been registered.', swreg)
    },
    cached (swreg) {
      console.log('Content has been cached for offline use.', swreg)
    },
    updatefound (swreg) {
      console.log('New content is downloading.', swreg)
    },
    updated (swreg) {
      console.log('New content is available; please refresh.', {swreg, self})
      if (swreg.active) {
        console.log({swregActive: swreg.active});
        swreg.active.postMessage({msg: "sw:updated"});
      } else {
        self.navigator.serviceWorker.ready.then(function(reg) {
          console.log({reg});
          reg.active.postMessage({msg: "sw:updated"});
          // reg.clients.matchAll().then(function (clients){
          //   clients.forEach(function(client){
          //     console.log("client", client);
          //     client.postMessage({
          //       msg: "sw-updated"
          //     });
          //   });
          // });
        })  
      }
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
