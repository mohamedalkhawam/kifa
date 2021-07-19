import {
  READ_PRODUCTS,
  START_PRODUCTS_RELOAD,
  FINISHED_PRODUCTS_RELOAD,
  PRODUCT_ERROR,
} from "../types/products";

const initialState = {
  products: [],
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_PRODUCTS:
      return {
        ...state,
        products: payload.data,
        readable: true,
      };

    case START_PRODUCTS_RELOAD:
      return {
        ...state,
        loading: true,
      };
    case FINISHED_PRODUCTS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
