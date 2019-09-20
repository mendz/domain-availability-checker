import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { Toolbar } from '../components/Toolbar/Toolbar';

describe('<Toolbar /> when pathname is "/"', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Toolbar location={{ pathname: '/' }} isChecking={false} />
    );
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display two buttons go-to-history and ButtonInfo', () => {
    const historyButton = wrapper
      .find('Button')
      .findWhere(comp => comp.prop('name') === 'go-to-history').length;
    const infoButton = wrapper.find('ButtonInfo').length;
    expect(historyButton).toBe(1);
    expect(infoButton).toBe(1);
  });

  it('the buttons should be disabled when the user checking domains', () => {
    wrapper.setProps({ isChecking: true });
    // console.log(wrapper.debug());
    const historyIsDisabled = wrapper
      .find('Button')
      .findWhere(comp => comp.prop('name') === 'go-to-history')
      .props().disabled;
    const infoIsDisabled = wrapper.find('ButtonInfo').props().disabled;
    expect(historyIsDisabled).toBeTruthy();
    expect(infoIsDisabled).toBeTruthy();
  });
});

describe('<Toolbar /> when pathname is not "/"', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Toolbar location={{ pathname: '/history' }} isChecking={false} />
    );
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display one button to go back to home', () => {
    expect(wrapper.find('Button').html()).toContain('Back Home');
  });
});
