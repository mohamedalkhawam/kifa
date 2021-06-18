import { START_RELOAD } from '../../types';

export const startReload = () => dispatch => {
  dispatch({ type: START_RELOAD });
};
