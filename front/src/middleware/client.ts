interface RawApiResponse<T> {
  success: boolean
  data: T
}

export function parseResponse<T>(apiResponse: RawApiResponse<T>) {
  if (!apiResponse.success) {
    throw new Error('response error')
  }
  if (!Object.prototype.hasOwnProperty.call(apiResponse, 'data')) {
    throw new Error('api response perse error')
  }
  return apiResponse.data
}
