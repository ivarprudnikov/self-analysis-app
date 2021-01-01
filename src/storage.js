import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@all';
const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    createdAt: {
      type: 'integer',
      minimum: 0,
    },
    assessments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          createdAt: {
            type: 'integer',
            minimum: 0,
          },
          updatedAt: {
            type: 'integer',
            minimum: 0,
          },
          answers: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  required: ['assessments'],
};

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
      assessments: [],
    });
  } else {
    if (!json.createdAt) {
      json.createdAt = new Date().getTime();
    }
    if (!json.assessments) {
      json.assessments = [];
    }
    await updateDb(json);
  }
};

export const getAssessments = async () => {
  const json = await getDb();
  return json.assessments || [];
};

const getAssessment = async (idx) => {
  const assessments = await getAssessments();
  const assessment = assessments[idx];
  return assessment && typeof assessment === 'object' ? assessment : null;
};

const updateAssessment = async (idx, assessment) => {
  const json = await getDb();
  if (assessment) {
    assessment.updatedAt = new Date().getTime();
  }
  json.assessments[idx] = assessment;
  await updateDb(json);
};

export const getAnswers = async (idx) => {
  const assessment = await getAssessment(idx);
  return assessment != null ? assessment.answers : {};
};

export const storeAnswers = async (idx, value) => {
  const assessment = await getAssessment(idx);
  if (assessment == null) {
    await updateAssessment(idx, {
      createdAt: new Date().getTime(),
      answers: value,
    });
  } else {
    assessment.answers = value;
    await updateAssessment(idx, assessment);
  }
};
