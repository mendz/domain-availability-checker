import * as actionTypes from './actions/actionTypes';
import { updateObject, saveToHistory } from './utility';

const initialState = {
  decodedDomainList: [],
  checking: false,
};

const setDecodedDomainsStart = (state, action) =>
  updateObject(state, { checking: true });

const updateDecodedDomainsAll = (state, action) =>
  updateObject(state, { decodedDomainList: action.decodedDomains });

const setDecodedDomainsSuccess = (state, action) =>
  updateObject(state, { checking: false });

const setDecodedDomainsFail = (state, action) =>
  updateObject(state, { checking: false });

const clearDecodedDomains = (state, action) =>
  updateObject(state, { decodedDomainList: [] });

const updateDecodedDomainsItem = (state, action) => {
  const updatedDecodedDomainList = [...state.decodedDomainList];
  const index = updatedDecodedDomainList.findIndex(
    domainToFind => domainToFind.name === action.domainName
  );
  updatedDecodedDomainList[index] = action.resultDomain;
  return updateObject(state, { decodedDomainList: updatedDecodedDomainList });
};

const saveDomainsToHistory = (state, action) => {
  saveToHistory(state.decodedDomainList);
  return state;
};

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

    case actionTypes.SAVE_DOMAINS_TO_HISTORY:
      return saveDomainsToHistory(state, action);

    default:
      return state;
  }
};

export default domainListReducer;
