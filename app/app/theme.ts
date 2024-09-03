import {StyleSheet} from 'react-native';

export default {
  layout: StyleSheet.create({
    pageBase: {
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 10,
      flexDirection: 'column',
    },
    base: {
      alignItems: 'center',
      textAlign: 'center',
    },
  }),
  style: StyleSheet.create({
    button: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 12,
    },
  }),
  textColor: StyleSheet.create({
    red: {
      color: 'red',
    },
    green: {
      color: '#00ff00',
    },
  }),
};
