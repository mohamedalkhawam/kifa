import {
  READ_CARS,
  READ_ONE_CAR,
  CREATE_CAR,
  UPDATE_CAR,
  DELETE_CAR,
  CLEAR_CAR,
  START_CARS_RELOAD,
  FINISHED_CARS_RELOAD,
  READ_MY_CARS,
} from "../types/cars";

const initialState = {
  cars: [],
  car: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_CARS:
      return {
        ...state,
        cars: payload.data,
        readable: true,
      };
    case READ_MY_CARS:
      return {
        ...state,
        cars: payload.data,
        readable: true,
      };
    case READ_ONE_CAR:
      return {
        ...state,
        car: payload.data,
      };
    case CREATE_CAR:
      return {
        ...state,
        cars: [payload.data, ...state.cars],
      };
    case UPDATE_CAR:
      return {
        ...state,
        cars: [
          ...state.cars.map((car) =>
            car._id === payload.data.car.data._id ? payload.data.car.data : car
          ),
        ],
      };
    case DELETE_CAR:
      return {
        ...state,
        cars: [...state.cars.filter((car) => car._id !== payload.data._id)],
      };
    case CLEAR_CAR:
      return {
        ...state,
        car: {},
      };
    case START_CARS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_CARS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
