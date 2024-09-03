import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import keepAwake from "./keepawake";
import { startListenMessages } from "./listen";

startListenMessages();

keepAwake(true);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>WhatsApp to Wechat forwarder</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
