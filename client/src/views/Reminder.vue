<template>
  <div class="reminder view">
    <h1>Daily Global Meditation Reminder</h1>

    <div class="margin-top20">
      <div>
        If you'd like to receive a daily meditation reminder, you may enable daily reminder notifications.<br>
        By default the reminder will show at 8 o'clock in the evening (8 PM or 20:00 hour), but you may set any other time.<br>
        You can disable the reminder at any time if so desired.<br>
      </div>
      <div class="margin-top10">
        If you'd like to setup the daily meditation reminder, please follow the steps below:
      </div>
    </div>

    <h2>1. Enable a Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="s1a" v-if="!isNotificationEnabled">
        <div>
          Click the button to enable a Daily Global Meditation Reminder.<br>
          <button class="action" @click="enableNotifications">Enable a daily reminder</button> at <input type="time" v-model="reminderTime" step="900"/> (<span class="mono">{{ reminderTime }}</span>)
        </div>
        <div class="note">
          This action will request your browser for permission to display notifications.
        </div>
      </div>
      <div key="s1b" v-else>
        You have enabled the daily meditation reminder already. Wonderful!
      </div>
    </transition>

    <h2>2. Grant Permission for Notifications</h2>
    <transition name="fade" mode="out-in">
      <div key="s2a" v-if="!isNotificationEnabled">
        You'll be asked to grant permission once you have enabled the reminder in step 1...
      </div>
      <div key="s2c" v-else>
        <div v-if="!isNotificationGranted">
          <span class="emph-alert">Please grant notification permission in your browser:</span> it should show a popup with option to allow or block notifications.
          <div class="note" v-if="isNotificationDenied">
            Current notification permission: "<span :class="{'emph-alert':isNotificationDenied}">{{ notificationPermission }}</span>".
            <span class="emph-alert">You may need to allow notifications in your device's settings.</span>
          </div>
        </div>
        <div v-else>
          You have granted permission already. Wonderful!
        </div>
      </div>
    </transition>

    <h2>3. Manage your Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="s3a" v-if="!isNotificationGranted">
        You'll be able to manage your Daily Global Meditation Reminder here once you have granted permission in step 2...
      </div>
      <div key="s3b" v-else>
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
        <div class="note">
          You may disable daily notifications here or you can directly revoke notification permissions in your browser (typically by clicking an information icon in the browser's URL bar) or device (typically in your settings menu).
        </div>
      </div>
    </transition>

    <h3>Privacy Notice</h3>
    <div class="notice smallfont">
      Reminder notifications are a direct communication between your local copy of this web page and the device that you view this on.<br>
      No data is exchanged with outside parties.<br>
      You may opt out entirely by blocking "notifications" in your browser or device’s settings.
    </div>

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
      reminderTime: "20:00"
    }
  },
  mounted() {
    if ("Notification" in window) {
      this.isNotificationSupported = true;
      if (Notification.permission === "granted") {
        this.isNotificationEnabled = true;
      }
    }
  },
  computed: {
    timeAmPm() {
      return this.reminderTime;
    },
    notificationPermission() {
      return Notification.permission;
    },
    isNotificationGranted() {
      return Notification.permission==="granted";
    },
    isNotificationDenied() {
      return Notification.permission==="denied";
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
          vibrate: [50, 50, 50]
      };
      new Notification(title, options);
    },
    enableNotifications() {
      this.isNotificationEnabled = true;
      var spawnNotification = this.spawnNotification;
      if (Notification.permission === "granted") {
        // permission was granted already
        spawnNotification("Welcome back! You are receiving a meditation reminder daily at 8 o'clock in the evening.");
      } else {
        // ask the user for permission
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            spawnNotification("Welcome! Daily you will receive a meditation reminder at 8 o'clock in the evening.");
          }
        });
      }
    },
    disableNotifications() {
      this.isNotificationEnabled = false;
    }
  }
};
</script>