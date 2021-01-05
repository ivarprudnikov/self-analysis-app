import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {D, T} from '../util/dates';
import {ActionButton} from '../ui/ActionButton';
import questionsDataSchema from '../storage/questions.schema.json';

const questionKeys = Object.keys(questionsDataSchema.properties);

export function AssessmentListItem({assessment, onOpen, onDelete}) {
  const confirmDelete = () =>
    Alert.alert(
      'Confirm',
      'Do you really want to remove it?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => onDelete && onDelete()},
      ],
      {cancelable: false},
    );

  const answers = assessment.answers || {};
  const answerKeys = Object.keys(answers);
  const progress = Math.floor((answerKeys.length / questionKeys.length) * 100);

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
        paddingHorizontal: 32,
        paddingVertical: 16,
        justifyContent: 'space-between',
        borderRadius: 8,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 8,
        }}>
        {progress}%
      </Text>
      {assessment.createdAt && (
        <Text
          style={{
            marginBottom: 8,
          }}>
          <Text>Created on </Text>
          <D milli={assessment.createdAt} />
          <Text> at </Text>
          <T milli={assessment.createdAt} />
        </Text>
      )}
      {assessment.updatedAt && (
        <Text
          style={{
            marginBottom: 8,
          }}>
          <Text>Last updated on </Text>
          <D milli={assessment.updatedAt} />
          <Text> at </Text>
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
          onPress={() => confirmDelete()}
          style={{
            marginRight: 8,
          }}
        />
        <ActionButton title="Open" onPress={() => onOpen && onOpen()} />
      </View>
    </View>
  );
}
