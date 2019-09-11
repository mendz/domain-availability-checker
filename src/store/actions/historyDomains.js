import * as actionTypes from './actionTypes';

const filterDomains = (
  valueToSearch,
  historyDomains,
  filteredDomains,
  filterType,
  inputSearchData = ''
) => {
  // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
  const searchValue = valueToSearch || inputSearchData;
  // 2. check if domains are filterType and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
  let domains = historyDomains;
  if (filterType !== 'all' && valueToSearch) {
    domains = filteredDomains;
  }
  return domains.filter(domain => domain.name.includes(searchValue));
};

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

const filterByAll = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_ALL,
  allDomains,
});

const filterByAvailable = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_AVAILABLE,
  allDomains,
});

const filterByUnavailable = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE,
  allDomains,
});

export const filterBy = type => (dispatch, getState) => {
  const {
    historyDomains,
    inputSearchData,
    filteredDomains,
    filterType,
  } = getState().historyDomains;
  // get the correct domains filtered/all of them.
  const allDomains =
    inputSearchData.trim() !== ''
      ? [
          ...filterDomains(
            null,
            historyDomains,
            filteredDomains,
            filterType,
            inputSearchData
          ),
        ]
      : [...historyDomains];

  switch (type) {
    case 'all':
      dispatch(filterByAll(allDomains));
      break;

    case 'available':
      dispatch(filterByAvailable(allDomains));
      break;

    case 'unavailable':
      dispatch(filterByUnavailable(allDomains));
      break;

    default:
      dispatch(filterByAll(allDomains));
      break;
  }
};

const changeFilteredBySearchValueWithSort = (
  updatedDomains,
  valueToSearch
) => ({
  type: actionTypes.CHANGE_FILTER_BY_SEARCH_VALUE_SORT,
  updatedDomains,
  valueToSearch,
});

const clearFilteredSearchValue = () => ({
  type: actionTypes.HISTORY_DOMAINS_CLEAR_FILTERED_SEARCH,
});

export const changeFilteredBySearchValue = valueToSearch => (
  dispatch,
  getState
) => {
  const {
    historyDomains,
    filteredDomains,
    filterType,
  } = getState().historyDomains;

  // no search value - clear the search and the filterType is no ALL
  if (valueToSearch.trim() === '' && filterType !== 'all') {
    dispatch(clearFilteredSearchValue());
    dispatch(filterBy(filterType));

    // no search value and don't have filterType - reset the filter
  } else if (valueToSearch.trim() === '' && filterType === 'all') {
    dispatch(resetFilter());

    // we have search value with filterType
  } else {
    const updatedDomains = filterDomains(
      valueToSearch,
      historyDomains,
      filteredDomains,
      filterType
    );
    dispatch(
      changeFilteredBySearchValueWithSort(updatedDomains, valueToSearch)
    );
  }
};
