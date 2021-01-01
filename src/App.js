/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  Button,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Questions} from './Questions';
import {init} from './storage';
import {ErrorBoundary} from './ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const homeBg = require('./img/steinar-engeland-UtEUUNHvMLs-unsplash-medium.jpg');

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={styles.body}>
      <View
        style={{
          height: 200,
          backgroundColor: Colors.lighter,
        }}
      />
      <View style={styles.sectionContainer}>
        <Button
          title="Open your assessment"
          onPress={() => navigation.navigate('Assessment')}
        />
      </View>
    </View>
  );
}

function AssessmentScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Questions />
        </View>
      </View>
    </ScrollView>
  );
}

const App: () => React$Node = () => {
  useEffect(() => {
    init();
  }, []);
  return (
    <ErrorBoundary>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Assessment" component={AssessmentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
