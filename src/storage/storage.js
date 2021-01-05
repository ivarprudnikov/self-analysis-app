import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkDbErrors} from './validation';

const STORAGE_KEY = '@all';

const getDb = async () => {
  const jsonString = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonString != null ? JSON.parse(jsonString) : null;
};
const updateDb = async (val) =>
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(val));

export const init = async () => {
  const json = await getDb();
  if (json == null) {
    await updateDb({
      createdAt: new Date().getTime(),
      assessments: {},
    });
  } else {
    if (!json.createdAt) {
      json.createdAt = new Date().getTime();
    }
    if (!json.assessments) {
      json.assessments = {};
    }
    await updateDb(json);
  }
  const initialized = await getDb();
  const errors = checkDbErrors(initialized);
  if (errors && errors.length) {
    throw errors;
  }
};

export const getAssessments = async () => {
  const json = await getDb();
  const assessments = json.assessments || {};
  return Object.keys(assessments)
    .map((k) => assessments[k])
    .sort((a, b) =>
      a.updatedAt === b.updatedAt
        ? a.createdAt > b.createdAt
        : a.updatedAt > b.updatedAt,
    );
};

const getAssessment = async (id) => {
  const assessments = await getAssessments();
  const assessment = assessments[id];
  return assessment && typeof assessment === 'object' ? assessment : null;
};

export const createAssessment = async () => {
  const json = await getDb();
  const createdAt = new Date().getTime();
  const key = createdAt + '';
  json.assessments[key] = {
    key: key,
    createdAt: createdAt,
    answers: {},
  };
  await updateDb(json);
  return json.assessments[key];
};

const updateAssessment = async (id, assessment) => {
  const json = await getDb();
  if (assessment) {
    assessment.updatedAt = new Date().getTime();
  }
  json.assessments[id] = assessment;
  await updateDb(json);
};

export const deleteAssessment = async (id) => {
  const json = await getDb();
  delete json.assessments[id];
  await updateDb(json);
};

export const getAnswers = async (id) => {
  const assessment = await getAssessment(id);
  return assessment != null ? assessment.answers : {};
};

export const storeAnswers = async (id, value) => {
  const assessment = await getAssessment(id);
  if (assessment != null) {
    assessment.answers = value;
    await updateAssessment(id, assessment);
  }
};
