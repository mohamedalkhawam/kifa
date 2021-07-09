import { ADD_PRODUCT, REMOVE_PRODUCT, ADD_ONE, REMOVE_ONE } from "../types/app";
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};
export const removeProduct = (id) => {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
};
export const addOne = (id) => {
  return {
    type: ADD_ONE,
    payload: id,
  };
};
export const removeOne = (id) => {
  return {
    type: REMOVE_ONE,
    payload: id,
  };
};
