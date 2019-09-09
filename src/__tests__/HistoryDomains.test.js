import React from 'react';
import { shallow } from 'enzyme';

import HistoryDomains from '../containers/HistoryDomains/HistoryDomains';
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

describe('<HistoryDomains /> with local history', () => {
  let wrapper;

  // before each test run this code
  beforeEach(() => {
    localStorage.setItem('historyDomains', JSON.stringify(mockDomains));
    wrapper = shallow(<HistoryDomains />);
  });

  it('should render the domains list if there are domains in the local history', () => {
    expect(wrapper.find(DomainCheck)).toHaveLength(1);
  });

  it('state.historyDomains and state.filteredDomains need to be the same at start', () => {
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
    expect(wrapper.state().filteredDomains).toEqual(mockDomains);
  });

  it('button ✔ (show-success) will change filteredDomains to be one item', () => {
    // button show only true domains
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-success')
      .props()
      .clicked();
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
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

  it('button ✖ (show-fail) will change filteredDomains to be three item', () => {
    // button show only false domains
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-fail')
      .props()
      .clicked();
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
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

  it('button show-all will will change filteredDomains back to state.historyDomains', () => {
    // set state.filteredDomains to be one item
    wrapper.setState({
      filteredDomains: [
        {
          name: 'github.com',
          availability: false,
          networkError: false,
          invalid: false,
        },
      ],
    });
    // button show all domains
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-all')
      .props()
      .clicked();
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
    expect(wrapper.state().filteredDomains).toEqual(mockDomains);
  });

  it('clicked clear-history button will show modal then clickedOk will clear historyDomains, filteredDomains and local history', () => {
    // button clear-history
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'clear-history')
      .props()
      .clicked();
    // check the state and the Modal props changed to be true
    expect(wrapper.state().showModal).toBe(true);
    expect(wrapper.find(Modal).props().show).toBe(true);
    // clickedOK to clear history
    wrapper
      .find(Modal)
      .find(Confirmation)
      .props()
      .clickedOK();
    expect(wrapper.state().historyDomains).toEqual([]);
    expect(wrapper.state().filteredDomains).toEqual([]);
    expect(localStorage.getItem('historyDomains')).toBe(null);
    // check the state and the Modal props changed to false
    expect(wrapper.state().showModal).toBe(false);
    expect(wrapper.find(Modal).props().show).toBe(false);
  });

  it('clicked clear-history button will show modal then clickedCancel will NOT clear historyDomains, filteredDomains and local history', () => {
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
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
    expect(wrapper.state().filteredDomains).toEqual(mockDomains);
    expect(JSON.parse(localStorage.getItem('historyDomains'))).toEqual(
      mockDomains
    );
    // check the state and the Modal props changed to false
    expect(wrapper.state().showModal).toBe(false);
    expect(wrapper.find(Modal).props().show).toBe(false);
  });

  it('input search will change filteredDomains to the domains that the search includes', () => {
    // set input search value
    wrapper.find('input').simulate('change', { target: { value: 's' } });
    expect(wrapper.state().historyDomains).toEqual(mockDomains);
    expect(wrapper.state().filteredDomains).toEqual([
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
    ]);
  });

  it('should filter the domains using the search input with the sorted buttons', () => {
    // 1. set input search value
    wrapper.find('input').simulate('change', { target: { value: 'me' } });
    // 2. filter the domains by the fail domains
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-fail')
      .props()
      .clicked();
    // 3. the filterer domains should be only one
    expect(wrapper.state().filteredDomains).toEqual([
      {
        name: 'mendy',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ]);
    // 4. changing the search input will filter from the sorted domains
    wrapper.find('input').simulate('change', { target: { value: 'me' } });
    // the filterer domains should be the same
    expect(wrapper.state().filteredDomains).toEqual([
      {
        name: 'mendy',
        availability: false,
        networkError: false,
        invalid: true,
      },
    ]);
    // 5. changing the sort button will filter the domains by the search value if exists
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-success')
      .props()
      .clicked();
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
});

describe('<HistoryDomains /> with no local history', () => {
  let wrapper;

  // before all the tests will run this code
  beforeAll(() => {
    localStorage.setItem('historyDomains', []);
    wrapper = shallow(<HistoryDomains />);
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
