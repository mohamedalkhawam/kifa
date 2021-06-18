import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../scences/home";
import Customers from "../scences/customers";
import singleInvoice from "../scences/singleInvoice";
import singleProduct from "../scences/singleProduct";
import singleCustomer from "../scences/singleCustomer";
import Invoices from "../scences/invoices";
import Settings from "../scences/settings";
const HomeStack = createStackNavigator();
export const HomeStackScreen = () => {
  const horizontalAnimation = {
    gestureDirection: "horizontal",
    CardStyleInterpolators: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => null,
        cardStyle: horizontalAnimation,
      }}
    >
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen
        name="customers"
        component={Customers}
        options={horizontalAnimation}
      />

      <HomeStack.Screen
        name="singleInvoice"
        component={singleInvoice}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <HomeStack.Screen
        name="singleCustomer"
        component={singleCustomer}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <HomeStack.Screen
        name="singleProduct"
        component={singleProduct}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <HomeStack.Screen
        name="invoices"
        component={Invoices}
        options={horizontalAnimation}
      />
      <HomeStack.Screen
        name="settings"
        component={Settings}
        options={horizontalAnimation}
      />
    </HomeStack.Navigator>
  );
};