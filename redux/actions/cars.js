import {
  READ_CARS,
  READ_ONE_CAR,
  CREATE_CAR,
  UPDATE_CAR,
  DELETE_CAR,
  CAR_ERROR,
  CLEAR_CAR,
  START_CARS_RELOAD,
  FINISHED_CARS_RELOAD,
  READ_MY_CARS,
} from "../types/cars";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startCarReload = () => (dispatch) => {
  dispatch({ type: START_CARS_RELOAD });
};

export const finishedCarReload = () => (dispatch) => {
  dispatch({ type: FINISHED_CARS_RELOAD });
};

export const readCars = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cars/all",
    successType: READ_CARS,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const readMyCars = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cars/me",
    successType: READ_MY_CARS,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const readOneCar = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/cars/`,
    successType: READ_ONE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const createsCar = (formData, token) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cars/",
    successType: CREATE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    title: "Cars",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const updateCar = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cars/",
    successType: UPDATE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    title: "Cars",
    formData,
    id: formData.id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const deleteCar = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cars/",
    successType: DELETE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarReload,
    finishedReload: finishedCarReload,
    title: "Cars",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const clearCar = () => (dispatch) => {
  dispatch({ type: CLEAR_CAR });
};
