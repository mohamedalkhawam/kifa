import {
  READ_CITIES,
  READ_ONE_CITY,
  CREATE_CITY,
  UPDATE_CITY,
  DELETE_CITY,
  CLEAR_CITY,
  START_CITIES_RELOAD,
  FINISHED_CITIES_RELOAD,
} from "../types/city";

const initialState = {
  cities: [],
  city: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_CITIES:
      return {
        ...state,
        cities: payload.data,
        readable: true,
      };
    case READ_ONE_CITY:
      return {
        ...state,
        city: payload.data,
      };
    case CREATE_CITY:
      return {
        ...state,
        cities: [payload.data, ...state.cities],
      };
    case UPDATE_CITY:
      return {
        ...state,
        cities: [
          ...state.cities.map((city) =>
            city._id === payload.data.city.data._id
              ? payload.data.city.data
              : city
          ),
        ],
      };
    case DELETE_CITY:
      return {
        ...state,
        cities: [
          ...state.cities.filter((city) => city._id !== payload.data._id),
        ],
      };
    case CLEAR_CITY:
      return {
        ...state,
        city: {},
      };
    case START_CITIES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_CITIES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
