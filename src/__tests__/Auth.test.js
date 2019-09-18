import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Auth, {
  IS_LOGIN,
  IS_SIGN_UP,
  IS_FORGOT_PASSWORD,
} from '../containers/Auth/Auth';

describe('<Input />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Auth />);
  });

  it('should match the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should at first show the login form', () => {
    expect(wrapper.containsMatchingElement('<h1>Login<h1/>'));
    expect(wrapper.find('Input').length).toEqual(2);
    expect(
      wrapper
        .find('Input')
        .at(0)
        .props().label
    ).toEqual('Email');
    expect(
      wrapper
        .find('Input')
        .at(1)
        .props().label
    ).toEqual('Password');
    expect(wrapper.find('Button').length).toEqual(1);
    expect(wrapper.find('GoogleSignIn').length).toEqual(1);
    expect(wrapper.find('Button').contains('Login')).toBe(true);
    expect(wrapper.find('Footer').props().formType).toBe(IS_LOGIN);
  });

  it('should at state.formType="IS_SIGN_UP" will show teh sign up form ', () => {
    wrapper.setState({ formType: IS_SIGN_UP });
    expect(wrapper.containsMatchingElement('<h1>Sign Up<h1/>'));
    expect(wrapper.find('Input').length).toEqual(3);
    expect(
      wrapper
        .find('Input')
        .at(0)
        .props().label
    ).toEqual('Email');
    expect(
      wrapper
        .find('Input')
        .at(1)
        .props().label
    ).toEqual('Password');
    expect(
      wrapper
        .find('Input')
        .at(2)
        .props().label
    ).toEqual('Second Password');
    expect(wrapper.find('Button').contains('Sign Up')).toBe(true);
    expect(wrapper.find('Footer').props().formType).toBe(IS_SIGN_UP);
  });

  it('should at state.formType="IS_FORGOT_PASSWORD" will show teh reset password form ', () => {
    wrapper.setState({ formType: IS_FORGOT_PASSWORD });
    expect(wrapper.containsMatchingElement('<h1>Reset Password<h1/>'));
    expect(wrapper.find('Input').length).toEqual(1);
    expect(
      wrapper
        .find('Input')
        .at(0)
        .props().label
    ).toEqual('Email');
    expect(wrapper.find('Button').contains('Send Recovery Email')).toBe(true);
    expect(wrapper.find('Footer').props().formType).toBe(IS_FORGOT_PASSWORD);
  });

  it('should validation correctly', () => {
    expect(wrapper.find('Button').props().disabled).toBeTruthy();
    // change the input Email to invalid email
    wrapper
      .findWhere(
        comp => comp.text() === '<Input />' && comp.props().label === 'Email'
      )
      .props()
      .changed({ target: { value: 'mend' } });
    // change the input Password to invalid Password
    expect(wrapper.find('Button').props().disabled).toBeTruthy(); // still need to be disable
    wrapper
      .findWhere(
        comp => comp.text() === '<Input />' && comp.props().label === 'Password'
      )
      .props()
      .changed({ target: { value: '1234' } });
    expect(wrapper.find('Button').props().disabled).toBeTruthy(); // still need to be disable
    // set the Email input the valid content
    wrapper
      .findWhere(
        comp => comp.text() === '<Input />' && comp.props().label === 'Email'
      )
      .props()
      .changed({ target: { value: 'mendy@gmail.com' } });
    expect(wrapper.find('Button').props().disabled).toBeTruthy(); // still need to be disable
    // set the Password input the valid content
    wrapper
      .findWhere(
        comp => comp.text() === '<Input />' && comp.props().label === 'Password'
      )
      .props()
      .changed({ target: { value: '123456' } });
    // the form should be valid now
    expect(wrapper.find('Button').props().disabled).toBeFalsy(); // now the form is valid and the button should be enable
    expect(wrapper.state().formIsValid).toBe(true);
  });
});