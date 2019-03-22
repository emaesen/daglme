// import 
console.log("[sw] in sw-notifications");

self.addEventListener('message', function(event) {
  console.log("[sw] Message received ", event);
});


self.addEventListener('push', function(event) {
  console.log("[sw] Push Notification received ", event);
});