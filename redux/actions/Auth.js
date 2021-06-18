import {
  LOGIN,
  REGISTER,
  USER_LOADED,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  AUTH_ERROR,
  LOGOUT,
  START_AUTH_RELOAD,
  SET_TOKEN,
  FINISHED_AUTH_RELOAD,
} from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { readItemsAsync } from "./equCurd/readItems";
import { createItemAsync } from "./equCurd/createItem";
export const startAuthReload = () => (dispatch) => {
  dispatch({ type: START_AUTH_RELOAD });
};

export const finishedAuthReload = () => (dispatch) => {
  dispatch({ type: FINISHED_AUTH_RELOAD });
};
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return;
  }
}
export const loginUser = (formData) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/login_phone",
    successType: LOGIN,
    errorType: AUTH_ERROR,
    successMsg: "Login Succsess",
    errorMsg: "Email or password is incorrect",
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
    loginHeader: false,
    headers: {
      "Content-Type": "application/json",
      "x-client": "5fcf38d9d9e2620019545f76",
      "Access-Control-Allow-Origin": "*",
    },
  });
export const loadUser = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/me",
    successType: USER_LOADED,
    errorType: AUTH_ERROR,
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    headers: {
      "Content-Type": "application/json",
      "x-client": "5fcf38d9d9e2620019545f76",
      "x-access-token": token,

      "Access-Control-Allow-Origin": "*",
    },
  });

export const registerUser = (formData) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/register_phone",
    successType: REGISTER,
    errorType: AUTH_ERROR,
    successMsg: "Register Succsess",
    errorMsg: "error something went wrong",
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
    headers: {
      "Content-Type": "application/json",
      "x-client": "5fcf38d9d9e2620019545f76",
      "Access-Control-Allow-Origin": "*",
    },
  });
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const setToken = (token) => (dispatch) => {
  dispatch({ type: SET_TOKEN, payload: token });
};

// export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
//   const id = uuid();
//   dispatch({
//     type: SET_ALERT,
//     payload: { msg, alertType, id },
//   });
//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };
