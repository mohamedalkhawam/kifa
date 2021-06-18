import {
  READ_SERVICES,
  READ_ONE_SERVICE,
  START_SERVICES_RELOAD,
  FINISHED_SERVICES_RELOAD,
} from "../types/services";

const initialState = {
  services: [],
  service: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_SERVICES:
      return {
        ...state,
        services: payload.data,
        readable: true,
      };
    case READ_ONE_SERVICE:
      return {
        ...state,
        service: payload.data,
      };

    case START_SERVICES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_SERVICES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
