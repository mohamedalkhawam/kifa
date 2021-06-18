import {
  READ_BUILDINGS,
  READ_ONE_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING,
  CLEAR_BUILDING,
  START_BUILDINGS_RELOAD,
  FINISHED_BUILDINGS_RELOAD,
} from "../types/buildings";

const initialState = {
  buildings: [],
  building: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_BUILDINGS:
      return {
        ...state,
        buildings: payload.data,
        readable: true,
      };
    case READ_ONE_BUILDING:
      return {
        ...state,
        building: payload.data,
      };
    case CREATE_BUILDING:
      return {
        ...state,
        building: [payload.data, ...state.buildings],
      };
    case UPDATE_BUILDING:
      return {
        ...state,
        buildings: [
          ...state.buildings.map((building) =>
            building._id === payload.data.building.data._id
              ? payload.data.building.data
              : building
          ),
        ],
      };
    case DELETE_BUILDING:
      return {
        ...state,
        buildings: [
          ...state.buildings.filter(
            (building) => building._id !== payload.data._id
          ),
        ],
      };
    case CLEAR_BUILDING:
      return {
        ...state,
        building: {},
      };
    case START_BUILDINGS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_BUILDINGS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
