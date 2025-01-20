import moment, { Moment } from 'moment';
export const FORMAT_VIETNAMESE_DATE = '[Ngày] DD/MM/YYYY';
export const formatMMYYYY = (date: string | Moment) => {
  return moment(date).format('MM-YYYY');
};
