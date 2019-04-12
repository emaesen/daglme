import {
  isServiceWorkerSupported,
  send_message_to_sw
  } from "./sw-interface.js";

let isClockStartPending = false;
let timerID;
let isNotificationGranted = false;
let reminderTime = null;
let reminderHour = null;
let reminderMinute = null;

export const isNotificationSupported = "Notification" in window;
export const areNotificationsAvailable = isServiceWorkerSupported 
  && isNotificationSupported 
  && Notification.permission !== "denied";

function startClock() {
  stopClock();
  if(isNotificationGranted && !isClockStartPending) {
    // clock ticks once every minute
    let multiplier = 60;
    let delay = 60 - new Date().getSeconds();
    console.log("[u/rem] Initialize the clock - start in " + delay + " seconds");
    setTimeout(() => {
      timerID = setInterval(ticktock, multiplier * 1000);
      console.log("[u/rem] Start the clock (" + timerID + ")");
      ticktock();
      isClockStartPending = false;
    }, delay * 1000);
    isClockStartPending = true;
  }
}

function stopClock() {
  if (timerID) {
    console.log("[u/rem] Stop the clock (" + timerID + ")");
    clearInterval(timerID);
    timerID = null;
  }
}

function ticktock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  //console.log("[u/rem] tick tock (" + timerID + ") " + hours + ":" + minutes + " (" + reminderTime + ")");
  if (hours === 0 && minutes === 0) {
    // restart/recalibrate the clock
    console.log("[u/rem] Recalibrate the clock");
    startClock();
  }
  if (isNotificationGranted && 
      hours === reminderHour && minutes === reminderMinute) {
    spawnNotification({
      body:"For 5 minutes, envision the Earth and Sky as Illumined and Whole...\nThanks for your participation!"
    });
    console.log("[u/rem] Your Daily Global Meditation Reminder");
  }
}

export function spawnNotification(payload) {
  console.log("[u/rem] spawn notification", {payload});
  return send_message_to_sw({
    action:"spawnNotification", 
    payload:payload
  });
}

export function setNotificationParams(params) {
  return new Promise(function(resolve) {
    //console.log("[u/rem] Update notification params", params);
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
    resolve("Reminder settings updated " + reminderTime);
  })
}