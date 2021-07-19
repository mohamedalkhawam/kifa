import { AuthStackScreen } from "./Auth";
import { HomeStackScreen } from "./Home";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const RootStack = createStackNavigator();
export const RootStackScreen = () => {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const [grantAccess, setGrantAcess] = useState(AuthReducer.isAuthenticated);

  useEffect(() => {
    setGrantAcess(AuthReducer.isAuthenticated);
  }, [AuthReducer.isAuthenticated, grantAccess]);
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        header: () => null,
      }}
    >
      {(!grantAccess && AuthReducer.token === null) ||
      (!grantAccess && typeof AuthReducer.token !== "undefined") ? (
        // {!grantAccess ? (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{}}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={HomeStackScreen}
          options={{
            animationEnabled: true,
          }}
          options={{
            header: () => null,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};
