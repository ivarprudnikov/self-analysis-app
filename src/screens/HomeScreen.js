import React, {useEffect, useState} from 'react';
import {createAssessment, getAssessments} from '../storage';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

export function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getAssessments()
        .then((data) => {
          setAssessments(data || []);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    getData();
  }, [isFocused, setLoading, setAssessments]);

  const openAssessment = (index) => {
    navigation.navigate('Assessment', {assessmentIndex: index});
  };

  const newAssessment = () => {
    setLoading(true);
    createAssessment()
      .then((index) => {
        setLoading(false);
        navigation.navigate('Assessment', {assessmentIndex: index});
      })
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
        {assessments && !!assessments.length && (
          <FlatList
            data={assessments}
            renderItem={({index}) => (
              <Button
                title={'Assessment #' + index}
                onPress={() => openAssessment(index)}
              />
            )}
            keyExtractor={(item) => item.createdAt + ''}
          />
        )}
        <Button title="Start new assessment" onPress={() => newAssessment()} />
      </View>
    </View>
  );
}
