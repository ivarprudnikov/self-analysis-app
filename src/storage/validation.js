import Ajv from 'ajv';
import schema from './schema.json';

const ajv = new Ajv({allErrors: true});
const schemaValidator = ajv.compile(schema);

export function checkDbErrors(json) {
  const isValid = schemaValidator(json);
  if (!isValid) {
    return schemaValidator.errors;
  }
  return null;
}
