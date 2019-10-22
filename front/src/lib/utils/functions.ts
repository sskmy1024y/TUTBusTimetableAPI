/**
 * 日時のフォーマットを行う便利関数
 * @param date
 * @param format
 */
const formatDate = (date: Date, format = 'hh:mm') => {
  format = format.replace(/YYYY/g, `${date.getFullYear()}`)
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/h/g, `${date.getHours()}`)
  format = format.replace(/m/g, `${date.getMinutes()}`)
  return format
}

/**
 * APIが返す日程(datetime)がおかしいのを調整する(暫定措置)
 * @param srcDate
 * @param refDate
 */
const adjustDate = (srcDate: Date, refDate: Date = new Date()) => {
  return new Date(
    refDate.getFullYear(),
    refDate.getMonth(),
    refDate.getDate(),
    srcDate.getHours(),
    srcDate.getMinutes() + 1,
    srcDate.getSeconds()
  )
}

/**
 * 月を追加する
 * @param srcDate
 * @param num
 */
const addMonth = (srcDate: Date, num: number) => {
  const result = new Date(srcDate.getTime())
  result.setMonth(srcDate.getMonth() + num)
  return result
}

export { formatDate, adjustDate, addMonth }
