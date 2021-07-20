import {
  CREATE_ORDER,
  START_ORDERS_RELOAD,
  FINISHED_ORDERS_RELOAD,
} from "../types/order";

const initialState = {
  order: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: payload.data,
      };

    case START_ORDERS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_ORDERS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
