import reducer from '../../../store/reducers/historyDomains';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockHistoryDomainListArr = [
  { name: 'test', availability: false, networkError: false, invalid: true },
  {
    name: 'www.w3schools',
    availability: false,
    networkError: false,
    invalid: true,
  },
  {
    name: 'github.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
  {
    name: 'a.com',
    availability: true,
    networkError: false,
    invalid: false,
  },
];

const mockWithHistoryDomains = {
  historyDomains: mockHistoryDomainListArr,
  filteredDomains: [
    {
      name: 'github.com',
      availability: false,
      networkError: false,
      invalid: false,
    },
    {
      name: 'a.com',
      availability: true,
      networkError: false,
      invalid: false,
    },
  ],
  inputSearchData: 'm',
  sorted: 'all',
};

const mockWithHistoryDomainsWithoutFilter = {
  historyDomains: mockHistoryDomainListArr,
  filteredDomains: mockHistoryDomainListArr,
  inputSearchData: '',
  sorted: 'all',
};

describe('history domains reducer', () => {
  it('should return the initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      historyDomains: [],
      filteredDomains: [],
      inputSearchData: '',
      sorted: 'all',
    });
  });

  it('should save the domains to the local history and state', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.HISTORY_DOMAINS_SAVE_HISTORY,
        historyDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: mockHistoryDomainListArr,
      inputSearchData: '',
      sorted: 'all',
    });

    const loadedHistoryDomains = localStorage.getItem('historyDomains');
    expect(JSON.parse(loadedHistoryDomains)).toEqual(mockHistoryDomainListArr);
  });

  it('should load domains from local history to the state', () => {
    // set the local history
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(mockHistoryDomainListArr)
    );
    expect(
      reducer(undefined, {
        type: actionTypes.HISTORY_DOMAINS_LOAD_HISTORY,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: mockHistoryDomainListArr,
      inputSearchData: '',
      sorted: 'all',
    });
  });

  it('should remove local history and rest domains from state', () => {
    // set the local history
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(mockHistoryDomainListArr)
    );
    expect(
      reducer(mockWithHistoryDomains, {
        type: actionTypes.HISTORY_DOMAINS_REMOVE_HISTORY,
      })
    ).toEqual({
      historyDomains: [],
      filteredDomains: [],
      sorted: 'all',
      inputSearchData: '',
    });

    const loadedHistoryDomains = localStorage.getItem('historyDomains');
    expect(loadedHistoryDomains).toBeNull();
  });

  it('should reset the filter', () => {
    expect(
      reducer(mockWithHistoryDomains, {
        type: actionTypes.HISTORY_DOMAINS_RESET_FILTER,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: mockHistoryDomainListArr,
      sorted: 'all',
      inputSearchData: '',
    });
  });

  it('should filter the history domains to only available domains', () => {
    expect(
      reducer(mockWithHistoryDomainsWithoutFilter, {
        type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_AVAILABLE,
        allDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: [
        {
          name: 'a.com',
          availability: true,
          networkError: false,
          invalid: false,
        },
      ],
      inputSearchData: '',
      sorted: 'available',
    });
  });
  it('should filter the history domains to only unavailable domains and failed checks', () => {
    expect(
      reducer(mockWithHistoryDomainsWithoutFilter, {
        type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE,
        allDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: [
        {
          name: 'test',
          availability: false,
          networkError: false,
          invalid: true,
        },
        {
          name: 'www.w3schools',
          availability: false,
          networkError: false,
          invalid: true,
        },
        {
          name: 'github.com',
          availability: false,
          networkError: false,
          invalid: false,
        },
      ],
      inputSearchData: '',
      sorted: 'unavailable',
    });
  });

  it('should filter the history domains to show all domains', () => {
    const mockWithHistoryDomainsWithFilter = {
      ...mockWithHistoryDomainsWithoutFilter,
      sorted: 'unavailable',
    };
    expect(
      reducer(mockWithHistoryDomainsWithFilter, {
        type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_ALL,
        allDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      filteredDomains: mockHistoryDomainListArr,
      inputSearchData: '',
      sorted: 'all',
    });
  });

  // TODO: add test for filter by the text: HISTORY_DOMAINS_SET_FILTERED, probably will need to move the filter to the reducer and change the sorted to string
});
