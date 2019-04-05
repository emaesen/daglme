export default function send_message_to_sw(msg) {
  // based on http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html
  return new Promise(function(resolve, reject){
    // Create a Message Channel
    var msg_chan = new MessageChannel();

    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage = function(event){
      //console.log("[u/msg] return message received ", event);
      if(event.data.error){
        reject(event.data.error);
      }else{
        resolve(event.data);
      }
    };

    if ('serviceWorker' in navigator) {
      //console.log("[u/msg] checking if service worker is active...");
      navigator.serviceWorker.ready
        .then(function(swreg) {
          //console.log("[u/msg] sending message to service worker... accepting reply...");
          swreg.active.postMessage(msg, [msg_chan.port2]);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      reject("'serviceWorker' is not available");
    }
  
  });

}
