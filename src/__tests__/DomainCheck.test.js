import React from 'react';
import { mount } from 'enzyme';

import DomainCheck from '../components/DomainCheck/DomainCheck';
import DomainCheckItem from '../components/DomainCheck/DomainCheckItem/DomainCheckItem';

const mockDecodeDomainListArr = [
   { name: "test", availability: false, networkError: false, invalid: true },
   { name: "www.w3schools", availability: false, networkError: false, invalid: true },
   { name: "github.com", availability: false, networkError: false, invalid: false }
];

describe('<DomainCheck />', () => {
   let wrapper;

   beforeEach(() => {
      wrapper = mount(<DomainCheck listDomains={mockDecodeDomainListArr} />);
   });

   it('should have the exact number of items as state.listDomains length', () => {
      expect(wrapper.find(DomainCheckItem)).toHaveLength(wrapper.props().listDomains.length);
   });
});