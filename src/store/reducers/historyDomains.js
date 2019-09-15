import * as actionTypes from '../actions/actionTypes';
import {
  updateObject,
  loadHistory,
  saveToHistory,
  removeHistory,
} from '../utility';

const initialState = {
  historyDomains: [],
  searchValue: '',
  filterType: 'all',
};

const onSaveHistory = (state, action) => {
  const { historyDomains } = action;
  const currentHistory = saveToHistory(historyDomains);

  return updateObject(state, {
    historyDomains: currentHistory,
  });
};

const onLoadHistory = (state, action) => {
  const history = loadHistory();
  return updateObject(state, {
    historyDomains: history,
    filterType: 'all',
    searchValue: '',
  });
};

const onRemoveHistory = (state, action) => {
  removeHistory();
  return updateObject(state, {
    historyDomains: [],
    filterType: 'all',
    searchValue: '',
  });
};

const onResetFilter = (state, action) =>
  updateObject(state, {
    filterType: 'all',
    searchValue: '',
  });

const onSetSearchValue = (state, action) =>
  updateObject(state, { searchValue: action.searchValue });

const onSetFilterType = (state, action) =>
  updateObject(state, { filterType: action.filterType });

const historyDomainsReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.SAVE_HISTORY_DOMAINS:
      return onSaveHistory(state, action);

    case actionTypes.LOAD_HISTORY_DOMAINS:
      return onLoadHistory(state, action);

    case actionTypes.REMOVE_HISTORY_DOMAINS:
      return onRemoveHistory(state, action);

    case actionTypes.RESET_FILTER:
      return onResetFilter(state, action);

    case actionTypes.SET_SEARCH_VALUE:
      return onSetSearchValue(state, action);

    case actionTypes.SET_FILTER_TYPE:
      return onSetFilterType(state, action);

    default:
      return state;
  }
};

export default historyDomainsReducer;
