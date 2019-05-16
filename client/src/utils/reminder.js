import {
  isServiceWorkerSupported,
  send_message_to_sw
  } from "./sw-interface.js";

let isClockStartPending = false;
let timerID;
let reminderTime = null;
let reminderHour = null;
let reminderMinute = null;
export let reminderState = {
  clockDisplay : "--:--",
  setClockDisplay(val) {
    this.clockDisplay = val;
  }
};

export const isNotificationSupported = "Notification" in window;
export let isNotificationGranted = isNotificationSupported
  && Notification.permission === "granted";
export let isNotificationDenied = isNotificationSupported
  && Notification.permission === "denied";
export const areNotificationsAvailable = isServiceWorkerSupported 
  && isNotificationSupported 
  && !isNotificationDenied;

function startClock() {
  stopClock();
  if(isNotificationGranted && !isClockStartPending) {
    ticktock();
    // clock ticks once every minute
    // calculate delay so that clock ticks on the minute change;
    let multiplier = 60;
    let delay = 60 - new Date().getSeconds();
    console.log("[u/rem] Initialize the clock - start in " + delay + " seconds");
    setTimeout(() => {
      timerID = setInterval(ticktock, multiplier * 1000);
      console.log("[u/rem] Start the clock (" + timerID + ") " + new Date());
      ticktock();
      isClockStartPending = false;
    }, delay * 1000);
    isClockStartPending = true;
  }
}

function stopClock() {
  if (timerID) {
    console.log("[u/rem] Stop the clock (" + timerID + ") " + new Date());
    clearInterval(timerID);
    timerID = null;
  }
}

const padZeros = (n, td) => {
  var ns = n.toString(),
    l = ns.length,
    z = "";
  if (td > l) {
    for (var i = l; i < td; i++) {
      z += "0";
    }
  }
  return z + ns;
};

function ticktock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  reminderState.setClockDisplay(padZeros(hours, 2) + ":" + padZeros(minutes, 2));
  console.log("[u/rem] tick tock (" + timerID + ") " + reminderState.clockDisplay + " (" + reminderTime + ")");
  if (hours === 0 && minutes === 0) {
    // restart/recalibrate the clock
    console.log("[u/rem] Recalibrate the clock");
    startClock();
  }
  if (Notification.permission === "granted" && 
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

export function splitHourAndMinutes(time) {
  let timeSplit = time.split(":");
  return {
    hour : 1 * timeSplit[0],
    minute : 1 * timeSplit[1]
  };
}

export function setNotificationParams(params) {
  // re-evaluate permission
  isNotificationGranted = isNotificationSupported
    && Notification.permission === "granted";
  isNotificationDenied = isNotificationSupported
    && Notification.permission === "denied";
  return new Promise(function(resolve) {
    //console.log("[u/rem] Update notification params", params);
    if (params.isNotificationGranted===true) {
      // use 0 delta to ensure isNotificationGranted is set
      setTimeout(startClock,0);
    }
    if (isNotificationGranted===true && params.isNotificationGranted===false) {
      // use 0 delta to ensure isNotificationGranted is set
      setTimeout(stopClock,0);
    }
    reminderTime = params.reminderTime;
    let timeSplit = splitHourAndMinutes(reminderTime);
    reminderHour = timeSplit.hour;
    reminderMinute = timeSplit.minute;
    resolve("Reminder settings updated " + reminderTime);
  })
}