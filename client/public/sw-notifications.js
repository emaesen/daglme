// import 
console.log("[sw] in sw-notifications");

self.addEventListener('message', function(event) {
  console.log("[sw] Message received: ", event);
  event.ports[0].postMessage("Reply from [sw]: message received");
  event.ports[0].start();
});


self.addEventListener('push', function(event) {
  console.log("[sw] Push Notification received: ", event);
});