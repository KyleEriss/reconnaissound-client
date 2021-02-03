import React from 'react';
import { shallow } from 'enzyme';

import Playlist from './playlist';

// smoke test
test('it should render', () => {
  shallow(<Playlist />);
});