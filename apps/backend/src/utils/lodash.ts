import { isEmpty } from 'lodash';

export const isExist = (value: unknown) => {
  return !isEmpty(value) || typeof value === 'number';
};
export const removeIfNotExist: <T extends Record<string, unknown>>(
  value: T,
) => T = (value) => {
  Object.keys(value).forEach((key) =>
    !isExist(value[key]) ? delete value[key] : {},
  );
  return value;
};
