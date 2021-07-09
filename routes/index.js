import { AuthStackScreen } from "./Auth";
import { HomeStackScreen } from "./Home";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const RootStack = createStackNavigator();
export const RootStackScreen = () => {
  // const AuthReducer = useSelector((state) => state.AuthReducer);
  // const [grantAccess, setGrantAcess] = useState(AuthReducer.isAuthenticated);
  const [grantAccess, setGrantAcess] = useState(true);

  // useEffect(() => {
  //   setGrantAcess(AuthReducer.isAuthenticated);
  // }, [AuthReducer.isAuthenticated, grantAccess]);
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        header: () => null,
      }}
    >
      {/* {!grantAccess && AuthReducer.token === null ? ( */}
      {!grantAccess ? (
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
            animationEnabled: false,
          }}
          options={{
            header: () => null,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};
