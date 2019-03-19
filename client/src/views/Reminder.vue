<template>
  <div class="reminder view">
    <h1>Daily Global Meditation Reminder</h1>

    <p class="margin-top20">
      <transition name="fade" mode="out-in">
        <div key="notify-enable" v-if="!isNotificationEnabled">
          If you'd like to receive a daily reminder at 8 PM (or at any other hour of your choice) you may 
          <span class="action" @click="enableNotifications">enable daily notifications</span>. Your browser will ask to grant permission to display notifications<br>
          (You can easily disable again at any time later if so desired)
        </div>
        <div key="notify-disable" v-if="isNotificationEnabled && !isNotificationGranted">
          You have requested a daily meditation reminder. Please grant notification permission in your browser: it should show a popup with option to allow or block notifications.
        </div>
        <div key="notify-disable" v-if="isNotificationGranted">
          You have enabled a daily meditation reminder. You may
          <span class="action" @click="disableNotifications">disable daily notifications here</span> or you can directly revoke notification permissions in your browser (typically by clicking an information icon in the browser's URL bar).
        </div>
      </transition>
    </p>

    <h2>Privacy notice</h2>
    <div>
        No data is exchanged with outside parties.<br>
        Notifications are a direct communication between your local copy of this web page and the device that you view this on.
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
      isNotificationGranted: false
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