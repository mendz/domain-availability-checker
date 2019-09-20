import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { AuthModal } from '../components/UniqueButtons/AuthModal';

describe('<AuthModal />', () => {
  let wrapper;

  const initialProps = {
    isLoggedIn: false,
    authModal: true,
    authLogOut: jest.fn(() => {}),
    closeAuthModal: jest.fn(() => {}),
  };

  beforeEach(() => {
    wrapper = shallow(<AuthModal {...initialProps} />);
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display the Button with the text: "Log In / Sign Up"', () => {
    const html = wrapper.find('Button').html();
    expect(html).toContain('Log In / Sign Up');
  });

  it('should display the Button with the text: "Log Out" when props.isLoggedIn is true', () => {
    wrapper.setProps({ isLoggedIn: true });
    const html = wrapper.find('Button').html();
    expect(html).toContain('Log Out');
  });

  it('the button should be disabled if props.disabled="true"', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('Button').props().disabled).toBeTruthy();
  });
});
