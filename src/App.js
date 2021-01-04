/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {init} from './storage';
import {ErrorBoundary} from './ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './screens/HomeScreen';
import {AssessmentScreen} from './screens/AssessmentScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  useEffect(() => {
    init();
  }, []);
  return (
    <ErrorBoundary>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Assessment" component={AssessmentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
