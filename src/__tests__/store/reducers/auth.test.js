import reducer from '../../../store/reducers/auth';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockState = {
  authModal: true,
  userId: null,
  token: null,
  error: null,
  loading: false,
};

describe('auth reducer', () => {
  it('should return the initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      authModal: false,
      userId: null,
      token: null,
      error: null,
      loading: false,
    });
  });

  it('should set the authModal to true', () => {
    expect(reducer(undefined, { type: actionTypes.SHOW_AUTH_MODAL })).toEqual({
      authModal: true,
      userId: null,
      token: null,
      error: null,
      loading: false,
    });
  });

  it('should set the authModal to true', () => {
    expect(reducer(undefined, { type: actionTypes.CLOSE_AUTH_MODAL })).toEqual({
      authModal: false,
      userId: null,
      token: null,
      error: null,
      loading: false,
    });
  });

  it('should start loading and reset the error', () => {
    mockState.error = 'some error';
    expect(reducer(mockState, { type: actionTypes.AUTH_START })).toEqual({
      authModal: true,
      userId: null,
      token: null,
      error: null,
      loading: true,
    });
  });

  it('should set the error message', () => {
    expect(
      reducer(mockState, {
        type: actionTypes.AUTH_FAIL,
        error: { message: 'some error' },
      })
    ).toEqual({
      authModal: true,
      userId: null,
      token: null,
      error: 'some error',
      loading: false,
    });

    expect(
      reducer(mockState, {
        type: actionTypes.AUTH_FAIL,
        error: { message: 'INVALID_EMAIL' },
      })
    ).toEqual({
      authModal: true,
      userId: null,
      token: null,
      error: 'The email address is badly formatted.',
      loading: false,
    });
  });

  it('should set user data when success', () => {
    mockState.loading = true;
    mockState.error = 'some-error';
    expect(
      reducer(mockState, {
        type: actionTypes.AUTH_SUCCESS,
        userId: 'user-id',
        token: 'some-token',
      })
    ).toEqual({
      authModal: false,
      userId: 'user-id',
      token: 'some-token',
      error: null,
      loading: false,
    });
  });

  it('should set remove the user data when log out', () => {
    mockState.userId = 'user-id';
    mockState.token = 'some-token';
    mockState.authModal = false;
    mockState.loading = false;
    mockState.error = null;

    expect(reducer(mockState, { type: actionTypes.AUTH_LOGOUT })).toEqual({
      authModal: false,
      userId: null,
      token: null,
      error: null,
      loading: false,
    });
  });

  it('should set close the modal after sending the reset password', () => {
    mockState.authModal = true;
    mockState.loading = true;
    mockState.userId = null;
    mockState.token = null;

    expect(
      reducer(mockState, { type: actionTypes.AUTH_FORGOT_PASSWORD })
    ).toEqual({
      authModal: false,
      userId: null,
      token: null,
      error: null,
      loading: false,
    });
  });
});

/*
AUTH_FORGOT_PASSWORD
*/
