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
  return format
}

/**
 * APIが返す日程(datetime)がおかしいのを調整する(暫定措置)
 * @param srcData
 * @param refData
 */
const adjustDate = (srcData: Date, refData: Date = new Date()) => {
  return new Date(
    refData.getFullYear(),
    refData.getMonth(),
    refData.getDate(),
    srcData.getHours(),
    srcData.getMinutes() + 1,
    srcData.getSeconds()
  )
}

export { formatDate, adjustDate }
