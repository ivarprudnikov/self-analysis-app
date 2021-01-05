import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  createAssessment,
  deleteAssessment,
  getAssessments,
} from '../storage/storage';
import {ActivityIndicator, FlatList, View, Text, Button} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './styles';
import {ActionButton} from '../ui/ActionButton';
import {AssessmentListItem} from './AssessmentListItem';

export function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);
  const isFocused = useIsFocused();
  const isMountedRef = useRef(false);

  const refreshAssessments = () => {
    setLoading(true);
    return getAssessments()
      .then((data) => {
        if (isMountedRef.current === true) {
          setAssessments(data || []);
        }
      })
      .finally(() => {
        if (isMountedRef.current === true) {
          setLoading(false);
        }
      });
  };

  const openAssessment = (index) => {
    navigation.navigate('Assessment', {assessmentKey: index});
  };

  const newAssessment = useCallback(() => {
    setLoading(true);
    return createAssessment()
      .then((assessment) => {
        setLoading(false);
        navigation.navigate('Assessment', {assessmentKey: assessment.key});
      })
      .catch(() => setLoading(false));
  }, [navigation]);

  const removeAssessment = (index) => {
    setLoading(true);
    return deleteAssessment(index)
      .then(refreshAssessments)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    refreshAssessments();
  }, [isFocused, setLoading, setAssessments]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => newAssessment()} title="New assessment" />
      ),
    });
  }, [navigation, newAssessment]);

  return (
    <View style={styles.body}>
      {loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
      {!loading && (!assessments || !assessments.length) && (
        <View
          style={{
            flex: 1,
            padding: 32,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View />
          <Text>Your assessments will appear here.</Text>
          <ActionButton
            onPress={() => newAssessment()}
            title="Start a new assessment"
            width={280}
          />
        </View>
      )}
      {!loading && assessments && !!assessments.length && (
        <View style={{flex: 1, padding: 8}}>
          <FlatList
            data={assessments}
            renderItem={({item}) => (
              <AssessmentListItem
                assessment={item}
                onOpen={() => openAssessment(item.key)}
                onDelete={() => removeAssessment(item.key)}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      )}
    </View>
  );
}
