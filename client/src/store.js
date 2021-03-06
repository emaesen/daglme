import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clockTime: "--:--",
    reminderTime: "20:00",
    isNotificationEnabled: false,
    isNotificationActive: false,
    showReminderOptions: false
  },
  getters: {
    clockTime: state => state.clockTime,
    reminderTime: state => state.reminderTime,
    isNotificationEnabled: state => state.isNotificationEnabled,
    isNotificationActive: state => state.isNotificationActive,
    showReminderOptions: state => state.showReminderOptions
  },
  mutations: {
    // can be used directly for synchronous events
    SET_CLOCK_TIME: (state, clockTime) => (state.clockTime = clockTime),
    SET_REMINDER_TIME: (state, reminderTime) => (state.reminderTime = reminderTime),
    SET_IS_NOTIFICATION_ENABLED: (state, isNotificationEnabled) => (state.isNotificationEnabled = isNotificationEnabled),
    SET_IS_NOTIFICATION_ACTIVE: (state, isNotificationActive) => (state.isNotificationActive = isNotificationActive),
    SET_SHOW_REMINDER_OPTIONS: (state, showReminderOptions) => (state.showReminderOptions = showReminderOptions)
  },
  actions: {
    // for async functionality - commit a mutation
    // e.g. setTimeTick: (context, tick) => context.commit("SET_TIME_TICK", tick)
  }
})
