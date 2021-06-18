import { FINISHED_RELOAD } from '../../types';

export const finishedReload = () => dispatch => {
  dispatch({ type: FINISHED_RELOAD });
};
