import {
  READ_ORDERS,
  READ_ONE_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  ORDER_ERROR,
  CLEAR_ORDER,
  START_ORDERS_RELOAD,
  FINISHED_ORDERS_RELOAD,
  READ_MY_ORDERS,
  UNSUBSCRIBE,
} from "../types/orders";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startOrdersReload = () => (dispatch) => {
  dispatch({ type: START_ORDERS_RELOAD });
};

export const finishedOrdersReload = () => (dispatch) => {
  dispatch({ type: FINISHED_ORDERS_RELOAD });
};

export const readOrders = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/orders/all",
    successType: READ_ORDERS,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const readMyOrders = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/orders/me",
    successType: READ_MY_ORDERS,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const unsubscribeToOrder = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/payment/unsubscribe/",
    successType: UNSUBSCRIBE,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: "Orders",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const readOneOrder = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/orders/`,
    successType: READ_ONE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const createsOrder = (formData, token) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/orders/",
    successType: CREATE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: "Orders",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const updateOrder = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/orders",
    successType: UPDATE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: "Orders",
    formData,
    id: formData._id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const deleteOrder = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/orders/",
    successType: DELETE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: "Orders",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
