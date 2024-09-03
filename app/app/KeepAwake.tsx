import {Text, View} from 'react-native';

import KeepAwake from 'react-native-keep-awake';
import React from 'react';
import theme from './theme';

export default function KeepAwakeComponent() {
  let [isKeepAwake, setIsKeepAwake] = React.useState(false);
  return (
    <View style={theme.layout.base}>
      <Text>
        Keep Awake Status:{' '}
        {isKeepAwake ? (
          <Text style={theme.textColor.green}>On</Text>
        ) : (
          <Text style={theme.textColor.red}>Off</Text>
        )}
      </Text>
      <Text
        style={theme.style.button}
        onPress={() => setIsKeepAwake(!isKeepAwake)}>
        Turn {isKeepAwake ? 'off' : 'on'} KeepAwake
      </Text>
      {isKeepAwake && <KeepAwake />}
    </View>
  );
}
