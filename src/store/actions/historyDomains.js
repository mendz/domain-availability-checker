import * as actionTypes from './actionTypes';

import {
  setHistoryDomains,
  getHistoryDomains,
  firebaseApp,
} from '../../utils/firebase';
import { loadLocalHistory } from '../utility';

const saveToHistory = historyDomains => ({
  type: actionTypes.SAVE_HISTORY_DOMAINS,
  historyDomains,
});

export const saveToHistoryDB = (historyDomains, userId) => async dispatch => {
  console.log('historyDomains:', historyDomains);
  historyDomains.forEach(domainData => {
    // get a key for a new the domain
    const domainId = firebaseApp
      .database()
      .ref()
      .child('historyDomains')
      .push().key;

    domainData.userId = userId;
    console.log('domainData:', domainData);
    console.log('domainId:', domainId);
    firebaseApp
      .database()
      .ref(`historyDomains/${domainId}`)
      .set(...domainData);
  });
  dispatch(saveToHistory(historyDomains));
};

// const history = loadLocalHistory();
export const loadHistory = historyDomains => ({
  type: actionTypes.LOAD_HISTORY_DOMAINS,
  historyDomains,
});

export const startLoadHistory = () => ({
  type: actionTypes.START_LOAD_HISTORY_DOMAINS,
});

export const loadHistoryFromDB = userId => async dispatch => {
  dispatch(startLoadHistory());
  const historyDomains = await getHistoryDomains(userId);
  dispatch(loadHistory(historyDomains));
};

export const removeHistory = () => ({
  type: actionTypes.REMOVE_HISTORY_DOMAINS,
});

export const resetFilter = () => ({
  type: actionTypes.RESET_FILTER,
});

export const setSearchValue = searchValue => ({
  type: actionTypes.SET_SEARCH_VALUE,
  searchValue,
});

export const setFilterType = filterType => ({
  type: actionTypes.SET_FILTER_TYPE,
  filterType,
});
