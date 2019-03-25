function send_message_to_sw(msg) {
  // thanks to http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html
  return new Promise(function(resolve, reject){
    // Create a Message Channel
    var msg_chan = new MessageChannel();

    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage = function(event){
      console.log("[u/n] return message received ", event);
      if(event.data.error){
        reject(event.data.error);
      }else{
        resolve(event.data);
      }
    };

    if ('serviceWorker' in navigator) {
      console.log("[u/n] checking if service worker is active...");
      navigator.serviceWorker.ready
        .then(function(swreg) {
          console.log("[u/n] sending message to service worker... accepting reply...");
          swreg.active.postMessage(msg, [msg_chan.port2]);
        })
        .catch(err => {
          reject(err);
        });
    }
  
  });

}

export default send_message_to_sw;