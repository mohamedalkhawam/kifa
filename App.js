import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { NavigationContainer } from "@react-navigation/native";
import { localize, AsyncStorage } from "./utils/allImports";
import { RootStackScreen } from "./routes/index";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Text, View, StyleSheet, Dimensions, Button } from "react-native";
import "./locales/i18n";

export default function App() {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }
  useEffect(() => {
    changeScreenOrientation().catch((err) => alert(err));
    AsyncStorage.getItem("lang", (err, res) => {
      localize.changeLanguage(res || "en");
    });
    localize.changeLanguage("ar");
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}
