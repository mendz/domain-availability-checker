import * as actionTypes from './actionTypes';

const filterDomains = (
  valueToSearch,
  historyDomains,
  filteredDomains,
  sorted,
  inputSearchData = ''
) => {
  // 1. if the value is "empty" use the inputSearchData from state, happens in the sortBt function
  const searchValue = valueToSearch || inputSearchData;
  // 2. check if domains are sorted and search have value, if so use the filtered domains, if not it means that it filtered from the sort button and we need to filter it from all the domains
  let domains = historyDomains;
  if (sorted !== 'all' && valueToSearch) {
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

const sortByAll = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_ALL,
  allDomains,
});

const sortByAvailable = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_AVAILABLE,
  allDomains,
});

const sortByUnavailable = allDomains => ({
  type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE,
  allDomains,
});

export const sortBy = type => (dispatch, getState) => {
  const {
    historyDomains,
    inputSearchData,
    filteredDomains,
    sorted,
  } = getState().historyDomains;
  // get the correct domains filtered/all of them.
  const allDomains =
    inputSearchData.trim() !== ''
      ? [
          ...filterDomains(
            null,
            historyDomains,
            filteredDomains,
            sorted,
            inputSearchData
          ),
        ]
      : [...historyDomains];

  switch (type) {
    case 'all':
      dispatch(sortByAll(allDomains));
      break;

    case 'available':
      dispatch(sortByAvailable(allDomains));
      break;

    case 'unavailable':
      dispatch(sortByUnavailable(allDomains));
      break;

    default:
      dispatch(sortByAll(allDomains));
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
  const { historyDomains, filteredDomains, sorted } = getState().historyDomains;

  // no search value - clear the search, however have sorted - filter by sort
  if (valueToSearch.trim() === '' && sorted !== 'all') {
    dispatch(clearFilteredSearchValue());
    dispatch(sortBy(sorted));

    // no search value and don't have sorted - reset the filter
  } else if (valueToSearch.trim() === '' && sorted === 'all') {
    dispatch(resetFilter());

    // we have search value with sorted
  } else {
    const updatedDomains = filterDomains(
      valueToSearch,
      historyDomains,
      filteredDomains,
      sorted
    );
    dispatch(
      changeFilteredBySearchValueWithSort(updatedDomains, valueToSearch)
    );
  }
};
