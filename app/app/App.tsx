/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, StatusBar, Text, View} from 'react-native';

import Author from './Author';
import KeepAwakeComponent from './KeepAwake';
import ListenComponent from './Listen';
import React from 'react';
import theme from './theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={theme.layout.pageBase}>
      <StatusBar />
      <View style={theme.layout.pageBase}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 10,
          }}>
          WhatsApp to Wechat forwarder
        </Text>
        <KeepAwakeComponent />
        <ListenComponent />
        <Author />
      </View>
    </SafeAreaView>
  );
}

export default App;
