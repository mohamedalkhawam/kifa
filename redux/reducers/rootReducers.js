import { combineReducers } from "redux";
import { AuthReducer } from "./Auth";
import servicesReducer from "./services";
import plansReducer from "./plans";
import carsReducer from "./cars";
import usersReducer from "./user";
import citiesReducer from "./city";
import buildingsReducer from "./buildings";
import ordersReducer from "./orders";
import scheduledWashesReducer from "./scheduledWashes";
import introReducer from "./intro";
import notificationsReducer from "./notifications";
export default combineReducers({
  AuthReducer,
  servicesReducer,
  plansReducer,
  carsReducer,
  usersReducer,
  citiesReducer,
  buildingsReducer,
  ordersReducer,
  scheduledWashesReducer,
  introReducer,
  notificationsReducer,
});
