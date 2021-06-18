import {
  READ_CITIES,
  READ_ONE_CITY,
  CREATE_CITY,
  UPDATE_CITY,
  DELETE_CITY,
  CITY_ERROR,
  CLEAR_CITY,
  START_CITIES_RELOAD,
  FINISHED_CITIES_RELOAD,
} from "../types/city";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startCityReload = () => (dispatch) => {
  dispatch({ type: START_CITIES_RELOAD });
};

export const finishedCityReload = () => (dispatch) => {
  dispatch({ type: FINISHED_CITIES_RELOAD });
};

export const readCities = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cities/all",
    successType: READ_CITIES,
    errorType: CITY_ERROR,
    startReload: startCityReload,
    finishedReload: finishedCityReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const readOneCity = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/cities/`,
    successType: READ_ONE_CITY,
    errorType: CITY_ERROR,
    startReload: startCityReload,
    finishedReload: finishedCityReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const createsCity = (formData, token) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cities/",
    successType: CREATE_CITY,
    errorType: CITY_ERROR,
    startReload: startCityReload,
    finishedReload: finishedCityReload,
    title: "Cities",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const updateCity = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cities",
    successType: UPDATE_CITY,
    errorType: CITY_ERROR,
    startReload: startCityReload,
    finishedReload: finishedCityReload,
    title: "Cities",
    formData,
    id: formData._id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const deleteCity = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/cities/",
    successType: DELETE_CITY,
    errorType: CITY_ERROR,
    startReload: startCityReload,
    finishedReload: finishedCityReload,
    title: "Cities",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const clearCity = () => (dispatch) => {
  dispatch({ type: CLEAR_CITY });
};
