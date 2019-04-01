let isClockStartPending = false;
let timerID;
let isNotificationGranted = false;
let reminderTime = null;
let reminderHour = null;
let reminderMinute = null;

export function send_message_to_sw(msg) {
  // based on http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html
  return new Promise(function(resolve, reject){
    // Create a Message Channel
    var msg_chan = new MessageChannel();

    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage = function(event){
      console.log("[u/notif] return message received ", event);
      if(event.data.error){
        reject(event.data.error);
      }else{
        resolve(event.data);
      }
    };

    if ('serviceWorker' in navigator) {
      console.log("[u/notif] checking if service worker is active...");
      navigator.serviceWorker.ready
        .then(function(swreg) {
          console.log("[u/notif] sending message to service worker... accepting reply...");
          swreg.active.postMessage(msg, [msg_chan.port2]);
        })
        .catch(err => {
          reject(err);
        });
    }
  
  });

}

export function spawnNotification(body, duration, title, doVibrate) {
  title = title || "Daily Global Meditation";
  duration = duration * 1000 || 5 * 60 * 1000;
  var options = {
      body: body,
      icon: '/img/icon-96x96.png',
      image: '/img/daily-global-meditation-reminder.jpg',
      badge: '/img/daily-global-meditation-reminder.jpg',
      tag: 'daglme',
      requireInteraction: true
  };
  if (doVibrate) {
    options.vibrate = [50, 50, 50];
  }
  var n = new Notification(title, options);
  setTimeout(n.close.bind(n), duration);
}

export function startClock() {
  stopClock();
  if(isNotificationGranted && !isClockStartPending) {
    // clock ticks once every minute
    let multiplier = 60;
    let delay = 60 - new Date().getSeconds();
    console.log("[u/notif] Initialize the clock - start in " + delay + " seconds");
    setTimeout(() => {
      timerID = setInterval(ticktock, multiplier * 1000);
      console.log("[u/notif] Start the clock (" + timerID + ")");
      ticktock();
      isClockStartPending = false;
    }, delay * 1000);
    isClockStartPending = true;
  }
}

export function stopClock() {
  if (timerID) {
    console.log("[u/notif] Stop the clock (" + timerID + ")");
    clearInterval(timerID);
    timerID = null;
  }
}

export function ticktock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  console.log("[u/notif] tick tock (" + timerID + ") " + hours + ":" + minutes + " (" + reminderTime + ")");
  if (hours === 0 && minutes === 0) {
    // restart/recalibrate the clock
    console.log("[u/notif] Recalibrate the clock");
    startClock();
  }
  if (isNotificationGranted && 
      hours === reminderHour && minutes === reminderMinute) {
    spawnNotification("For 5 minutes, envision the Earth and Sky as Illumined and Whole...\nThanks for your participation!");
    console.log("[u/notif] Your Daily Global Meditation Reminder");
  }
}

export function setNotificationParams(params) {
  console.log("[u/notif] Update notification params", params, {isNotificationGranted_old: isNotificationGranted});
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