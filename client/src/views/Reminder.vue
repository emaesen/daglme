<template>
  <div class="reminder view">
    <h1>Daily Global Meditation Reminder</h1>

    <template v-if="isNotificationSupported">

    <div class="margin-top20">
      <div>
        If you'd like to receive a Daily Global Meditation Reminder, you are invited to enable daily reminder notifications on your device.<br>
        By default the reminder will show at 8 o'clock in the evening (8 PM or 20:00 hour), but you may set any other time.<br>
        You can disable the reminder at any time if so desired.<br>
      </div>
      <div class="margin-top10">
        If you'd like to enable or manage your personal private Daily Global Meditation Reminder, please follow the instructions below:
      </div>
    </div>

    <h2>1. Enable your Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="ea" v-if="!isNotificationEnabled">
        <div>
          Click the button to enable your personal private Daily Global Meditation Reminder.<br>
          <button class="action" @click="enableNotifications">Enable a daily reminder</button> at <input type="time" v-model="reminderTime" step="900"/> (<span class="mono">{{ reminderTime }}</span>)
        </div>
      </div>
      <div key="eb" v-else>
        <transition name="fade" mode="out-in">
          <div key="ga" v-if="!isNotificationGranted">
            <span class="emph-alert">Please grant notification permission in your browser:</span> it should show a popup with option to allow or block notifications.
            <div class="note" v-if="isNotificationDenied">
              <br>
              Current notification permission: "<span :class="{'emph-alert':isNotificationDenied}">{{ notificationPermission }}</span>".<br>
              <span class="emph-alert">You may need to allow notifications in your browser or device's settings; reload this page; and try again.</span>
            </div>
          </div>
          <div key="gb" v-else>
            Completed! You have enabled the daily meditation reminder. Wonderful!
          </div>
        </transition>
      </div>
    </transition>

    <h2>2. Manage your Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="ma" v-if="!isNotificationGranted">
        You'll be able to manage your Daily Global Meditation Reminder here once you have enabled it in step 1...
      </div>
      <div key="mb" v-else>
        <div>
          Change your reminder time:
          <input type="time" v-model="reminderTime" step="900"/> (<span class="mono">{{ reminderTime }}</span>)
        </div>
        <div class="emph margin-top10">
          or
        </div>
        <div>
          <button class="action" @click="disableNotifications">Disable your daily reminder</button>
        </div>
        <div class="note smallfont">
          You may disable daily notifications here or you can directly revoke notification permissions in your browser (typically by clicking an information icon in the browser's URL bar) or device (typically in your settings menu).
        </div>
      </div>
    </transition>

    <h3>Privacy Notice</h3>
    <div class="notice smallfont">
      Reminder notifications are a direct communication between your local copy of this web page in your current browser and the device that you view this on.<br>
      Your preferences and settings are stored exclusively in your browser;<br>
      no data is exchanged with our server or with outside parties.<br>
      <br>
      You may opt out entirely by blocking "notifications" in your browser or device’s settings.
    </div>
    </template>

    <template v-else>
      If your device, operating system and browser support Notifications, you will see options here to enable and manage a Daily Global Meditation Reminder. But your current system does not appear to support Notifications.
    </template>
  </div>
</template>

<script>
export default {
  name: "reminders",
  components: {},
  data() {
    return {
      isNotificationSupported: false,
      isNotificationEnabled: false,
      isNotificationGranted: this.isNotificationEnabled && Notification.permission==="granted",
      isNotificationDenied: Notification.permission==="denied",
      reminderTime: "20:00",
      reminderHour: 20,
      reminderMinute: 0,
      isClockStartPending: false
    }
  },
  mounted() {
    if ("Notification" in window) {
      this.isNotificationSupported = true;
    }
  },
  created() {
    this.startClock();
  },
  updated() {
    this.startClock();
  },
  destroyed() {
    this.stopClock();
  },
  computed: {
    timeAmPm() {
      return this.reminderTime;
    },
    notificationPermission() {
      return Notification.permission;
    }
  },
  methods: {
    spawnNotification(body, title) {
      title = title || "Daily Global Meditation";
      var options = {
          body: body,
          icon: '/img/icon-96x96.png',
          image: '/img/illumined-earth.png',
          badge: '/img/icon-96x96.png',
          tag: 'daglme',
          vibrate: [50, 50, 50]
      };
      new Notification(title, options);
    },
    enableNotifications() {
      this.isNotificationEnabled = true;
      var spawnNotification = this.spawnNotification;
      var that = this;
      if (Notification.permission === "granted") {
        // permission was granted already
        spawnNotification("Welcome back! You are receiving a daily meditation reminder.");
        that.isNotificationGranted = true;
      } else {
        // ask the user for permission
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            // If the user accepted, let's create a notification
            spawnNotification("Welcome! You will receive a daily meditation reminder.");
            that.isNotificationGranted = true;
          }
          if (permission === "denied") {
            that.isNotificationDenied = true;
          }
        });
      }
    },
    disableNotifications() {
      this.isNotificationEnabled = false;
      this.isNotificationGranted = false;
    },
    startClock() {
      this.stopClock();
      if(!this.isClockStartPending) {
        // clock ticks once every minute
        let multiplier = 60;
        let delay = 60 - new Date().getSeconds();
        console.log("Initialize the clock - start in " + delay + " seconds");
        setTimeout(() => {
          this.timerID = setInterval(this.ticktock, multiplier * 1000);
          console.log("Start the clock (" + this.timerID + ")");
          this.isClockStartPending = false;
        }, delay * 1000);
        this.isClockStartPending = true;
      }
    },
    stopClock() {
      if (this.timerID) {
        console.log("Stop the clock (" + this.timerID + ")");
        clearInterval(this.timerID);
        this.timerID = null;
      }
    },
    ticktock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      console.log("tick tock (" + this.timerID + ") " + hours + ":" + minutes + " (" + this.reminderTime + ")");
      if (hours === 0 && minutes === 0) {
        // restart/recalibrate the clock
        console.log("Recalibrate the clock");
        this.startClock();
      }
      if (hours === this.reminderHour && minutes === this.reminderMinute) {
        this.spawnNotification("Your Daily Global Meditation Reminder.");
      }
    }
  },
  watch: {
    reminderTime() {
      var timeSplit = this.reminderTime.split(":");
      this.reminderHour = 1 * timeSplit[0];
      this.reminderMinute = 1 * timeSplit[1];
      console.log("reminder time changed to " + this.reminderTime + " (" + this.reminderHour + "," + this.reminderMinute + ")");
    }
  }
};
</script>