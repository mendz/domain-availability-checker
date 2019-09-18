import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  authModal: false,
  isLogin: false,
};

const onShowAuthModal = (state, action) =>
  updateObject(state, { authModal: true });

const onCloseAuthModal = (state, action) =>
  updateObject(state, { authModal: false });

const authReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.SHOW_AUTH_MODAL:
      return onShowAuthModal(state, action);

    case actionTypes.CLOSE_AUTH_MODAL:
      return onCloseAuthModal(state, action);

    default:
      return state;
  }
};

export default authReducer;
