import React, {useEffect, useState} from 'react';
import {createAssessment, deleteAssessment, getAssessments} from '../storage';
import {ActivityIndicator, Button, FlatList, View, Text} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

function AssessmentListItem({assessment, onOpen, onDelete}) {
  return (
    <View>
      <Text>Created {assessment.createdAt}</Text>
      <Text>Last updated {assessment.updatedAt}</Text>
      <View>
        <Button title="Open" onPress={() => onOpen && onOpen()} />
        <Button title="Delete" onPress={() => onDelete && onDelete()} />
      </View>
    </View>
  );
}

export function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    refreshAssessments();
  }, [isFocused, setLoading, setAssessments]);

  const refreshAssessments = () => {
    setLoading(true);
    return getAssessments()
      .then((data) => {
        setAssessments(data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const openAssessment = (index) => {
    navigation.navigate('Assessment', {assessmentIndex: index});
  };

  const newAssessment = () => {
    setLoading(true);
    return createAssessment()
      .then((index) => {
        setLoading(false);
        navigation.navigate('Assessment', {assessmentIndex: index});
      })
      .catch(() => setLoading(false));
  };

  const removeAssessment = (index) => {
    setLoading(true);
    return deleteAssessment(index)
      .then(refreshAssessments)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <View style={styles.body}>
      <View
        style={{
          height: 200,
          backgroundColor: Colors.lighter,
        }}
      />
      <View style={styles.sectionContainer}>
        {loading && <ActivityIndicator />}
        <Button title="Start new assessment" onPress={() => newAssessment()} />
        {assessments && !!assessments.length && (
          <FlatList
            data={assessments}
            renderItem={({item, index}) => (
              <AssessmentListItem
                assessment={item}
                onOpen={() => openAssessment(index)}
                onDelete={() => removeAssessment(index)}
              />
            )}
            keyExtractor={(item) => item.createdAt + ''}
          />
        )}
      </View>
    </View>
  );
}
