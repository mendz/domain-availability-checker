import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer from '../../../store/reducers/historyDomains';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/historyDomains';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

const mockDomainsSix = [
  {
    name: 'github.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
  {
    name: 'stackoverflow.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
  {
    name: 'www.w3schools.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
  {
    name: 'mendy22323.com',
    availability: true,
    networkError: false,
    invalid: false,
  },
  {
    name: 'mendy2323232323.co.il',
    availability: true,
    networkError: false,
    invalid: false,
  },
  {
    name: 'mendy',
    availability: false,
    networkError: false,
    invalid: true,
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

// FIXME: fix the tests after all the reducers changes
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

  it('should change the filtered domains by the search value', () => {
    // set the store
    const store = mockStore(mockWithHistoryDomainsWithoutFilter);

    const expectedActions = [
      {
        type: actionTypes.CHANGE_FILTER_BY_SEARCH_VALUE_SORT,
        updatedDomains: [
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
        ],
        valueToSearch: 's',
      },
    ];

    store.dispatch(actions.changeFilteredBySearchValue('s'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  // it('should filter the domains with the filter by option - unavailable, and using the search input', () => {
  //   const store = mockStore({
  //     historyDomains: mockDomainsSix,
  //     filteredDomains: [
  //       {
  //         name: 'mendy',
  //         availability: false,
  //         networkError: false,
  //         invalid: true,
  //       },
  //     ],
  //     inputSearchData: 'me',
  //     filterType: 'unavailable',
  //   });

  //   // filter the domains by the unavailable domains
  //   const expectedActions = [
  //     {
  //       type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE,
  //       allDomains: [
  //         {
  //           name: 'github.com',
  //           availability: false,
  //           networkError: false,
  //           invalid: false,
  //         },
  //         {
  //           name: 'stackoverflow.com',
  //           availability: false,
  //           networkError: false,
  //           invalid: false,
  //         },
  //         {
  //           name: 'www.w3schools.com',
  //           availability: false,
  //           networkError: false,
  //           invalid: false,
  //         },
  //         {
  //           name: 'mendy',
  //           availability: false,
  //           networkError: false,
  //           invalid: true,
  //         },
  //       ],
  //     },
  //     {
  //       type: actionTypes.CHANGE_FILTER_BY_SEARCH_VALUE_SORT,
  //       updatedDomains: [
  //         {
  //           name: 'stackoverflow.com',
  //           availability: false,
  //           networkError: false,
  //           invalid: false,
  //         },
  //         {
  //           name: 'www.w3schools.com',
  //           availability: false,
  //           networkError: false,
  //           invalid: false,
  //         },
  //       ],
  //       valueToSearch: 's',
  //     },
  //   ];
  //   store.dispatch(actions.changeFilteredBySearchValue('s'));
  //   console.log(store.getActions());
  //   expect(store.getActions()).toEqual(expectedActions);
  // });
});

// let state = {
//   historyDomains: mockDomainsSix,
//   filteredDomains: mockDomainsSix,
//   inputSearchData: '',
//   filterType: 'all',
// };

// // set the store
// let store = mockStore(state);
// // 1. set input search value
// store.dispatch(actions.changeFilteredBySearchValue('me'));
// // 2. filter the domains by the unavailable domains
// state = {
//   historyDomains: mockDomainsSix,
//   filteredDomains: [
//     {
//       name: 'mendy22323.com',
//       availability: true,
//       networkError: false,
//       invalid: false,
//     },
//     {
//       name: 'mendy2323232323.co.il',
//       availability: true,
//       networkError: false,
//       invalid: false,
//     },
//     {
//       name: 'mendy',
//       availability: false,
//       networkError: false,
//       invalid: true,
//     },
//   ],
//   inputSearchData: 'me',
//   filterType: 'all',
// };
// store = mockStore(state);
// store.dispatch(actions.filterBy('unavailable'));
// // 3. the filterer domains should be only one
// const expectedActions = [
//   {
//     type: actionTypes.CHANGE_FILTER_BY_SEARCH_VALUE_SORT,
//     updatedDomains: [
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
//       {
//         name: 'mendy',
//         availability: false,
//         networkError: false,
//         invalid: true,
//       },
//     ],
//     valueToSearch: 'me',
//   },
//   {
//     type: actionTypes.HISTORY_DOMAINS_SORT_FILTER_UNAVAILABLE,
//     allDomains: [
//       {
//         name: 'mendy',
//         availability: false,
//         networkError: false,
//         invalid: true,
//       },
//     ],
//   },
// ];

// expect(store.getActions()).toEqual(expectedActions);
// 4. changing the search input will filter from the sorted domains
// store.dispatch(actions.changeFilteredBySearchValue('me'));
// wrapper.find('input').simulate('change', { target: { value: 'me' } });
// // the filterer domains should be the same
// expect(wrapper.state().filteredDomains).toEqual([
//   {
//     name: 'mendy',
//     availability: false,
//     networkError: false,
//     invalid: true,
//   },
// ]);
// 5. changing the sort button will filter the domains by the search value if exists
// wrapper
//   .find(Button)
//   .findWhere(comp => comp.prop('name') === 'show-success')
//   .props()
//   .clicked();
// expect(wrapper.state().filteredDomains).toEqual([
//   {
//     name: 'mendy22323.com',
//     availability: true,
//     networkError: false,
//     invalid: false,
//   },
//   {
//     name: 'mendy2323232323.co.il',
//     availability: true,
//     networkError: false,
//     invalid: false,
//   },
// ]);
