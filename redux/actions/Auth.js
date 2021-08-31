import {
  LOGIN,
  USER_LOADED,
  FORGET_PASSWORD,
  AUTH_ERROR,
  LOGOUT,
  START_AUTH_RELOAD,
  SET_TOKEN,
  FINISHED_AUTH_RELOAD,
} from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { readItemsAsync } from "./equCurd/readItems";
import { createItemAsync } from "./equCurd/createItem";
export const startAuthReload = () => (dispatch) => {
  dispatch({ type: START_AUTH_RELOAD });
};

export const finishedAuthReload = () => (dispatch) => {
  dispatch({ type: FINISHED_AUTH_RELOAD });
};

export const loginUser = (formData) =>
  createItemAsync({
    url: "http://www.kifapos.com/api/login",
    successType: LOGIN,
    errorType: AUTH_ERROR,
    successMsg: "Login Succsess",
    errorMsg: "Email or password is incorrect",
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
    loginHeader: false,
    // headers: {
    //   "Content-Type": "application/json",
    //   "x-client": "5fcf38d9d9e2620019545f76",
    //   "Access-Control-Allow-Origin": "*",
    // },
  });
export const loadUser = (token) =>
  readItemsAsync({
    url: "http://www.kifapos.com/api/load-user",
    successType: USER_LOADED,
    errorType: AUTH_ERROR,
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const forgetPassword = (formData) =>
  createItemAsync({
    url: "http://www.kifapos.com/api/forget-password",
    successType: FORGET_PASSWORD,
    errorType: AUTH_ERROR,
    successMsg: "Register Succsess",
    errorMsg: "error something went wrong",
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
  });
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const setToken = (payload) => (dispatch) => {
  dispatch({ type: SET_TOKEN, payload: payload });
};

// export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
//   const id = uuid();
//   dispatch({
//     type: SET_ALERT,
//     payload: { msg, alertType, id },
//   });
//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };
