import React, {useEffect, useState} from 'react';
import {createAssessment, deleteAssessment, getAssessments} from '../storage';
import {ActivityIndicator, FlatList, View, Text, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';
import {ActionButton} from '../ui/ActionButton';
import {D, T} from '../util/dates';

function AssessmentListItem({assessment, onOpen, onDelete}) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 8,
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'space-between',
      }}>
      <Modal animationType="fade" transparent={false} visible={confirmVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              width: 240,
              backgroundColor: Colors.white,
            }}>
            <Text>Are you sure?</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <ActionButton
                title="Cancel"
                onPress={() => setConfirmVisible(false)}
              />
              <ActionButton
                title="Delete"
                onPress={() => {
                  onDelete && onDelete();
                  setConfirmVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {assessment.createdAt && (
        <Text
          style={{
            marginBottom: 8,
          }}>
          <span>Created on </span>
          <D milli={assessment.createdAt} />
          <span> at </span>
          <T milli={assessment.createdAt} />
        </Text>
      )}
      {assessment.updatedAt && (
        <Text
          style={{
            marginBottom: 8,
          }}>
          <span>Last updated on </span>
          <D milli={assessment.updatedAt} />
          <span> at </span>
          <T milli={assessment.updatedAt} />
        </Text>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <ActionButton
          title="Delete"
          onPress={() => setConfirmVisible(true)}
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading && <ActivityIndicator />}
        <ActionButton
          width={240}
          title="Start new assessment"
          onPress={() => newAssessment()}
        />
      </View>
      {assessments && !!assessments.length && (
        <View style={{flex: 3}}>
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
    </View>
  );
}
