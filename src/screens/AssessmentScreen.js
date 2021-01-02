import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Questions} from '../Questions';
import {styles} from './styles';

export function AssessmentScreen({route}) {
  const {assessmentIndex} = route.params;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Assessment #{assessmentIndex}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Questions assessmentIndex={assessmentIndex} />
        </View>
      </View>
    </ScrollView>
  );
}
