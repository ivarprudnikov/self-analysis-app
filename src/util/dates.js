import React from 'react';
import {Text} from 'react-native';

export const D = ({milli}) => (
  <Text>{new Date(milli).toLocaleDateString()}</Text>
);
export const T = ({milli}) => (
  <Text>{new Date(milli).toLocaleTimeString()}</Text>
);
