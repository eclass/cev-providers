import { Meeting, RequestStatus } from '../types'
import { fetchEndpoint } from './lib/fetchEndpoint'
import { URL } from 'url'

// import he = require('fast-xml-parser')

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
  let scoId = null
  const domain = new URL(url).origin

  try {
    /**
     * Obtener `sco_id`.
     */
    const getShortcutId = await fetchEndpoint(url, {
      session: token,
      action: 'sco-shortcuts'
    })

    if (getShortcutId.results.status['@_code'] === 'ok') {
      scoId = getShortcutId.results.shortcuts.sco.find(
        short => short['@_type'] === 'user-meetings'
      )['@_sco-id']
    }

    /**
     * Validar si meeting ya existe.
     */
    const checkMeeting = await fetchEndpoint(url, {
      session: token,
      action: 'sco-contents',
      'sco-id': scoId,
      'filter-type': 'meeting',
      'filter-name': name
    })
    if (
      checkMeeting.results.status['@_code'] === 'ok' &&
      checkMeeting.results.scos.sco
    ) {
      const returnMeeting = {
        'sco-id': checkMeeting.results.scos.sco['@_sco-id'],
        url: domain + checkMeeting.results.scos.sco['url-path']
      }
      return {
        success: true,
        code: 200,
        detail: 'Meeting already created',
        name: 'Meeting found',
        data: returnMeeting
      }
    }
    /**
     * Crear meeting
     */
    const createMeeting = await fetchEndpoint(
      url,
      {
        session: token,
        action: 'sco-update',
        type: 'meeting',
        name,
        'url-path': name.toLowerCase().replace(/\s/g, '-'),
        'folder-id': scoId,
        'date-begin': dateInit,
        'date-end': dateEnd
      },
      true
    )
    if (
      createMeeting.results.status['@_code'] === 'ok' &&
      createMeeting.results.sco
    ) {
      const returnMeeting = {
        'sco-id': createMeeting.results.sco['@_sco-id'],
        url: domain + createMeeting.results.sco['url-path']
      }
      return {
        success: true,
        code: 200,
        detail: 'New meeting created',
        name: 'Meeting created',
        data: returnMeeting
      }
    } else {
      return {
        success: false,
        code: 500,
        detail: 'Bad response createMeeting',
        name: 'Bad response',
        err: createMeeting
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
