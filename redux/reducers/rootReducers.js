import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import productsReducer from "./products";
import appReducer from "./app";
import customersReducer from "./customers";
import settingsReducer from "./settings";
export default combineReducers({
  AuthReducer,
  appReducer,
  productsReducer,
  customersReducer,
  settingsReducer,
});
