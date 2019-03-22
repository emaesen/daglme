function send_message_to_sw(msg) {
  if ('serviceWorker' in navigator) {
    console.log("[u/n] checking if service worker is active...");
    navigator.serviceWorker.ready
      .then(function(swreg) {
        console.log("[u/n] sending message to service worker...");
        swreg.active.postMessage(msg);
      });
  }
}

export default send_message_to_sw;