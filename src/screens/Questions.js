import React, {useState, useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {getAnswers, storeAnswers} from '../storage/storage';
const questionsDataSchema = require('../storage/questions.schema.json');

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
      {Object.keys(questionsDataSchema.properties).map((key) => (
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
