import {
  READ_SCHEDULED_WASHES,
  READ_ONE_SCHEDULED_WASH,
  CREATE_SCHEDULED_WASH,
  UPDATE_SCHEDULED_WASH,
  DELETE_SCHEDULED_WASH,
  SCHEDULED_WASH_ERROR,
  CLEAR_SCHEDULED_WASH,
  START_SCHEDULED_WASHES_RELOAD,
  FINISHED_SCHEDULED_WASHES_RELOAD,
} from "../types/scheduledWashes";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startScheduledWashesReload = () => (dispatch) => {
  dispatch({ type: START_SCHEDULED_WASHES_RELOAD });
};

export const finishedScheduledWashesReload = () => (dispatch) => {
  dispatch({ type: FINISHED_SCHEDULED_WASHES_RELOAD });
};

export const readScheduledWashes = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/scheduled-wash/all",
    successType: READ_SCHEDULED_WASHES,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const readOneScheduledWash = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/scheduled-wash/`,
    successType: READ_ONE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const createsScheduledWash = (formData, token) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/scheduled-wash/",
    successType: CREATE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: "ScheduledWashes",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const updateScheduledWash = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/scheduled-wash",
    successType: UPDATE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: "ScheduledWashes",
    formData,
    id: formData._id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const deleteScheduledWash = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/scheduled-wash/",
    successType: DELETE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: "ScheduledWashes",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const clearScheduledWash = () => (dispatch) => {
  dispatch({ type: CLEAR_SCHEDULED_WASH });
};
