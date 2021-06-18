import {
  READ_INTROS,
  READ_ONE_INTRO,
  CREATE_INTRO,
  UPDATE_INTRO,
  DELETE_INTRO,
  CLEAR_INTRO,
  START_INTROS_RELOAD,
  FINISHED_INTROS_RELOAD,
} from "../types/intro";

const initialState = {
  intros: [],
  intro: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_INTROS:
      return {
        ...state,
        intros: payload.data,
        readable: true,
      };
    case READ_ONE_INTRO:
      return {
        ...state,
        intro: payload.data,
      };
    case CREATE_INTRO:
      return {
        ...state,
        intros: [payload.data, ...state.intros],
      };
    case UPDATE_INTRO:
      return {
        ...state,
        intros: [
          ...state.intros.map((intro) =>
            intro._id === payload.data.intro.data._id
              ? payload.data.intro.data
              : intro
          ),
        ],
      };
    case DELETE_INTRO:
      return {
        ...state,
        intros: [
          ...state.intros.filter((intro) => intro._id !== payload.data._id),
        ],
      };
    case CLEAR_INTRO:
      return {
        ...state,
        intro: {},
      };
    case START_INTROS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_INTROS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
