import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { Filters } from '../containers/HistoryDomains/Filters/Filters';
import Button from '../components/UI/Button/Button';

describe('<Filters />', () => {
  let wrapper;
  // because FIlters is a functional component, the except will use this instead wrapper.props()
  const initialProps = {
    searchValue: '',
    filterType: '',
    resetFilter: jest.fn(() => {}),
    setFilterType: jest.fn(() => {}),
    setSearchValue: jest.fn(() => {}),
  };

  beforeEach(() => {
    wrapper = shallow(<Filters {...initialProps} />);
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('click filter by available - ✔ will call the function this.props.setFilterType with the argument: "available"', () => {
    const event = {
      target: {
        dataset: {
          filterType: 'available',
        },
      },
    };
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-available')
      .simulate('click', event);
    expect(initialProps.setFilterType).toHaveBeenCalledWith('available');
  });

  it('click filter by unavailable - ✖ will call the function this.props.setFilterType with the argument: "unavailable"', () => {
    const event = {
      target: {
        dataset: {
          filterType: 'unavailable',
        },
      },
    };
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-unavailable')
      .simulate('click', event);
    expect(initialProps.setFilterType).toHaveBeenCalledWith('unavailable');
  });

  it('click filter by "all" will call the function this.props.setFilterType with the argument: "all"', () => {
    const event = {
      target: {
        dataset: {
          filterType: 'all',
        },
      },
    };
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'show-all')
      .simulate('click', event);
    expect(initialProps.setFilterType).toHaveBeenCalledWith('all');
  });

  it('change the search input will call the function this.props.setSearchValue with the correct argument', () => {
    wrapper.find('input').simulate('change', { target: { value: 's' } });
    expect(initialProps.setSearchValue).toHaveBeenCalledWith('s');

    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(initialProps.setSearchValue).toHaveBeenCalledWith('');
  });

  it('click the reset button will call the function this.props.resetFilter', () => {
    wrapper
      .find(Button)
      .findWhere(comp => comp.prop('name') === 'reset-filter')
      .simulate('click');
    expect(initialProps.resetFilter).toBeCalled();
  });
});
