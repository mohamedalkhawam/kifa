import {
  READ_PRODUCTS,
  PRODUCTS_ERROR,
  START_PRODUCTS_RELOAD,
  FINISHED_PRODUCTS_RELOAD,
} from "../types/products";

import { readItemsAsync } from "./equCurd/readItems";

export const startProductsReload = () => (dispatch) => {
  dispatch({ type: START_PRODUCTS_RELOAD });
};

export const finishedProductsReload = () => (dispatch) => {
  dispatch({ type: FINISHED_PRODUCTS_RELOAD });
};

export const readProducts = (token) =>
  readItemsAsync({
    url: "https://www.kifapos.com/api/products",
    successType: READ_PRODUCTS,
    errorType: PRODUCTS_ERROR,
    startReload: startProductsReload,
    finishedReload: finishedProductsReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
