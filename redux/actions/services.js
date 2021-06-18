import {
  READ_SERVICES,
  READ_ONE_SERVICE,
  SERVICE_ERROR,
  START_SERVICES_RELOAD,
  FINISHED_SERVICES_RELOAD,
} from "../types/services";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";

export const startServicesReload = () => (dispatch) => {
  dispatch({ type: START_SERVICES_RELOAD });
};

export const finishedServicesReload = () => (dispatch) => {
  dispatch({ type: FINISHED_SERVICES_RELOAD });
};

export const readServices = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/services/all",
    successType: READ_SERVICES,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const readOneService = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/services/`,
    successType: READ_ONE_SERVICE,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
