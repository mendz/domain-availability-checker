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
  searchValue: '',
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
    searchValue: '',
  });
};

const onRemoveHistory = (state, action) => {
  removeHistory();
  return updateObject(state, {
    historyDomains: [],
    filteredDomains: [],
    filterType: 'all',
    searchValue: '',
  });
};

const onResetFilter = (state, action) =>
  updateObject(state, {
    filteredDomains: state.historyDomains,
    filterType: 'all',
    searchValue: '',
  });

const onFilterDomains = (state, action) => {
  const { historyDomains, searchValue, filterType } = state;
  let filtered = [...historyDomains];
  if (filterType === 'available') {
    filtered = historyDomains.filter(domain => domain.availability);
  } else if (filterType === 'unavailable') {
    filtered = historyDomains.filter(domain => !domain.availability);
  }

  let filteredDomains = filtered;
  if (searchValue.trim() !== '') {
    filteredDomains = filtered.filter(domain =>
      domain.name.includes(searchValue)
    );
  }

  return updateObject(state, {
    filteredDomains: filteredDomains,
  });
};

const onSetSearchValue = (state, action) =>
  updateObject(state, { searchValue: action.searchValue });

const onSetFilterType = (state, action) =>
  updateObject(state, { filterType: action.filterType });

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

    case actionTypes.FILTER_DOMAINS:
      return onFilterDomains(state, action);

    case actionTypes.SET_SEARCH_VALUE:
      return onSetSearchValue(state, action);

    case actionTypes.SET_FILTER_TYPE:
      return onSetFilterType(state, action);

    default:
      return state;
  }
};

export default historyDomainsReducer;
