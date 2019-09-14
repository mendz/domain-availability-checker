import * as actionTypes from './actionTypes';

export const saveToHistory = historyDomains => ({
  type: actionTypes.SAVE_HISTORY_DOMAINS,
  historyDomains,
});

export const loadHistory = () => ({
  type: actionTypes.LOAD_HISTORY_DOMAINS,
});

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
