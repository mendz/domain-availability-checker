import * as actionTypes from '../actions/actionTypes';
import {
  updateObject,
  saveToLocalHistory,
  removeLocalHistory,
} from '../utility';

const initialState = {
  historyDomains: [],
  searchValue: '',
  filterType: 'all',
  loading: false,
};

const onSaveHistory = (state, action) => {
  const { historyDomains } = action;
  // const currentHistory = saveToLocalHistory(historyDomains);

  return updateObject(state, {
    historyDomains: historyDomains,
  });
};

const onLoadHistory = (state, action) => {
  const { historyDomains } = action;
  return updateObject(state, {
    historyDomains: historyDomains,
    filterType: 'all',
    searchValue: '',
  });
};

const onRemoveHistory = (state, action) => {
  removeLocalHistory();
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

const onStartLoading = (state, action) =>
  updateObject(state, { loading: true });

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

    case actionTypes.START_LOAD_HISTORY_DOMAINS:
      return onStartLoading(state, action);

    default:
      return state;
  }
};

export default historyDomainsReducer;
