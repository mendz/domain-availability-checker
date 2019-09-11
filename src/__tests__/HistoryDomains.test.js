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
const mockFilterBy = jest.fn(() => {});
const mockRemoveHistory = jest.fn(() => {});
const mockChangeFilteredBySearchValue = jest.fn(() => {});
const resetFilter = jest.fn(() => {});

describe('<HistoryDomains /> with local history', () => {
  let wrapper;

  // before each test run this code
  beforeEach(() => {
    // localStorage.setItem('historyDomains', JSON.stringify(mockDomains));
    wrapper = shallow(
      <HistoryDomains
        historyDomains={mockDomains}
        filteredDomains={mockDomains}
        loadHistory={mockLoadHistory}
        filterBy={mockFilterBy}
        removeHistory={mockRemoveHistory}
        changeFilteredBySearchValue={mockChangeFilteredBySearchValue}
        resetFilter={resetFilter}
      />
    );
  });

  it('should render the domains list if there are domains in the local history', () => {
    expect(wrapper.find(DomainCheck)).toHaveLength(1);
  });

  it('click filter by available - ✔ will call the function this.props.filterBy with the argument: "available"', () => {
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-available')
      .props()
      .clicked();
    expect(wrapper.instance().props.filterBy).toHaveBeenCalledWith('available');
  });

  it('click filter by unavailable - ✖ will call the function this.props.filterBy with the argument: "unavailable"', () => {
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-unavailable')
      .props()
      .clicked();
    expect(wrapper.instance().props.filterBy).toHaveBeenCalledWith(
      'unavailable'
    );
  });

  it('click filter by all will call the function this.props.filterBy with the argument: "all"', () => {
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-all')
      .props()
      .clicked();
    expect(wrapper.instance().props.filterBy).toHaveBeenCalledWith('all');
  });

  it('change the search input will call the function this.props.changeFilteredBySearchValue with the correct argument', () => {
    wrapper.find('input').simulate('change', { target: { value: 's' } });
    expect(
      wrapper.instance().props.changeFilteredBySearchValue
    ).toHaveBeenCalledWith('s');

    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(
      wrapper.instance().props.changeFilteredBySearchValue
    ).toHaveBeenCalledWith('');
  });

  it('click the reset button will call the function this.props.resetFilter', () => {
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'reset-filter')
      .props()
      .clicked();
    expect(wrapper.instance().props.resetFilter).toBeCalled();
  });

  it('clicked clear-history button will show modal then clickedOk will call this.props.removeHistory', () => {
    expect(wrapper.state().showModal).toBe(false);
    // button clear-history
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'clear-history')
      .at(0)
      .props()
      .clicked();
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
      .clicked();
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
      <HistoryDomains
        historyDomains={[]}
        filteredDomains={[]}
        loadHistory={mockLoadHistory}
        filterBy={mockFilterBy}
        removeHistory={mockRemoveHistory}
      />
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
