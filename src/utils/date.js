const paddingZero = (src) => {
  if (src < 10) {
    return '0' + src.toString()
  } else {
    return src.toString()
  }
}

export const getDateTime = (date, time) => {
  return new Date(date.getFullYear() + '-'
    + paddingZero(date.getMonth()) + '-'
    + paddingZero(date.getDay()) + ' '
    + paddingZero(time.getHours()) + ':'
    + paddingZero(time.getMinutes()))
}

export const formatDateTime = (srcDate, srcTime) => {
  const date = getDateTime(srcDate, srcTime)
  return date.getFullYear() + '-' + paddingZero(date.getMonth()) + '-' + paddingZero(date.getDate())
    + ' ' + paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes())
}

export const formatDate = (date) => {
  return date.getFullYear() + '-' + paddingZero(date.getMonth()) + '-' + paddingZero(date.getDate())
    + ' ' + paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes())
}

export const compareDate = (date1, date2) => {
  const d1 = date1.getDate()
  const m1 = date1.getMonth()
  const y1 = date1.getFullYear()
  const d2 = date2.getDate()
  const m2 = date2.getMonth()
  const y2 = date2.getFullYear()

  return y1 !== y2 ? y1 - y2 : m1 !== m2 ? m1 - m2 : d1 - d2
}

export const getCurrentWeek = () => {
  const start = new Date()
  const end = new Date()
  start.setDate(start.getDate() - (start.getDay() - 1))
  end.setDate(end.getDate() + (6 - end.getDay() + 1))

  return [start, end]
}

export const weekdayValue = {
  0: 'mon',
  1: 'tue',
  2: 'wed',
  3: 'thu',
  4: 'fri',
  5: 'sat',
  6: 'sun'
}

export const weekdayName = {
  0: 'Thứ Hai',
  1: 'Thứ Ba',
  2: 'Thứ Tư',
  3: 'Thứ Năm',
  4: 'Thứ Sáu',
  5: 'Thứ Bảy',
  6: 'Chủ nhật'
}
