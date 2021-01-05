import React, {useState, useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {getAnswers, storeAnswers} from './storage/storage';

const Question = ({label, value, onChange}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (v) => {
    setText(v);
    onChange && onChange(v);
  };

  return (
    <>
      <Text style={{fontSize: 21, fontWeight: '600', marginBottom: 10}}>
        {label}
      </Text>
      <TextInput
        style={{height: 80, fontSize: 16}}
        multiline={true}
        placeholder="Type here your answer ..."
        onChangeText={handleChange}
        defaultValue={text}
      />
    </>
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

export const Questions = ({assessmentKey}) => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    let mounted = true;
    const getData = () => {
      getAnswers(assessmentKey)
        .then((data) => {
          mounted && setAnswers(data || {});
          mounted && setLoading(false);
        })
        .catch(() => {
          mounted && setLoading(false);
        });
    };
    getData();
    return () => (mounted = false);
  }, [setLoading, setAnswers, assessmentKey]);

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  const updateAnswers = (k, v) => {
    const updated = {...answers, [k]: v};
    setAnswers(updated);
    storeAnswers(assessmentKey, updated);
  };

  return (
    <>
      {questionsUiSchema.map((key) => (
        <Question
          key={key}
          label={questionsDataSchema.properties[key].title}
          value={answers[key]}
          onChange={(v) => updateAnswers(key, v)}
        />
      ))}
    </>
  );
};
