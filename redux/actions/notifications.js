import {
  READ_NOTIFICATIONS,
  NOTIFICATIONS_ERROR,
  START_NOTIFICATIONS_RELOAD,
  FINISHED_NOTIFICATIONS_RELOAD,
  DELETE_NOTIFICATIONS,
} from "../types/notifications";

import { readItemsAsync } from "./equCurd/readItems";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startNotificationsReload = () => (dispatch) => {
  dispatch({ type: START_NOTIFICATIONS_RELOAD });
};

export const finishedNotificationsReload = () => (dispatch) => {
  dispatch({ type: FINISHED_NOTIFICATIONS_RELOAD });
};

export const readNotifications = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/notifications/me",
    successType: READ_NOTIFICATIONS,
    errorType: NOTIFICATIONS_ERROR,
    startReload: startNotificationsReload,
    finishedReload: finishedNotificationsReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const deleteNotifications = (token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/notifications/me",
    successType: DELETE_NOTIFICATIONS,
    errorType: NOTIFICATIONS_ERROR,
    startReload: startNotificationsReload,
    finishedReload: finishedNotificationsReload,
    title: "notifications",
    id: "",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
