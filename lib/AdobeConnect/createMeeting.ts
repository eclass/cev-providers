import { Meeting, RequestStatus } from '../types'

import { URL } from 'url'
import parser = require('fast-xml-parser')
import fetch = require('node-fetch')
import he = require('fast-xml-parser')

/**
 * Login a Adobeconnect
 *
 * @example
 *  const login = login(username, password)
 */
export const createMeeting = async (
  token: string,
  { url, name, dateInit, dateEnd }: Meeting
): Promise<RequestStatus> => {
  try {
    // Validar si meeting ya existe
    // Obtener sco_id
    const endPointUrl = new URL(url)
    const params = {
      action: 'sco-shortcuts',
      session: token
    }
    Object.keys(params).forEach(key =>
      endPointUrl.searchParams.append(key, params[`${key}`])
    )
    const response = await fetch(endPointUrl)
    if (response.ok) {
      const responseText = await response.text()
      const options = {
        attributeNamePrefix: '@_',
        ignoreAttributes: false,
        ignoreNameSpace: false
      }

      const xmlData = parser.parse(responseText, options)
      if (xmlData.results.status['@_code'] === 'ok') {
        let final = ''
        xmlData.results.shortcuts.sco.forEach(short => {
          if (short['@_type'] === 'user-meetings') {
            final = short['@_sco-id']
          }
        })
      }
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      detail: 'Fetch error returned',
      name: 'Network Error',
      err
    }
  }
}
