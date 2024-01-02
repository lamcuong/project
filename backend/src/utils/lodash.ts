import { isUndefined, isNull } from 'lodash';

export const isExist = (value:any) => {
  return !isUndefined(value) || !isNull(value);
};
export const removeIfNotExist: <T extends Record<string, any>>(value: T) => T = (value) => {
  Object.keys(value).forEach((key) => (!isExist(value[key]) ? delete value[key] : {}));
  return value;
};
