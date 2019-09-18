import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import AuthFooter from '../containers/Auth/AuthFooter/AuthFooter';
import {
  IS_LOGIN,
  IS_SIGN_UP,
  IS_FORGOT_PASSWORD,
} from '../containers/Auth/Auth';

describe('<AuthFooter />', () => {
  let wrapper;

  const initialProps = {
    formType: IS_LOGIN,
    changeFormType: jest.fn(() => {}),
  };

  beforeEach(() => {
    wrapper = shallow(<AuthFooter {...initialProps} />);
  });

  it('should match the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display the correct footer for form type="IS_LOGIN"', () => {
    expect(wrapper.text()).toContain(
      `Don't have an account? Sign Up.or Forgot your password?`
    );
  });

  it('should display the correct footer for form type="IS_SIGN_UP"', () => {
    wrapper.setProps({
      formType: IS_SIGN_UP,
    });
    expect(wrapper.text()).toContain(`Already have an account? Log In.`);
  });

  it('should display the correct footer for form type="IS_FORGOT_PASSWORD"', () => {
    wrapper.setProps({
      formType: IS_FORGOT_PASSWORD,
    });
    expect(wrapper.text()).toContain(`Already have an account? Log In.`);
  });

  it('should call props.changeFormType when click the span.Link', () => {
    wrapper
      .find('span.Link')
      .at(0)
      .simulate('click');
    expect(initialProps.changeFormType).toHaveBeenCalledTimes(1);
  });
});
