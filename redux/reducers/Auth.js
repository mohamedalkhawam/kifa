import {
  LOGIN,
  REGISTER,
  USER_LOADED,
  FORGET_PASSWORD,
  LOGOUT,
  START_AUTH_RELOAD,
  FINISHED_AUTH_RELOAD,
  SET_TOKEN,
} from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: {},
  error: {},
  loading: false,
};
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    alert(e);
  }
};
export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FORGET_PASSWORD:
      return {
        ...state,
      };
    case LOGIN:
      storeData(payload.data.token);
      return {
        ...state,
        token: payload.data.token,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.data.user,
      };
    case LOGOUT:
      const removeToken = async () => {
        try {
          await AsyncStorage.removeItem("token");
        } catch (e) {}
      };
      removeToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    case START_AUTH_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_AUTH_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
