
const store = window.localStorage;
const reminderTimeStorageKey = "daglme:reminder-time";
const notificationEnabledStorageKey = "daglme:notification-enabled";


function storeData(key, value) {
  store && store.setItem(key, value);
}

function retrieveData(key) {
  return store && store.getItem(key);
}

export function storeNotificationEnabled(value) {
  storeData(notificationEnabledStorageKey, value) ;
}

export function storeReminderTime(value) {
  storeData(reminderTimeStorageKey, value) ;
}

export function retrieveNotificationEnabled() {
  return retrieveData(notificationEnabledStorageKey);
}

export function retrieveReminderTime() {
  return retrieveData(reminderTimeStorageKey);
}