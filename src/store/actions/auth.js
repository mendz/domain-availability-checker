import * as actionTypes from './actionTypes';

export const showAuthModal = () => ({
  type: actionTypes.SHOW_AUTH_MODAL,
});

export const closeAuthModal = () => ({
  type: actionTypes.CLOSE_AUTH_MODAL,
});
