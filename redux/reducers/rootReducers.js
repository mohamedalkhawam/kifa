import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import productsReducer from "./products";
import appReducer from "./app";
import customersReducer from "./customers";
import settingsReducer from "./settings";
import orderReducer from "./order";
import invoicesReducer from "./invoice";
export default combineReducers({
  AuthReducer,
  appReducer,
  productsReducer,
  customersReducer,
  settingsReducer,
  orderReducer,
  invoicesReducer,
});
