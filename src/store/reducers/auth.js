import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  authModal: false,
  userId: null,
  token: null,
  error: null,
  loading: false,
};

const normalizeError = error => {
  const errorTypes = {
    INVALID_EMAIL: 'The email address is badly formatted.',
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND:
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD:
      'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
  };

  if (errorTypes[error.message]) {
    return updateObject(error, { message: errorTypes[error.message] });
  }
  return error.message;
};

const onShowAuthModal = (state, action) =>
  updateObject(state, { authModal: true });

const onCloseAuthModal = (state, action) =>
  updateObject(state, { authModal: false, error: null });

const onAuthStart = (state, action) =>
  updateObject(state, { loading: true, error: null });

const onAuthFail = (state, action) => {
  const { error } = action;
  return updateObject(state, { loading: false, error: normalizeError(error) });
};

const onAuthSuccess = (state, action) => {
  const { userId, token } = action;
  return updateObject(state, {
    loading: false,
    userId,
    token,
    authModal: false,
  });
};

const onLogOut = (state, action) =>
  updateObject(state, {
    userId: null,
    token: null,
  });

const onRestPassword = (state, action) =>
  updateObject(state, { authModal: false, loading: false });

const authReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.SHOW_AUTH_MODAL:
      return onShowAuthModal(state, action);

    case actionTypes.CLOSE_AUTH_MODAL:
      return onCloseAuthModal(state, action);

    case actionTypes.AUTH_START:
      return onAuthStart(state, action);

    case actionTypes.AUTH_FAIL:
      return onAuthFail(state, action);

    case actionTypes.AUTH_SUCCESS:
      return onAuthSuccess(state, action);

    case actionTypes.AUTH_LOGOUT:
      return onLogOut(state, action);

    case actionTypes.AUTH_FORGOT_PASSWORD:
      return onRestPassword(state, action);

    default:
      return state;
  }
};

export default authReducer;
