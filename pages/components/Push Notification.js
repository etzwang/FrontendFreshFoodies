import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PushNotifications from 'push-notifications-library';


// Request permission for push notifications
PushNotifications.requestPermission().then(permission => {
  if (permission === 'granted') {
      subscribeUser();
  } else {
      console.log('Permission denied for push notifications');
  }
});

function subscribeUser() {
  PushNotifications.subscribe().then(subscription => {
      saveSubscription(subscription);
  }).catch(error => {
      console.error('Failed to subscribe user to push notifications:', error);
  });
}

PushNotifications.onNotification(notification => {
  displayNotification(notification);
});


function displayNotification(notification) {
  showNotificationBanner(notification.title, notification.body, notification.action);
}

export default PushNotifications;
