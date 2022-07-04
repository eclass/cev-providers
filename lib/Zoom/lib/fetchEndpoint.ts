import { URL } from 'url'
import { RequestTokenProps } from '../../types'
import { FetchEndpoint } from '../../'
import fetch = require('node-fetch')
import AbortController from 'abort-controller'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchEndpoint = async (
  {
    token,
    method,
    pathUrl,
    queryUrl,
    body,
    parseJson = true
  }: RequestTokenProps,
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

  if (!response) {
    throw new Error(`Network Error on fetch ${endPointUrl}`)
  }

  const responseJson = parseJson ? await response.json() : await response.text()
  if (debug) {
    // eslint-disable-next-line no-console
    console.log({ responseText: responseJson })
  }

  clearTimeout(id)
  return {
    response: responseJson,
    log: {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      url: response.url
    }
  }
}
