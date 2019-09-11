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
  filterType: 'all',
};

const mockWithHistoryDomainsWithoutFilter = {
  historyDomains: mockHistoryDomainListArr,
  filteredDomains: mockHistoryDomainListArr,
  inputSearchData: '',
  filterType: 'all',
};

describe('history domains reducer', () => {
  it('should return the initial value', () => {
    expect(reducer(undefined, {})).toEqual({
      historyDomains: [],
      filteredDomains: [],
      inputSearchData: '',
      filterType: 'all',
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
      filterType: 'all',
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
        type: actionTypes.HISTORY_DOMAINS_REMOVE_HISTORY,
      })
    ).toEqual({
      historyDomains: [],
      filteredDomains: [],
      filterType: 'all',
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
      filterType: 'all',
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
      filterType: 'available',
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
      filterType: 'unavailable',
    });
  });

  it('should filter the history domains to show all domains', () => {
    const mockWithHistoryDomainsWithFilter = {
      ...mockWithHistoryDomainsWithoutFilter,
      filterType: 'unavailable',
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
      filterType: 'all',
    });
  });

  // TODO: add test for filter by the text: HISTORY_DOMAINS_SET_FILTERED, probably will need to move the filter to the reducer and change the sorted to string

  //   it('input search will change filteredDomains to the domains that the search includes', () => {
  //     // set input search value
  //     wrapper.find('input').simulate('change', { target: { value: 's' } });
  //     expect(wrapper.state().historyDomains).toEqual(mockDomains);
  //     expect(wrapper.state().filteredDomains).toEqual([
  //       {
  //         name: 'stackoverflow.com',
  //         availability: false,
  //         networkError: false,
  //         invalid: false,
  //       },
  //       {
  //         name: 'www.w3schools.com',
  //         availability: false,
  //         networkError: false,
  //         invalid: false,
  //       },
  //     ]);
  //   });

  //   it('should filter the domains using the search input with the sorted buttons', () => {
  //     // 1. set input search value
  //     wrapper.find('input').simulate('change', { target: { value: 'me' } });
  //     // 2. filter the domains by the fail domains
  //     wrapper
  //       .find(Button)
  //       .findWhere(comp => comp.prop('name') === 'show-fail')
  //       .props()
  //       .clicked();
  //     // 3. the filterer domains should be only one
  //     expect(wrapper.state().filteredDomains).toEqual([
  //       {
  //         name: 'mendy',
  //         availability: false,
  //         networkError: false,
  //         invalid: true,
  //       },
  //     ]);
  //     // 4. changing the search input will filter from the sorted domains
  //     wrapper.find('input').simulate('change', { target: { value: 'me' } });
  //     // the filterer domains should be the same
  //     expect(wrapper.state().filteredDomains).toEqual([
  //       {
  //         name: 'mendy',
  //         availability: false,
  //         networkError: false,
  //         invalid: true,
  //       },
  //     ]);
  //     // 5. changing the sort button will filter the domains by the search value if exists
  //     wrapper
  //       .find(Button)
  //       .findWhere(comp => comp.prop('name') === 'show-success')
  //       .props()
  //       .clicked();
  //     expect(wrapper.state().filteredDomains).toEqual([
  //       {
  //         name: 'mendy22323.com',
  //         availability: true,
  //         networkError: false,
  //         invalid: false,
  //       },
  //       {
  //         name: 'mendy2323232323.co.il',
  //         availability: true,
  //         networkError: false,
  //         invalid: false,
  //       },
  //     ]);
  //   });
});
