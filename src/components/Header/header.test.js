import React from 'react';
import { shallow } from 'enzyme';

import Header from './header';

// smoke test
test('it should render', () => {
  shallow(<Header />);
});