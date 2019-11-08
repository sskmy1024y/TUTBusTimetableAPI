import { SearchType } from 'modules/Search'
import { TimetablesApiData } from './type'
import { formatDate } from 'lib/utils'

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

export async function fetchTimetable(date: Date, searchType: SearchType | null) {
  const routeParam =
    searchType === SearchType.First
      ? '/first'
      : searchType === SearchType.Last
      ? '/last'
      : searchType === SearchType.Arrival
      ? '/arrival'
      : ''

  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}/api/v1/timetables/internal${routeParam}?datetime=${formatDate(
      date,
      'YYYY/MM/DD hh:mm'
    )}`,
    {
      mode: 'cors',
    }
  )
  if (response.ok) {
    return parseResponse<TimetablesApiData>(await response.json())
  }
  throw Error('fetch error')
}
