console.log("[sw-n] in sw-notifications");

let isClockStartPending = false;
let timerID;
let isNotificationGranted = false;
let reminderTime = null;
let reminderHour = null;
let reminderMinute = null;



self.addEventListener('activate', function (event) {
  console.log('[sw-n] Activate Service Worker ....', event);
  // event.waitUntil(
  //   // do something
  // );
  return self.clients.claim();
});

self.addEventListener('message', function(event) {
  console.log("[sw-n] Message received: ", event.data);
  //event.ports[0].postMessage("Reply from [sw-n]: message '" + event.data.action + "' received");
  switch (event.data.action) {
    case "setNotificationParams":
      setNotificationParams(event.data.payload);
      event.ports[0].postMessage("Reminder settings updated");
      break;
    case "spawnNotification":
      spawnNotification(event.data.payload);
      event.ports[0].postMessage("Notification spawned");
      break;
    default:
      event.ports[0].postMessage("Unknown command: " + event.data.action);
  }
});


self.addEventListener('push', function(event) {
  // push notification event using payload
  // {"action":"spawnNotification", "opts":{"body":"YOUR PUSH NOTIFICATION"}}
  console.log("[sw-n] Push event received: ", event);
  let data = "";
  if (event.data) {
    data = JSON.parse(event.data.text());
    console.log("[sw-n] Push data received: ", data);
    if (data.action === "spawnNotification") {
      spawnNotification({body:data.opts.body});
    }
  }
});


function spawnNotification(opts /*body, duration, title, doVibrate*/) {
  let title = opts.title || "Daily Global Meditation";
  let duration = opts.duration * 1000 || 5 * 60 * 1000;
  let options = {
      body: opts.body,
      icon: '/img/icon-96x96.png',
      image: '/img/daily-global-meditation-reminder.jpg',
      badge: '/img/daily-global-meditation-reminder.jpg',
      tag: 'daglme',
      requireInteraction: true
  };
  if (opts.doVibrate) {
    options.vibrate = [100, 200, 100, 50, 100];
  }
  //let n = new Notification(title, options);
  //setTimeout(n.close.bind(n), duration);


  self.registration.showNotification(title, options)
  .then(() => {
    self.registration.getNotifications(options).then(function(notifications) {
      // do something with your notifications
      console.log("[sw-n] active notifications", {notifications, duration});
      setTimeout(() => {
        console.log("[sw-n] closing active notification");
        notifications && notifications[0].close();
      }, duration);
    }) 
  });


}


function startClock() {
  stopClock();
  if(isNotificationGranted && !isClockStartPending) {
    // clock ticks once every minute
    let multiplier = 60;
    let delay = 60 - new Date().getSeconds();
    console.log("[sw-n] Initialize the clock - start in " + delay + " seconds");
    setTimeout(() => {
      timerID = setInterval(ticktock, multiplier * 1000);
      console.log("[sw-n] Start the clock (" + timerID + ")");
      ticktock();
      isClockStartPending = false;
    }, delay * 1000);
    isClockStartPending = true;
  }
}

function stopClock() {
  if (timerID) {
    console.log("[sw-n] Stop the clock (" + timerID + ")");
    clearInterval(timerID);
    timerID = null;
  }
}

function ticktock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  console.log("[sw-n] tick tock (" + timerID + ") " + hours + ":" + minutes + " (" + reminderTime + ")");
  if (hours === 0 && minutes === 0) {
    // restart/recalibrate the clock
    console.log("[sw-n] Recalibrate the clock");
    startClock();
  }
  if (isNotificationGranted && 
      hours === reminderHour && minutes === reminderMinute) {
    spawnNotification({
      body:"For 5 minutes, envision the Earth and Sky as Illumined and Whole...\nThanks for your participation!"
    });
    console.log("[sw-n] Your Daily Global Meditation Reminder");
  }
}

function setNotificationParams(params) {
  console.log("[sw-n] Update notification params", params, {isNotificationGranted_old: isNotificationGranted});
  if (isNotificationGranted===false && params.isNotificationGranted===true) {
    // use 0 delta to ensure isNotificationGranted is set
    setTimeout(startClock,0);
  }
  if (isNotificationGranted===true && params.isNotificationGranted===false) {
    // use 0 delta to ensure isNotificationGranted is set
    setTimeout(stopClock,0);
  }
  isNotificationGranted = params.isNotificationGranted;
  reminderTime = params.reminderTime;
  reminderHour = params.reminderHour;
  reminderMinute = params.reminderMinute;
}