
const store = window.localStorage;
const reminderTimeStorageKey = "daglme:reminder-time";
const isNotificationEnabledStorageKey = "daglme:is-notification-enabled";
const showReminderOptionsStorageKey = "daglme:show-reminder-options";


function storeData(key, value) {
  store && store.setItem(key, value);
}

function retrieveData(key) {
  return store && store.getItem(key);
}

export function storeIsNotificationEnabled(value) {
  storeData(isNotificationEnabledStorageKey, value) ;
}

export function storeReminderTime(value) {
  storeData(reminderTimeStorageKey, value) ;
}

export function storeShowReminderOptions(value) {
  storeData(showReminderOptionsStorageKey, value) ;
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