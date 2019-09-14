import * as actionTypes from './actionTypes';

export const saveToHistory = historyDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SAVE_HISTORY,
  historyDomains,
});

export const loadHistory = () => ({
  type: actionTypes.HISTORY_DOMAINS_LOAD_HISTORY,
});

export const removeHistory = () => ({
  type: actionTypes.HISTORY_DOMAINS_REMOVE_HISTORY,
});

export const resetFilter = () => ({
  type: actionTypes.HISTORY_DOMAINS_RESET_FILTER,
});

export const filter = () => ({
  type: actionTypes.FILTER_DOMAINS,
});

export const setSearchValue = searchValue => ({
  type: actionTypes.SET_SEARCH_VALUE,
  searchValue,
});

export const setFilterType = filterType => ({
  type: actionTypes.SET_FILTER_TYPE,
  filterType,
});
