import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
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
  sectionCode: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

/**
 * Catch-all component, will notify when nested components
 * fail by throwing exceptions.
 * https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Something went wrong.</Text>
            <Text style={styles.sectionCode}>
              {this.state.error && this.state.error.toString()}
            </Text>
            <Text style={styles.sectionCode}>
              {this.state.errorInfo.componentStack}
            </Text>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}
