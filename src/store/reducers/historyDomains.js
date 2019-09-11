import * as actionTypes from '../actions/actionTypes';
import {
  updateObject,
  loadHistory,
  saveToHistory,
  removeHistory,
} from '../utility';

const initialState = {
  historyDomains: [],
  filteredDomains: [],
  inputSearchData: '',
  filterType: 'all',
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
    filterType: 'all',
    inputSearchData: '',
  });
};

const onRemoveHistory = (state, action) => {
  removeHistory();
  return updateObject(state, {
    historyDomains: [],
    filteredDomains: [],
    filterType: 'all',
    inputSearchData: '',
  });
};

const onResetFilter = (state, action) =>
  updateObject(state, {
    filteredDomains: state.historyDomains,
    filterType: 'all',
    inputSearchData: '',
  });

const onSortByAll = (state, action) => {
  const { allDomains } = action;
  return updateObject(state, {
    filteredDomains: allDomains,
    filterType: 'all',
  });
};

const onSortBySuccess = (state, action) => {
  const { allDomains } = action;
  const filtered = allDomains.filter(domain => domain.availability);
  return updateObject(state, {
    filteredDomains: filtered,
    filterType: 'available',
  });
};

const onSortByFail = (state, action) => {
  const { allDomains } = action;
  const filtered = allDomains.filter(domain => !domain.availability);
  return updateObject(state, {
    filteredDomains: filtered,
    filterType: 'unavailable',
  });
};

const onChangeFilteredBySearchValueWithSort = (state, action) => {
  const { updatedDomains, valueToSearch } = action;
  return updateObject(state, {
    filteredDomains: updatedDomains,
    inputSearchData: valueToSearch,
  });
};

const onClearFilteredSearch = (state, action) =>
  updateObject(state, { inputSearchData: '' });

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

    case actionTypes.HISTORY_DOMAINS_SORT_FILTER_AVAILABLE:
      return onSortBySuccess(state, action);

    case actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE:
      return onSortByFail(state, action);

    case actionTypes.CHANGE_FILTER_BY_SEARCH_VALUE_SORT:
      return onChangeFilteredBySearchValueWithSort(state, action);

    case actionTypes.HISTORY_DOMAINS_CLEAR_FILTERED_SEARCH:
      return onClearFilteredSearch(state, action);

    default:
      return state;
  }
};

export default historyDomainsReducer;
