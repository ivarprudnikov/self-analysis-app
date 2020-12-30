/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

it('renders correctly', () => {
  render(<App />);
  expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
  expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('@all');
});
