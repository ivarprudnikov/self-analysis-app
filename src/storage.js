import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ANSWERS = '@question-answers-v-1';

export const storeAnswers = async (value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(STORAGE_KEY_ANSWERS, jsonValue);
};

export const getAnswers = async () => {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_ANSWERS);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};
