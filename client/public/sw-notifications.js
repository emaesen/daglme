// import 
console.log("[sw-n] in sw-notifications");

self.addEventListener('message', function(event) {
  console.log("[sw-n] Message received: ", event);
  event.ports[0].postMessage("Reply from [sw-n]: message received");
  event.ports[0].start();
});


self.addEventListener('push', function(event) {
  console.log("[sw-n] Push Notification received: ", event);
});