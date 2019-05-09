
const store = window.localStorage;
const reminderTimeStorageKey = "daglme:reminder-time";
const isNotificationEnabledStorageKey = "daglme:is-notification-enabled";
const showReminderOptionsStorageKey = "daglme:show-reminder-options";


function persistData(key, value) {
  store && store.setItem(key, value);
}

function retrieveData(key) {
  return store && store.getItem(key);
}

export function persistIsNotificationEnabled(value) {
  persistData(isNotificationEnabledStorageKey, value) ;
}

export function persistReminderTime(value) {
  persistData(reminderTimeStorageKey, value) ;
}

export function persistShowReminderOptions(value) {
  persistData(showReminderOptionsStorageKey, value) ;
}

export function retrieveIsNotificationEnabled() {
  return retrieveData(isNotificationEnabledStorageKey)==="true";
}

export function retrieveReminderTime() {
  return retrieveData(reminderTimeStorageKey);
}

export function retrieveShowReminderOptions() {
  return retrieveData(showReminderOptionsStorageKey)==="true";
}