import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { App } from '../App';

describe('<App/> when props.isLoggedIn and props.isAuthLoading are false', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App
        setUser={jest.fn(() => {})}
        isLoggedIn={false}
        isAuthLoading={false}
      />
    );
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should call this.props.setUser', () => {
    expect(wrapper.instance().props.setUser).toBeCalledTimes(1);
  });
});

describe('<App/> when props.isLoggedIn and props.isAuthLoading are not both false', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App
        setUser={jest.fn(() => {})}
        isLoggedIn={true}
        isAuthLoading={false}
      />
    );
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should NOT call this.props.setUser', () => {
    expect(wrapper.instance().props.setUser).toBeCalledTimes(0);
  });
});
