import { isEmpty } from 'lodash';

export const isExist = (value:any) => {
  return !isEmpty(value) || typeof value === 'number';
};
export const removeIfNotExist: <T extends Record<string, any>>(value: T) => T = (value) => {
  Object.keys(value).forEach((key) => (!isExist(value[key]) ? delete value[key] : {}));
  return value;
};
