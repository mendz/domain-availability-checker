import * as actionTypes from '../actions/actionTypes';
import {
  updateObject,
  loadHistory,
  saveToHistory,
  removeHistory,
} from '../utility';

// TODO: add/replace(sorted) the type of selected sort option
const initialState = {
  historyDomains: [],
  filteredDomains: [],
  inputSearchData: '',
  sorted: false,
};

const onSaveHistory = (state, action) => {
  const { historyDomains } = action;
  saveToHistory(historyDomains);
  return updateObject(state, {
    historyDomains,
    filteredDomains: historyDomains,
  });
};

const onLoadHistory = (state, action) => {
  const history = loadHistory();
  return updateObject(state, {
    historyDomains: history,
    filteredDomains: history,
    sorted: false,
    inputSearchData: '',
  });
};

const onRemoveHistory = (state, action) => {
  removeHistory();
  return updateObject(state, {
    historyDomains: [],
    filteredDomains: [],
    sorted: false,
    inputSearchData: '',
  });
};

const onResetFilter = (state, action) =>
  updateObject(state, {
    filteredDomains: state.historyDomains,
    sorted: false,
    inputSearchData: '',
  });

const onSortByAll = (state, action) => {
  const { allDomains } = action;
  return updateObject(state, { filteredDomains: allDomains, sorted: false });
};

const onSortBySuccess = (state, action) => {
  const { allDomains } = action;
  const filtered = allDomains.filter(domain => domain.availability);
  return updateObject(state, { filteredDomains: filtered, sorted: true });
};

const onSortByFail = (state, action) => {
  const { allDomains } = action;
  const filtered = allDomains.filter(domain => !domain.availability);
  return updateObject(state, { filteredDomains: filtered, sorted: true });
};

const setFilteredDomains = (state, action) => {
  const { filteredDomains, inputSearchData } = action;
  return updateObject(state, { filteredDomains, inputSearchData });
};

const historyDomainsReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.HISTORY_DOMAINS_SAVE_HISTORY:
      return onSaveHistory(state, action);

    case actionTypes.HISTORY_DOMAINS_LOAD_HISTORY:
      return onLoadHistory(state, action);

    case actionTypes.HISTORY_DOMAINS_REMOVE_HISTORY:
      return onRemoveHistory(state, action);

    case actionTypes.HISTORY_DOMAINS_RESET_FILTER:
      return onResetFilter(state, action);

    case actionTypes.HISTORY_DOMAINS_SORT_FILTER_ALL:
      return onSortByAll(state, action);

    case actionTypes.HISTORY_DOMAINS_SORT_FILTER_SUCCESS:
      return onSortBySuccess(state, action);

    case actionTypes.HISTORY_DOMAINS_SORT_FILTER_FAIL:
      return onSortByFail(state, action);

    case actionTypes.HISTORY_DOMAINS_SET_FILTERED:
      return setFilteredDomains(state, action);

    default:
      return state;
  }
};

export default historyDomainsReducer;
