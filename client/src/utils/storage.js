
const store = window.localStorage;
const reminderTimeStorageKey = "daglme:reminder-time";
const isNotificationEnabledStorageKey = "daglme:is-notification-enabled";


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

export function retrieveIsNotificationEnabled() {
  return retrieveData(isNotificationEnabledStorageKey)==="true";
}

export function retrieveReminderTime() {
  return retrieveData(reminderTimeStorageKey);
}