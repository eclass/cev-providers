import { URL } from 'url'
import util = require('util')

import parser = require('fast-xml-parser')
import fetch = require('node-fetch')

type ResultsEndpoint = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchEndpoint = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any,
  debug = false
): Promise<ResultsEndpoint> => {
  const endPointUrl = new URL(url)
  Object.keys(params).forEach(key =>
    endPointUrl.searchParams.append(key, params[`${key}`])
  )
  const response = await fetch(endPointUrl)
  if (!response || !response.ok) {
    throw new Error(`Network Error on fetch ${url}`)
  }
  const responseText = await response.text()
  if (debug) {
    // eslint-disable-next-line no-console
    console.log({ responseText })
  }
  const options = {
    attributeNamePrefix: '@_',
    ignoreAttributes: false,
    ignoreNameSpace: false
  }
  const parsed = parser.parse(responseText, options)
  if (debug) {
    // eslint-disable-next-line no-console
    console.log(util.inspect(parsed, false, null, true /* enable colors */))
  }

  if (!parsed.results) {
    throw new Error(`Fetch error on ${url} when tried action ${params?.action}`)
  }
  return parsed
}
