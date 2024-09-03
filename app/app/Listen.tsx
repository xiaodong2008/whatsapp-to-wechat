import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import {Text, View} from 'react-native';

import {AppRegistry} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import type {Notification} from './type';
import React from 'react';
import theme from './theme';

export async function startListenMessages() {
  // To check if the user has permission
  console.log(RNAndroidNotificationListener);
  const status = await RNAndroidNotificationListener.getPermissionStatus();
  console.log(status);

  // To open the Android settings so the user can enable it
  // RNAndroidNotificationListener.requestPermission();

  /**
   * Note that this method MUST return a Promise.
   * Is that why I'm using an async function here.
   */
  const headlessNotificationListener = async ({
    notification,
  }: {
    notification: Notification;
  }) => {
    if (notification) {
      /**
       * You could store the notifications in an external API.
       * I'm using AsyncStorage in the example project.
       */

      console.log(notification);

      // fetch();
    }
  };

  /**
   * This should be required early in the sequence
   * to make sure the JS execution environment is setup before other
   * modules are required.
   *
   * Your entry file (index.js) would be the better place for it.
   *
   * PS: I'm using here the constant RNAndroidNotificationListenerHeadlessJsName to ensure
   *     that I register the headless with the right name
   */
  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener,
  );
}

export default function ListenComponent() {
  let [authorized, setAuthorized] = React.useState(false);

  function updateStatus() {
    RNAndroidNotificationListener.getPermissionStatus().then(status => {
      setAuthorized(status === 'authorized');
    });
  }
  updateStatus();

  setInterval(updateStatus, 1000);

  const headlessNotificationListener = async ({
    notification,
  }: {
    notification: Notification;
  }) => {
    if (notification) {
      console.log(notification);
    }
  };

  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener,
  );

  return (
    <View style={theme.layout.base}>
      <Text>
        Notification Permission:{' '}
        {authorized ? (
          <Text style={theme.textColor.green}>Granted</Text>
        ) : (
          <Text style={theme.textColor.red}>Denied</Text>
        )}
      </Text>
      <Text
        style={theme.style.button}
        onPress={() => RNAndroidNotificationListener.requestPermission()}>
        Go to Setting
      </Text>
    </View>
  );
}
