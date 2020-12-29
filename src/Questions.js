import React, {useState, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ANSWERS = '@question-answers-v-1';

const storeAnswers = async (value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(STORAGE_KEY_ANSWERS, jsonValue);
};

const getAnswers = async () => {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_ANSWERS);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

const Question = ({label}) => {
  const [text, setText] = useState('');
  return (
    <View>
      <Text style={{fontSize: 21, fontWeight: '600', marginBottom: 10}}>
        {label}
      </Text>
      <TextInput
        style={{height: 80, fontSize: 16}}
        multiline={true}
        placeholder="Type here your answer ..."
        onChangeText={(t) => setText(t)}
        defaultValue={text}
      />
    </View>
  );
};

const questionsDataSchema = {
  type: 'object',
  properties: {
    complain_feel_bad: {
      type: 'string',
      title:
        'Do you complain often of “feeling bad”, and if so, what is the cause?',
    },
    fault_others: {
      type: 'string',
      title:
        'Do you find fault with other people at the slightest provocation?',
    },
    find_work_mistakes: {
      type: 'string',
      title: 'Do you frequently find mistakes in your work, and if so, why?',
    },
  },
};
const questionsUiSchema = [
  'complain_feel_bad',
  'fault_others',
  'find_work_mistakes',
];

export const Questions = () => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const getData = () => {
      getAnswers()
        .then((data) => {
          setAnswers(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    getData();
  }, [setLoading, setAnswers]);

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <>
      {questionsUiSchema.map((key) => (
        <Question key={key} label={questionsDataSchema.properties[key].title} />
      ))}
    </>
  );
};
