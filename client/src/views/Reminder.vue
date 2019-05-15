<template>
  <div class="reminder view">
    <h1>Daily Global Meditation Reminder</h1>

    <template v-if="showReminderOptions">

    <div class="margin-top20">
      <div>
        If you'd like to receive a Daily Global Meditation Reminder as a notification on your device, you are invited to enable a personal daily reminder below.<br>
        <span v-if="!isNotificationEnabled">By default the reminder will show at 8 o'clock in the evening (8 PM or 20:00 hour), but you may set any other time.</span>
        <br>
        You can disable the reminder at any time if so desired.<br>
      </div>
      <div class="emph-caution margin-top10" v-if="!isNotificationEnabled">
        Note:<br>
        The use of system "Notifications" for the daily reminder service is experimental technology with limited support in browsers (as of April 2019).<br>
        <span v-if="isNotificationSupported">
        However, your system appears to have the required support. Wonderful!
        </span>
        <span v-if="!isNotificationSupported">
        Unfortunately, your system does not appear to have the required support.
        </span>
        <div class="emph-alert" v-if="isNotificationDenied">
          Notifications are currently denied by your browser; <span class="emph-caution">you may need to allow Notifications in your browser or device's settings.</span>
        </div>
      </div>
      <div class="margin-top10 emph" v-if="!isNotificationEnabled">
        If you'd like to enable your personal private Daily Global Meditation Reminder, please follow the instructions below:
      </div>
    </div>

    <h2>1. Enable your Daily Global Meditation Reminder</h2>
    <transition name="fade" mode="out-in">
      <div key="ea" v-if="!isNotificationEnabled">
        <div>
          Click the button to enable your personal private Daily Global Meditation Reminder.<br>
          <button class="action" @click="enableNotifications">Enable a daily reminder</button><span class="nowrap"> &nbsp; at <input type="time" v-model="reminderTimeModel" step="900"/> &nbsp; ({{ reminderTimeText }})</span>
        </div>
      </div>
      <div key="eb" v-else>
        <transition name="fade" mode="out-in">
          <div key="ga" v-if="!isNotificationGranted">
            Almost there! You have enabled the daily meditation reminder.<br>
            <span class="emph-caution">Please grant notification permission in your browser:</span> it should show a popup with option to allow or block notifications.
            <div class="emph-caution" v-if="isNotificationDenied">
              <br>
              Current notification permission: "<span :class="{'emph-alert':isNotificationDenied}">{{ notificationPermission }}</span>".<br>
              <span class="emph-alert">You may need to allow Notifications in your browser or device's settings!</span><br>
              <span class="emph-caution">1. Grant permission for Notifications,<br>
              2. Reload this page, and <br>
              3. Try again to enable the daily meditation reminder.</span>
            </div>
          </div>
          <div key="gb" v-else>
            <div>
              Completed! You have enabled the daily meditation reminder. Wonderful!
            </div>
            <div class="emph-caution margin-top10">
              Note:<br>
              To ensure you receive the daily meditation reminder, 
              <template v-if="isInStandaloneMode">
                you should keep this webapp open and active.
              </template>
              <template v-else>
                you should leave this web page running in an open tab in your browser.<br>
                Alternatively you may install this web site as a webApp on your device (look for an "Install Daily Global Meditation..." option in your browser controls).
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
      The technology used to display Notifications has limited browser and device support.<br>
      <span v-if="isNotificationSupported">If you can view this page then your system technically supports Notifications but they may or may not work entirely as expected.</span>
      <span v-if="!isNotificationSupported">It appears that your system technically DOES NOT SUPPORT Notifications so they will probably not work as expected.</span>
      <br>
      Use at your own discretion.<br>
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
      If your device, operating system and browser support Notifications, you will see options here to enable and manage a Daily Global Meditation Reminder.<br>
      <br>
      However, <span class="emph-caution">your current system configuration does not appear to support Notifications.</span>
    </template>

    <div :class="['alert-offscreen', alert ? 'alert' : '']">{{ alert }}</div>
  </div>
</template>

<script>
import {
  isNotificationSupported,
  splitHourAndMinutes,
  setNotificationParams,
  spawnNotification
} from "../utils/reminder.js";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "reminders",
  components: {},
  data() {
    return {
      isNotificationSupported: isNotificationSupported,
      isNotificationGranted: false,
      isNotificationDenied: false,
      reminderTimeModel: null,
      reminderHour: 20,
      reminderMinute: 0,
      allowNotificationVibrate: false,
      alertDuration: 9 * 1000,
      alert: null,
      alertId: null,
      suppressAlert: false
    }
  },
  mounted() {
    if (this.reminderTime) {
      this.reminderTimeModel = this.reminderTime;
      this.suppressAlert = true;
    }
    if (this.showReminderOptions) {
      this.isNotificationGranted = this.isNotificationEnabled && Notification.permission==="granted";
      this.isNotificationDenied = Notification.permission==="denied";
    }
    if (this.isNotificationDenied && this.isNotificationEnabled) {
      // user has previously enabled the reminder but must have revoked
      // notification permission directly in their device.
      // Reset the reminder to disabled after a short amount of time.
      setTimeout(() => {
        this.SET_IS_NOTIFICATION_ENABLED(false);
      }, 60 * 1000);
    }
  },
  computed: {
    ...mapGetters(["reminderTime", "isNotificationEnabled", "showReminderOptions"]),
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
    ...mapMutations(["SET_REMINDER_TIME", "SET_IS_NOTIFICATION_ENABLED"]),
    enableNotifications() {
      this.SET_IS_NOTIFICATION_ENABLED(true);
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
      this.isNotificationGranted = false;
      this.SET_IS_NOTIFICATION_ENABLED(false);
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
    setNotificationParams(msg) {
      setNotificationParams({
        isNotificationGranted: this.isNotificationGranted,
        reminderTime: this.reminderTime
      })
      .then(() => {
        msg = msg || "Reminder settings updated";
        if (!this.suppressAlert) {
          this.showTemporaryAlert("✓ " + msg)
        } else {
          this.suppressAlert = false;
        }
      })
      .catch(err => this.showTemporaryAlert("oops! " + err));
    },
    spawnNotification(body) {
      spawnNotification({
        body: body,
        duration: 30,
        doVibrate: this.allowNotificationVibrate
      })
      .then(() => this.showTemporaryAlert("ℹ Reminder enabled ➜ check notification..."))
      .catch(err => this.showTemporaryAlert("oops! " + err));
    }
  },
  watch: {
    reminderTimeModel() {
      var timeSplit = splitHourAndMinutes(this.reminderTimeModel);
      this.reminderHour = timeSplit.hour;
      this.reminderMinute = timeSplit.minute;
      this.SET_REMINDER_TIME(this.reminderTimeModel);
      this.setNotificationParams("Reminder time updated to " + this.reminderTimeModel);
    },
    isNotificationGranted() {
      if (this.isNotificationGranted) {
        this.setNotificationParams("Reminder enabled");
      } else {
        this.setNotificationParams("Reminder disabled");
      }
    }
  }
};
</script>