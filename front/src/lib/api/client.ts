import { TimetablesApiData } from './type'
import { formatDate } from '../utils'

interface RawApiResponse<T> {
  success: boolean
  data: T
}

export function parseResponse<T>(apiResponse: RawApiResponse<T>, convertCamelCase: boolean = false) {
  if (!apiResponse.success) {
    throw new Error('response error')
  }
  if (!Object.prototype.hasOwnProperty.call(apiResponse, 'data')) {
    throw new Error('api response perse error')
  }

  return apiResponse.data
}

export async function fetchTimetable(date: Date) {
  const response = await fetch(
    `${process.env.REACT_APP_DEV_API_HOST}/api/v1/timetables/internal?datetime=${formatDate(date, 'YYYY/MM/DD hh:mm')}`,
    {
      mode: 'cors',
    }
  )
  if (response.ok) {
    try {
      return parseResponse<TimetablesApiData>(await response.json())
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error('ダメでした', e)
    }
  }
  throw Error('')
}
