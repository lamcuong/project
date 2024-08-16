import moment from 'moment'
export const handleFormatNumber = (number?: string | number) => {
  return Number(number).toLocaleString().replace(/,/g, '.')
}
export const formatVietnameseDate = (date: string | Date) => {
  const weekday = moment(date).weekday()
  let vietnameseWeekday = ''
  switch (weekday) {
    case 1:
      vietnameseWeekday = 'Thứ 2'
      break
    case 2:
      vietnameseWeekday = 'Thứ 3'
      break
    case 3:
      vietnameseWeekday = 'Thứ 4'
      break
    case 4:
      vietnameseWeekday = 'Thứ 5'
      break
    case 5:
      vietnameseWeekday = 'Thứ 6'
      break
    case 6:
      vietnameseWeekday = 'Thứ 7'
      break

    default:
      vietnameseWeekday = 'Chủ nhật'
      break
  }
  return moment(date).format(`[${vietnameseWeekday}] - DD/MM/YYYY`)
}
