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

const sortByAll = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_ALL,
  allDomains,
});

const sortBySuccess = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_SUCCESS,
  allDomains,
});

const sortByFail = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_FAIL,
  allDomains,
});

export const sortBy = (type, allDomains) => dispatch => {
  switch (type) {
    case 'all':
      dispatch(sortByAll(allDomains));
      break;

    case 'success':
      dispatch(sortBySuccess(allDomains));
      break;

    case 'fail':
      dispatch(sortByFail(allDomains));
      break;

    default:
      dispatch(sortByAll(allDomains));
      break;
  }
};

export const setFilteredHistoryDomains = (
  filteredDomains,
  inputSearchData
) => ({
  type: actionTypes.HISTORY_DOMAINS_SET_FILTERED,
  filteredDomains,
  inputSearchData,
});
