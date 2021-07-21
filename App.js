import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { NavigationContainer } from "@react-navigation/native";
import { localize, AsyncStorage } from "./utils/allImports";
import { RootStackScreen } from "./routes/index";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./locales/i18n";

import { loadUser, setToken } from "./redux/actions/Auth";
import { readProducts } from "./redux/actions/products";
import { readSettings } from "./redux/actions/settings";
import { readCustomers } from "./redux/actions/customers";
import { readInvoices } from "./redux/actions/invoice";
export default function App() {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }
  useEffect(() => {
    AsyncStorage.getItem("token", (err, token) => {
      store.dispatch(setToken(token));
      store.dispatch(loadUser(token));
      store.dispatch(readProducts(token));
      store.dispatch(readSettings(token));
      store.dispatch(readCustomers(token));
      store.dispatch(readInvoices(token));
    });
    changeScreenOrientation().catch((err) => alert(err));
    AsyncStorage.getItem("lang", (err, res) => {
      localize.changeLanguage(res || "en");
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}
