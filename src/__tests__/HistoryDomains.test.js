import React from 'react';
import { shallow } from 'enzyme';

import { HistoryDomains } from '../containers/HistoryDomains/HistoryDomains';
import DomainCheck from '../components/DomainCheck/DomainCheck';
import Button from '../components/UI/Button/Button';
import ButtonCopy from '../components/UniqueButtons/ButtonCopy/ButtonCopy';
import Modal from '../components/UI/Modal/Modal';
import Confirmation from '../components/Confirmation/Confirmation';

const mockDomains = [
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
  { name: 'mendy', availability: false, networkError: false, invalid: true },
];

const mockLoadHistory = jest.fn(() => {});
const mockRemoveHistory = jest.fn(() => {});
const resetFilter = jest.fn(() => {});
const mockSetSearchValue = jest.fn(() => {});
const mockSetFilterType = jest.fn(() => {});

describe('<HistoryDomains /> with local history', () => {
  let wrapper;

  // before each test run this code
  beforeEach(() => {
    // localStorage.setItem('historyDomains', JSON.stringify(mockDomains));
    wrapper = shallow(
      <HistoryDomains
        historyDomains={mockDomains}
        loadHistory={mockLoadHistory}
        removeHistory={mockRemoveHistory}
        resetFilter={resetFilter}
        setSearchValue={mockSetSearchValue}
        setFilterType={mockSetFilterType}
        filterType="all"
        searchValue=""
      />
    );
  });

  it('should render the domains list if there are domains in the local history', () => {
    expect(wrapper.find(DomainCheck)).toHaveLength(1);
  });

  it('should state.filteredDomains to be the same as props.historyDomains at the start without filter', () => {
    expect(wrapper.state().filteredDomains).toEqual(mockDomains);
  });

  it('change in props.filterType to "available" (✔) will set the state.filteredDomains to available domains', () => {
    wrapper.setProps({ filterType: 'available' });
    expect(wrapper.state().filteredDomains).toEqual([
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
    ]);
  });

  it('change in props.filterType to "unavailable" (✖) will set the state.filteredDomains to unavailable domains and failed checks domains', () => {
    wrapper.setProps({ filterType: 'unavailable' });
    expect(wrapper.state().filteredDomains).toEqual([
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
        name: 'mendy',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ]);
  });

  it('change in props.filterType to "all" will set the state.filteredDomains to all the domains', () => {
    wrapper.setProps({ filterType: 'available' });
    expect(wrapper.state().filteredDomains).toEqual([
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
    ]);
    wrapper.setProps({ filterType: 'all' });
    expect(wrapper.state().filteredDomains).toEqual(mockDomains);
  });

  it('change in props.searchValue will set the state.filteredDomains that contains the value', () => {
    wrapper.setProps({ searchValue: 'g' });
    expect(wrapper.state().filteredDomains).toEqual([
      {
        name: 'github.com',
        availability: false,
        networkError: false,
        invalid: false,
      },
    ]);
  });

  it('should filter the domains using the props.searchValue with the props.filterType', () => {
    // 1. filter the domains by the "unavailable" domains and includes the text "me"
    wrapper.setProps({ searchValue: 'me', filterType: 'unavailable' });
    // 3. the filterer domains should be only one
    expect(wrapper.state().filteredDomains).toEqual([
      {
        name: 'mendy',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ]);
    // 4. changing the props.searchValue will filter with the previous props.filterType
    wrapper.setProps({ searchValue: 'mee' });
    // the filterer domains should be empty
    expect(wrapper.state().filteredDomains).toEqual([]);
    // 5. changing the props.filterType to "available" will filter the domains by the search value and the filter type
    wrapper.setProps({ searchValue: 'me', filterType: 'available' });
    expect(wrapper.state().filteredDomains).toEqual([
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
    ]);
    //6. changing the props.filterType to "all" will filter the domains by the props.searchValue
    wrapper.setProps({ searchValue: 'me', filterType: 'all' });
    expect(wrapper.state().filteredDomains).toEqual([
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
    ]);
  });

  it('clicked clear-history button will show modal then clickedOk will call this.props.removeHistory', () => {
    expect(wrapper.state().showModal).toBe(false);
    // button clear-history
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'clear-history')
      .at(0)
      .props()
      .onClick();
    // check the state and the Modal props changed to be true
    expect(wrapper.state().showModal).toBe(true);
    expect(
      wrapper
        .find(Modal)
        .at(0)
        .props().show
    ).toBe(true);
    // clickedOK to clear history
    wrapper
      .find(Modal)
      .find(Confirmation)
      .props()
      .clickedOK();
    expect(wrapper.instance().props.removeHistory).toBeCalled();
    // check the state and the Modal props changed to false
    expect(wrapper.state().showModal).toBe(false);
    expect(wrapper.find(Modal).props().show).toBe(false);
  });

  it('clicked clear-history button will show modal then clickedCancel will NOT call this.props.removeHistory', () => {
    // button clear-history
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'clear-history')
      .props()
      .onClick();
    // check the state and the Modal props changed to true
    expect(wrapper.state().showModal).toBe(true);
    expect(wrapper.find(Modal).props().show).toBe(true);
    // clickedCancel will NOT to clear the domains
    wrapper
      .find(Modal)
      .find(Confirmation)
      .props()
      .clickedCancel();
    expect(wrapper.instance().props.loadHistory).toHaveBeenCalledTimes(0);
    // check the state and the Modal props changed to false
    expect(wrapper.state().showModal).toBe(false);
    expect(wrapper.find(Modal).props().show).toBe(false);
  });
});

describe('<HistoryDomains /> with no local history', () => {
  let wrapper;

  // before all the tests will run this code
  beforeAll(() => {
    wrapper = shallow(
      <HistoryDomains historyDomains={[]} loadHistory={mockLoadHistory} />
    );
  });

  it('should run this.props.loadHistory if there is no history domains', () => {
    expect(wrapper.instance().props.loadHistory).toBeCalled();
  });

  it('should render a paragraph if there is no domains saved in the local history', () => {
    expect(wrapper.contains(<p>No history saved...</p>)).toBe(true);
  });

  it('buttons clear and copy need to be disable', () => {
    expect(
      wrapper
        .find(Button)
        .findWhere(comp => comp.prop('name') === 'clear-history')
        .props().disabled
    ).toBe(true);
    expect(wrapper.find(ButtonCopy).props().disabled).toBe(true);
  });
});
