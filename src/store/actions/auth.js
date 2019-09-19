import firebase from 'firebase/app';
import 'firebase/auth';

import * as actionTypes from './actionTypes';
import { firebaseApp, gmailAuthProvider } from '../../utils/firebase';

import { throwError } from '../../utils/setupErrorsTrack';

// let unsubscribe = null;

export const showAuthModal = () => ({
  type: actionTypes.SHOW_AUTH_MODAL,
});

export const closeAuthModal = () => ({
  type: actionTypes.CLOSE_AUTH_MODAL,
});

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

const authSuccess = (userId, token) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId,
  token,
});

const loggingOut = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const authLogOut = () => async (dispatch, getState) => {
  await firebase.auth().signOut();
  dispatch(loggingOut());
};

export const authEmailPassword = (
  email,
  password,
  isSignup
) => async dispatch => {
  dispatch(authStart());
  try {
    let authData;
    // new user
    if (isSignup) {
      authData = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } else {
      authData = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
    }
    const { user } = authData;
    dispatch(authSuccess(user.uid, user.refreshToken));
  } catch (error) {
    dispatch(authFail(error));
    throwError('Failed to authenticate with email and password', error);
  }
};

export const authGoogleSignIn = () => async dispatch => {
  dispatch(authStart());
  try {
    const authData = await firebaseApp
      .auth()
      .signInWithPopup(gmailAuthProvider);
    // console.log('authData:', authData);
    const { user, credential } = authData;
    dispatch(authSuccess(user.uid, credential.idToken));
  } catch (error) {
    dispatch(authFail(error));
    throwError('Failed to authenticate with Google sign in', error);
  }
};

const onResetPassword = () => ({
  type: actionTypes.AUTH_FORGOT_PASSWORD,
});

export const resetPassword = email => async dispatch => {
  try {
    dispatch(authStart());
    await firebaseApp.auth().sendPasswordResetEmail(email);
    dispatch(onResetPassword());
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const setUser = user => dispatch => {
  dispatch(authStart());
  if (user) {
    dispatch(authSuccess(user.uid, user.refreshToken));
  } else {
    dispatch(authFail({ message: '' }));
  }
};
