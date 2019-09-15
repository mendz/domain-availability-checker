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
  searchValue: 'm',
  filterType: 'all',
};

describe('history domains reducer', () => {
  it('should return the initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      historyDomains: [],
      searchValue: '',
      filterType: 'all',
    });
  });

  it('should save the domains to the local history and state', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.SAVE_HISTORY_DOMAINS,
        historyDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      searchValue: '',
      filterType: 'all',
    });

    const loadedHistoryDomains = localStorage.getItem('historyDomains');
    expect(JSON.parse(loadedHistoryDomains)).toEqual(mockHistoryDomainListArr);
  });

  it('should save the domains and concat it with the local history', () => {
    const mockOldHistory = [
      {
        name: 'test2',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ];
    localStorage.setItem('historyDomains', JSON.stringify(mockOldHistory));

    expect(
      reducer(undefined, {
        type: actionTypes.SAVE_HISTORY_DOMAINS,
        historyDomains: mockHistoryDomainListArr,
      })
    ).toEqual({
      historyDomains: [...mockHistoryDomainListArr, ...mockOldHistory],
      searchValue: '',
      filterType: 'all',
    });

    const loadedHistoryDomains = localStorage.getItem('historyDomains');
    expect(JSON.parse(loadedHistoryDomains)).toEqual([
      ...mockHistoryDomainListArr,
      ...mockOldHistory,
    ]);
  });

  it('should load domains from local history to the state', () => {
    // set the local history
    localStorage.setItem(
      'historyDomains',
      JSON.stringify(mockHistoryDomainListArr)
    );
    expect(
      reducer(undefined, {
        type: actionTypes.LOAD_HISTORY_DOMAINS,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      searchValue: '',
      filterType: 'all',
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
        type: actionTypes.REMOVE_HISTORY_DOMAINS,
      })
    ).toEqual({
      historyDomains: [],
      searchValue: '',
      filterType: 'all',
    });

    const loadedHistoryDomains = localStorage.getItem('historyDomains');
    expect(loadedHistoryDomains).toBeNull();
  });

  it('should reset the filter', () => {
    expect(
      reducer(mockWithHistoryDomains, {
        type: actionTypes.RESET_FILTER,
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      searchValue: '',
      filterType: 'all',
    });
  });

  it('should change the filter type', () => {
    expect(
      reducer(mockWithHistoryDomains, {
        type: actionTypes.SET_FILTER_TYPE,
        filterType: 'available',
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      searchValue: 'm',
      filterType: 'available',
    });
  });

  it('should change the search value', () => {
    mockWithHistoryDomains.filterType = 'unavailable';
    expect(
      reducer(mockWithHistoryDomains, {
        type: actionTypes.SET_SEARCH_VALUE,
        searchValue: '',
      })
    ).toEqual({
      historyDomains: mockHistoryDomainListArr,
      searchValue: '',
      filterType: 'unavailable',
    });
  });
});
