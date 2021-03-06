import React from 'react';
import { shallow } from 'enzyme';

import { DomainList } from '../containers/DomainList/DomainList';
// import DomainList from '../containers/DomainList/DomainList';
import Button from '../components/UI/Button/Button';
import Textarea from '../components/UI/Textarea/Textarea';
import DomainCheck from '../components/DomainCheck/DomainCheck';

const mockValidStringOfDomains = `test\nwww.w3schools\nhttps://github.com`;
const mockInValidStringOfDomains = `test\nwww.w3schools`;
const mockResultInvalid = ['test', 'www.w3schools'];
const mockResultValid = ['github.com'];
const mockDecodeDomainListArr = [
  { name: 'test', availability: false, networkError: false, invalid: true },
  {
    name: 'www.w3schools',
    availability: false,
    networkError: false,
    invalid: true,
  },
  {
    name: 'github.com',
    availability: false,
    networkError: false,
    invalid: false,
  },
];

describe('<DomainList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DomainList decodedDomainList={[]} />);
  });

  it('should the Check button is disable at start', () => {
    const isDisabled = wrapper
      .find(Button)
      .findWhere(comp => comp.prop('type') === 'submit')
      .props().disabled;
    expect(isDisabled).toBe(true);
  });

  it('should the Check button is disable when the textarea is empty', () => {
    const isDisabled = wrapper
      .find(Button)
      .findWhere(comp => comp.prop('type') === 'submit')
      .props().disabled;
    expect(isDisabled).toBe(true);
    expect(
      wrapper
        .find(Textarea)
        .shallow()
        .text()
    ).toEqual('');
  });

  it('should when the textarea is empty the state.domainsList is also empty', () => {
    const isDisabled = wrapper
      .find(Button)
      .findWhere(comp => comp.prop('type') === 'submit')
      .props().disabled;
    expect(isDisabled).toBe(true);
    expect(wrapper.state().domainsList).toEqual([]);
  });

  it('should the Check button to be disable when checking the domains', () => {
    wrapper.setProps({
      checking: true,
    });
    const checkIsDisabled = wrapper
      .find(Button)
      .findWhere(comp => comp.prop('type') === 'submit')
      .props().disabled;
    // TODO: move to Toolbar.test.js
    // const historyIsDisabled = wrapper
    //   .find(Button)
    //   .findWhere(comp => comp.prop('name') === 'go-to-history')
    //   .props().disabled;
    expect(checkIsDisabled).toBe(true);
    // expect(historyIsDisabled).toBe(true);
  });

  it('should not alow to check when not one domain is valid', () => {
    wrapper
      .find(Textarea)
      .props()
      .change({ target: { value: mockInValidStringOfDomains } });
    expect(wrapper.state().domainsList).toEqual(mockResultInvalid);
    expect(wrapper.state().invalidDomains).toEqual(mockResultInvalid);
    expect(wrapper.state().formIsValid).toBe(false);
    expect(
      wrapper
        .find(Button)
        .findWhere(comp => comp.prop('type') === 'submit')
        .props().disabled
    ).toBe(true);
  });

  it('should alow to check when at least one domain is valid', () => {
    wrapper
      .find(Textarea)
      .props()
      .change({ target: { value: mockValidStringOfDomains } });
    expect(wrapper.state().domainsList).toEqual([
      ...mockResultInvalid,
      ...mockResultValid,
    ]);
    expect(wrapper.state().invalidDomains).toEqual(mockResultInvalid);
    expect(wrapper.state().formIsValid).toBe(true);

    // set the checking to false
    wrapper.setProps({ checking: false });
    expect(
      wrapper
        .find(Button)
        .findWhere(comp => comp.prop('type') === 'submit')
        .props().disabled
    ).toBe(false);
  });

  it('should show the DomainsCheck list when props.decodedDomainList is more then one', () => {
    wrapper.setProps({ decodedDomainList: mockDecodeDomainListArr });
    expect(wrapper.find(DomainCheck)).toHaveLength(1);
  });
});
