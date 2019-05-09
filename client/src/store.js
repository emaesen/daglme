import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clockTime: "--:--",
    reminderTime: "20:00",
    isNotificationEnabled: false,
    showReminderOptions: false
  },
  getters: {
    clockTime: state => state.clockTime,
    reminderTime: state => state.reminderTime,
    isNotificationEnabled: state => state.isNotificationEnabled,
    showReminderOptions: state => state.showReminderOptions
  },
  mutations: {
    // can be used directly for synchronous events
    SET_CLOCK_DISPLAY: (state, clockTime) => (state.clockTime = clockTime),
    SET_REMINDER_TIME: (state, reminderTime) => (state.reminderTime = reminderTime),
    SET_IS_NOTIFICATION_ENABLED: (state, isNotificationEnabled) => (state.isNotificationEnabled = isNotificationEnabled),
    SET_SHOW_REMINDER_OPTIONS: (state, showReminderOptions) => (state.showReminderOptions = showReminderOptions)
  },
  actions: {
    // for async functionality - commit a mutation
    // e.g. setTimeTick: (context, tick) => context.commit("SET_TIME_TICK", tick)
  }
})
