import {
  LOGIN,
  REGISTER,
  USER_LOADED,
  FORGET_PASSWORD,
  LOGOUT,
  GET_SUBSCRIPTIONS,
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
  services: [],
  clientID: null,
  info: null,
};

async function setValueFor(key, value) {
  let result = await SecureStore.setItemAsync(key, value);
  if (result) {
    return result;
  } else {
    return;
  }
}
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return;
  }
}
export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER:
      return {
        ...state,
      };
    case LOGIN:
      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem("token", value);
        } catch (e) {
          // saving error
        }
      };
      storeData(payload.data["x-access-token"]);

      return {
        ...state,
        token: payload.data["x-access-token"],
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
        user: payload.data,
      };
    case LOGOUT:
      const removeToken = async () => {
        try {
          await AsyncStorage.removeItem("token");
        } catch (e) {
          // saving error
        }
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
};

export default AuthReducer;
