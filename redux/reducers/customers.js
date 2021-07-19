import {
  READ_CUSTOMERS,
  READ_ONE_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  CUSTOMER_ERROR,
  START_CUSTOMERS_RELOAD,
  FINISHED_CUSTOMERS_RELOAD,
} from "../types/customers";
const initialState = {
  customers: [],
  customer: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_CUSTOMERS:
      return {
        ...state,
        customers: payload.data,
        readable: true,
      };

    case READ_ONE_CUSTOMER:
      return {
        ...state,
        customer: payload.data,
      };
    case CREATE_CUSTOMER:
      return {
        ...state,
        customers: [payload.data, ...state.customers],
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customers: [
          ...state.customers.map((customer) =>
            customer.id === payload.data.id ? payload.data : customer
          ),
        ],
      };
    case START_CUSTOMERS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_CUSTOMERS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
