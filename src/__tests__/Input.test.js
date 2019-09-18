import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Input from '../components/UI/Input/Input';
import { ReactComponent as OpenEye } from '../assets/icons/_ionicons_svg_md-eye.svg';
import { ReactComponent as CloseEye } from '../assets/icons/_ionicons_svg_md-eye-off.svg';

describe('<Input />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Input
        label="label"
        elementConfig={{
          type: 'text',
          placeholder: 'placeholder',
        }}
        changed={() => {}}
        invalid={false}
        touched={false}
        value=""
        errorMessage={null}
      />
    );
  });

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should display en error message if the invalid and touched values are true and the input is blur', () => {
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    wrapper.setProps({
      invalid: true,
      touched: true,
      errorMessage: 'some error message',
    });

    expect(wrapper.contains('some error message')).toBe(true);

    wrapper.setProps({
      invalid: false,
      touched: false,
      errorMessage: 'some error message',
    });

    expect(wrapper.contains('some error message')).toBe(false);

    wrapper.setProps({
      label: 'Email',
      invalid: true,
      touched: true,
      errorMessage: null,
    });

    expect(wrapper.contains('Please enter valid Email')).toBe(true);
  });

  it('should not display the error message until the input is blur', () => {
    wrapper.find('input').simulate('focus');
    wrapper.setProps({
      invalid: true,
      touched: true,
      errorMessage: 'some error message',
    });

    expect(wrapper.contains('some error message')).toBe(false);

    wrapper.setProps({
      label: 'Email',
      invalid: true,
      touched: true,
      errorMessage: null,
    });

    expect(wrapper.contains('Please enter valid Email')).toBe(false);

    wrapper.find('input').simulate('blur');

    expect(wrapper.contains('Please enter valid Email')).toBe(true);
  });

  it('should have show password button when the type is "password"', () => {
    expect(wrapper.exists('button.ShowPasswordButton')).toBe(false);
    wrapper.setProps({ elementConfig: { type: 'password' } });
    expect(wrapper.exists('button.ShowPasswordButton')).toBe(true);
  });

  it('should change the input password type to "text" and back to "password"', () => {
    wrapper.setProps({ elementConfig: { type: 'password' } });
    const showPasswordButton = wrapper.find('button.ShowPasswordButton');

    expect(wrapper.find('input').props().type).toBe('password');
    showPasswordButton.simulate('click');
    expect(wrapper.find('input').props().type).toBe('text');
  });

  it('The ShowPasswordButton button should have the correct svg eye depends the input type', () => {
    wrapper.setProps({ elementConfig: { type: 'password' } });
    const showPasswordButton = wrapper.find('button.ShowPasswordButton');

    expect(wrapper.containsMatchingElement(<OpenEye />)).toBe(true);
    showPasswordButton.simulate('click');
    expect(wrapper.containsMatchingElement(<CloseEye />)).toBe(true);
  });
});
