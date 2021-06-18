import {
  READ_ORDERS,
  READ_ONE_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  CLEAR_ORDER,
  START_ORDERS_RELOAD,
  FINISHED_ORDERS_RELOAD,
  READ_MY_ORDERS,
} from "../types/orders";

const initialState = {
  orders: [],
  order: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_ORDERS:
      return {
        ...state,
        orders: payload.data,
        readable: true,
      };
    case READ_MY_ORDERS:
      return {
        ...state,
        orders: payload.data,
        readable: true,
      };
    case READ_ONE_ORDER:
      return {
        ...state,
        order: payload.data,
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: [payload.data, ...state.orders],
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders.map((order) =>
            order._id === payload.data.order.data._id
              ? payload.data.order.data
              : order
          ),
        ],
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders.filter((order) => order._id !== payload.data._id),
        ],
      };
    case CLEAR_ORDER:
      return {
        ...state,
        order: {},
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
