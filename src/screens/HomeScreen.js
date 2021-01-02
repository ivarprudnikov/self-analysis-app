import React, {useEffect, useState} from 'react';
import {createAssessment, deleteAssessment, getAssessments} from '../storage';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';
import {ActionButton} from '../ui/ActionButton';

function AssessmentListItem({assessment, onOpen, onDelete}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 32,
        marginRight: 32,
        marginTop: 8,
        marginBottom: 8,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          marginBottom: 8,
        }}>
        Created {assessment.createdAt}
      </Text>
      <Text
        style={{
          marginBottom: 8,
        }}>
        Last updated {assessment.updatedAt}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <ActionButton
          title="Delete"
          onPress={() => onDelete && onDelete()}
          style={{
            marginRight: 8,
          }}
        />
        <ActionButton title="Open" onPress={() => onOpen && onOpen()} />
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
      {assessments && !!assessments.length && (
        <View style={{flex: 2}}>
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
        </View>
      )}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading && <ActivityIndicator />}
        <ActionButton
          width={240}
          title="Start new assessment"
          onPress={() => newAssessment()}
        />
      </View>
    </View>
  );
}
