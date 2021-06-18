import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgetPassword from "../scences/forgetPassword";
import SignIn from "../scences/signIn";
const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
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
    <AuthStack.Navigator
      screenOptions={{
        header: () => null,
        cardStyle: horizontalAnimation,
      }}
    >
      <AuthStack.Screen
        name="signIn"
        component={SignIn}
        // options={{ title: "Our services" }}
      />

      <AuthStack.Screen name="forgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};
