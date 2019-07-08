import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

import App from '../App';

describe('<App/>', () => {
  it('renders', () => {
    shallow(<App />);
  });

  it('matches the snapshot', () => {
    const wrapper = shallow(<App />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
