import { URL } from 'url'
import { RequestTokenProps } from '../../types'
import fetch = require('node-fetch')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchEndpoint = async (
  { token, method, pathUrl, queryUrl, body }: RequestTokenProps,
  debug = false
): Promise<any> => {
  const baseUrl = 'https://api.zoom.us/'
  const endPointUrl = new URL(`/v2${pathUrl}`, baseUrl)
  if (queryUrl) {
    Object.keys(queryUrl).forEach(key =>
      endPointUrl.searchParams.append(key, queryUrl[`${key}`])
    )
  }
  const response = await fetch(endPointUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  const responseText = await response.json()
  if (debug) {
    // eslint-disable-next-line no-console
    console.log({ responseText })
  }
  if (!response) {
    throw new Error(`Network Error on fetch ${endPointUrl}`)
  }
  return responseText
}
