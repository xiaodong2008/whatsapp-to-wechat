import React, { Component } from "react";
import { Text, View } from "react-native";

import KeepAwake from "react-native-keep-awake";

export default function keepAwake(shouldBeAwake) {
  if (shouldBeAwake) {
    KeepAwake.activate();
  } else {
    KeepAwake.deactivate();
  }
}
