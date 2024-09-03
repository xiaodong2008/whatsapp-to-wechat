import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import {Text, TextInput, View} from 'react-native';

import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Notification} from './type';
import React from 'react';
import theme from './theme';

export default function ListenComponent() {
  const [authorized, setAuthorized] = React.useState(false);
  const [host, setHost] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('host').then(v => {
      if (v) {
        setHost(v);
      }
    });
    AsyncStorage.getItem('apiKey').then(v => {
      if (v) {
        setApiKey(v);
      }
    });
  }, []);

  function updateStatus() {
    RNAndroidNotificationListener.getPermissionStatus().then(status => {
      setAuthorized(status === 'authorized');
    });
  }
  updateStatus();

  setInterval(updateStatus, 1000);

  startListenMessages();

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
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}>
        <Text>EndPoint URL</Text>
        <TextInput
          style={theme.style.input}
          onChangeText={text => {
            setHost(text);
            AsyncStorage.setItem('host', host);
          }}
          value={host}
        />
        <Text>API Key (Password)</Text>
        <TextInput
          style={theme.style.input}
          onChangeText={text => {
            setApiKey(text);
            AsyncStorage.setItem('apiKey', text);
          }}
          value={apiKey}
        />
      </View>
      <Text style={theme.style.button} onPress={startListenMessages}>
        {isListening ? 'Listening...' : 'Start Listen'}
      </Text>
    </View>
  );

  async function startListenMessages() {
    if (isListening) {
      return;
    }

    // To check if the user has permission
    const status = await RNAndroidNotificationListener.getPermissionStatus();

    if (status !== 'authorized') {
      return;
    } else {
      setIsListening(true);
    }

    /**
     * Note that this method MUST return a Promise.
     * Is that why I'm using an async function here.
     */
    const headlessNotificationListener = async ({
      notification,
    }: {
      notification: string;
    }) => {
      const notify: Notification = JSON.parse(notification);
      if (notify) {
        /**
         * You could store the notifications in an external API.
         * I'm using AsyncStorage in the example project.
         */

        console.log(notify);
        console.log(`Get msg from ${notify.app}`);

        if (notify.app !== 'com.whatsapp') {
          return;
        }

        let msgContent = notify.text;
        let msgFrom = notify.title;
        if (notify.groupedMessages.length) {
          msgContent =
            notify.groupedMessages[notify.groupedMessages.length - 1].text;
        }

        console.log(`msgContent: ${msgContent}`);
        console.log(`msgFrom: ${msgFrom}`);

        if (msgContent.includes('Whats')) {
          return;
        }

        msgContent = `<${msgFrom}>: ${msgContent}`;

        const host = await AsyncStorage.getItem('host');
        const apiKey = await AsyncStorage.getItem('apiKey');

        console.log(host + ':3183/sendMsg', {
          msg: msgContent,
          password: apiKey,
        });
        fetch('http://' + host + ':3183/sendMsg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            msg: msgContent,
            password: apiKey,
          }),
        });
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
}
