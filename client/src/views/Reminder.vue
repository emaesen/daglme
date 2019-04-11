<template>
  <div class="reminder view">
    <h1>Daily Global Meditation Reminder</h1>

    <template v-if="isNotificationSupported">

    <div class="margin-top20">
      <div>
        If you'd like to receive a Daily Global Meditation Reminder as a notification on your device, you are invited to enable a personal daily reminder below.<br>
        By default the reminder will show at 8 o'clock in the evening (8 PM or 20:00 hour), but you may set any other time.<br>
        You can disable the reminder at any time if so desired.<br>
      </div>
      <div class="emph-alert margin-top10">
        Note: this is experimental technology with still limited support in browsers (as of April 2019).
      </div>
      <div class="margin-top10 emph">
        If you'd like to enable or manage your personal private Daily Global Meditation Reminder, please follow the instructions below:
      </div>
    </div>

    <h2>1. Enable your Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="ea" v-if="!isNotificationEnabled">
        <div>
          Click the button to enable your personal private Daily Global Meditation Reminder.<br>
          <button class="action" @click="enableNotifications">Enable a daily reminder</button><span class="nowrap"> &nbsp; at <input type="time" v-model="reminderTime" step="900"/> &nbsp; ({{ reminderTimeText }})</span>
        </div>
      </div>
      <div key="eb" v-else>
        <transition name="fade" mode="out-in">
          <div key="ga" v-if="!isNotificationGranted">
            Almost there! You have enabled the daily meditation reminder.<br>
            <span class="emph-alert">Please grant notification permission in your browser:</span> it should show a popup with option to allow or block notifications.
            <div class="note" v-if="isNotificationDenied">
              <br>
              Current notification permission: "<span :class="{'emph-alert':isNotificationDenied}">{{ notificationPermission }}</span>".<br>
              <span class="emph-alert">You may need to allow notifications in your browser or device's settings; reload this page; and try again.</span>
            </div>
          </div>
          <div key="gb" v-else>
            <div>
              Completed! You have enabled the daily meditation reminder. Wonderful!
            </div>
            <div class="emph-alert margin-top10">
              Note: To ensure you receive the daily meditation reminder, 
              <template v-if="isInStandaloneMode">
                you should keep this webapp open and active.
              </template>
              <template v-else>
                you should leave this web page running in an open tab in your browser, or alternatively you may install this web site as a webapp on your device and keep it active.
              </template>
            </div>
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
          <span class="nowrap"><input type="time" v-model="reminderTime" step="900"/> &nbsp; ({{ reminderTimeText }})</span>
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

    <h3>Terms of Service</h3>
    <div class="notice smallfont">
      The Daily Global Meditation Reminder is provided AS IS, as a courtesy service.<br>
      The technology used to display Notifications still has limited browser and device support.<br>
      <span v-if="isNotificationSupported">If you can view this page then your system technically supports Notifications but they may or may not work entirely as expected.</span>
      <span v-if="!isNotificationSupported">It appears that your system technically DOES NOT SUPPORT Notifications so they will probably not work as expected.</span>
      <br>
      Use at your own discretion.<br>
      You may have to re-enable your Daily Global Meditation Reminder after a page reload.<br>
      <br>
      Your Notification Permission currently is set as: "{{ notificationPermission }}"
    </div>

    <h3>Privacy Notice</h3>
    <div class="notice smallfont">
      Reminder Notifications are a direct communication between your local copy of this web page in your current browser and the device that you view this on.<br>
      Your preferences and settings are stored exclusively in your browser;<br>
      no data is exchanged with our server or with outside parties.<br>
      <br>
      You may opt out entirely by blocking "notifications" in your browser or device’s settings.
    </div>
    </template>

    <template v-else>
      If your device, operating system and browser support Notifications, you will see options here to enable and manage a Daily Global Meditation Reminder. But your current system does not appear to support Notifications.
    </template>

    <div :class="['alert-offscreen', alert ? 'alert' : '']">{{ alert }}</div>
  </div>
</template>

<script>
import send_message_to_sw from "../utils/sw-interface.js";

export default {
  name: "reminders",
  components: {},
  data() {
    return {
      isNotificationSupported: false,
      isNotificationEnabled: false,
      isNotificationGranted: false,
      isNotificationDenied: false,
      reminderTime: "20:00",
      reminderHour: 20,
      reminderMinute: 0,
      allowNotificationVibrate: false,
      store: null,
      reminderTimeStorageKey: "daglme:reminder-time",
      notificationEnabledStorageKey: "daglme:notification-enabled",
      alertDuration: 9 * 1000,
      alert: null,
      alertId: null
    }
  },
  mounted() {
    this.store = window.localStorage;
    var rt = this.retrieveData(this.reminderTimeStorageKey);
    if (rt) {
      this.reminderTime = rt;
    }
    var ine = this.retrieveData(this.notificationEnabledStorageKey);
    if (ine) {
      this.isNotificationEnabled = ine === "true";
    }
    if ("Notification" in window) {
      this.isNotificationSupported = true;
      this.isNotificationGranted = this.isNotificationEnabled && Notification.permission==="granted";
      this.isNotificationDenied = Notification.permission==="denied";
    }
    if (this.isNotificationDenied && this.isNotificationEnabled) {
      // user has previously enabled the reminder but must have revoked
      // notification permission directly in their device.
      // Reset the reminder to disabled after a short amount of time.
      setTimeout(() => {
        this.isNotificationEnabled = false;
        this.storeData(this.notificationEnabledStorageKey, this.isNotificationEnabled);
      }, 60 * 1000);
    }
  },
  computed: {
    isInStandaloneMode() {
      return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);
    },
    notificationPermission() {
      return this.isNotificationGranted ? "granted"
        : this.isNotificationDenied ? "denied"
        : !this.isNotificationSupported ? "not applicable (not supported)"
        : "pending";
    },
    reminderTimeText() {
      var text = "";
      var hour = this.reminderHour > 12 ? this.reminderHour - 12 : this.reminderHour;
      var when = " in the " + 
        ( this.reminderHour > 18 ? "evening" 
          : this.reminderHour >= 12 ? "afternoon" 
          : "morning"
        );
      var padZero = this.reminderMinute < 10 ? "0" : "";
      if (this.reminderMinute === 0) {
        text = hour + " o'clock" + when;
      } else {
        text = hour + ":" + padZero + this.reminderMinute + when;
      }
      return text;
    }
  },
  methods: {
    enableNotifications() {
      this.isNotificationEnabled = true;
      this.storeData(this.notificationEnabledStorageKey, this.isNotificationEnabled);
      var that = this;
      if (Notification.permission === "granted") {
        // permission was granted already
        this.spawnNotification("Wonderful! You receive a daily meditation reminder");
        that.isNotificationGranted = true;
      } else {
        // ask the user for permission
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            // If the user accepted, let's create a notification
            this.spawnNotification("Welcome! You will receive a daily meditation reminder");
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
      this.storeData(this.notificationEnabledStorageKey, this.isNotificationEnabled);
    },
    storeData(key, value) {
      this.store && this.store.setItem(key, value);
    },
    retrieveData(key) {
      return this.store && this.store.getItem(key);
    },
    showTemporaryAlert(msg) {
      this.alert = msg;
      if (this.alertId) {
        clearTimeout(this.alertId);
      }
      this.alertId = setTimeout(() => {
        this.alert = null;
      }, this.alertDuration);
    },
    setNotificationParams() {
      send_message_to_sw({
        action:"setNotificationParams", 
        payload:{
          isNotificationGranted: this.isNotificationGranted,
          reminderTime: this.reminderTime,
          reminderHour: this.reminderHour,
          reminderMinute: this.reminderMinute
        }
      })
      .then(msg => this.showTemporaryAlert(msg))
      .catch(err => this.showTemporaryAlert("oops! " + err));
    },
    spawnNotification(body) {
      send_message_to_sw({
        action:"spawnNotification", 
        payload:{
          body: body,
          duration: 15,
          doVibrate: this.allowNotificationVibrate
        }
      })
      .then(msg => this.showTemporaryAlert(msg))
      .catch(err => this.showTemporaryAlert("oops! " + err));
    }
  },
  watch: {
    reminderTime() {
      var timeSplit = this.reminderTime.split(":");
      this.reminderHour = 1 * timeSplit[0];
      this.reminderMinute = 1 * timeSplit[1];
      this.storeData(this.reminderTimeStorageKey, this.reminderTime);
      this.setNotificationParams();
    },
    isNotificationGranted() {
      this.setNotificationParams();
    }
  }
};
</script>