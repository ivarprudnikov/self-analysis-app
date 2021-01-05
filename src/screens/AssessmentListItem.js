import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {D, T} from '../util/dates';
import {ActionButton} from '../ui/ActionButton';

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
