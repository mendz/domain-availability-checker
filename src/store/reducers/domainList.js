import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  decodedDomainList: [],
  checking: false,
  networkError: false,
};

// decoded domains
const setDecodedDomainsStart = (state, action) =>
  updateObject(state, { checking: true });

const updateDecodedDomainsAll = (state, action) =>
  updateObject(state, { decodedDomainList: action.decodedDomains });

const setDecodedDomainsSuccess = (state, action) =>
  updateObject(state, { checking: false, networkError: false });

// TODO: check if not use to remove this
const setDecodedDomainsFail = (state, action) =>
  updateObject(state, { checking: false });

const updateDecodedDomainsItem = (state, action) => {
  const updatedDecodedDomainList = [...state.decodedDomainList];
  const index = updatedDecodedDomainList.findIndex(
    domainToFind => domainToFind.name === action.domainName
  );
  updatedDecodedDomainList[index] = action.resultDomain;
  return updateObject(state, { decodedDomainList: updatedDecodedDomainList });
};

const clearDecodedDomains = (state, action) =>
  updateObject(state, { decodedDomainList: [] });

// check connection
const checkConnectionStart = (state, action) =>
  updateObject(state, { checking: true });

const checkConnectionFail = (state, action) =>
  updateObject(state, { checking: false, networkError: true });

const checkConnectionSuccess = (state, action) =>
  updateObject(state, { checking: false, networkError: false });

const domainListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DECODED_DOMAINS_START:
      return setDecodedDomainsStart(state, action);

    case actionTypes.SET_DECODED_DOMAINS_SUCCESS:
      return setDecodedDomainsSuccess(state, action);

    case actionTypes.UPDATE_DECODE_DOMAINS_ALL:
      return updateDecodedDomainsAll(state, action);

    case actionTypes.SET_DECODED_DOMAINS_FAIL:
      return setDecodedDomainsFail(state, action);

    case actionTypes.UPDATE_DECODE_DOMAINS_ITEM:
      return updateDecodedDomainsItem(state, action);

    case actionTypes.CLEAR_DECODED_DOMAINS:
      return clearDecodedDomains(state, action);

    case actionTypes.CHECK_CONNECTION_START:
      return checkConnectionStart(state, action);

    case actionTypes.CHECK_CONNECTION_FAIL:
      return checkConnectionFail(state, action);

    case actionTypes.CHECK_CONNECTION_SUCCESS:
      return checkConnectionSuccess(state, action);

    default:
      return state;
  }
};

export default domainListReducer;
