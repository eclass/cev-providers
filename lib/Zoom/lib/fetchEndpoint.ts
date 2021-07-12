import { URL } from 'url'
import { RequestTokenProps } from '../../types'
import { FetchEndpoint } from '../../'
import fetch = require('node-fetch')
import AbortController from 'abort-controller'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchEndpoint = async (
  { token, method, pathUrl, queryUrl, body }: RequestTokenProps,
  debug = false
): Promise<FetchEndpoint> => {
  const timeout = 8000
  const baseUrl = 'https://api.zoom.us/'
  const endPointUrl = new URL(`/v2${pathUrl}`, baseUrl)
  if (queryUrl) {
    Object.keys(queryUrl).forEach(key =>
      endPointUrl.searchParams.append(key, queryUrl[`${key}`])
    )
  }
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(endPointUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    },
    body: JSON.stringify(body),
    signal: controller.signal
  })
  const responseText = await response.json()
  if (debug) {
    // eslint-disable-next-line no-console
    console.log({ responseText })
  }
  if (!response) {
    throw new Error(`Network Error on fetch ${endPointUrl}`)
  }
  clearTimeout(id)
  return {
    response: responseText,
    log: {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      url: response.url
    }
  }
}
