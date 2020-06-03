import { Meeting, RequestStatus } from '../types'
import { fetchEndpoint } from './lib/fetchEndpoint'

// import he = require('fast-xml-parser')

/**
 * Crear meeting en Adobeconnect
 *
 * @example
 *  const createMeeting = createMeeting({url, name, dateInit, dateEnd})
 */
export const createMeeting = async (
  { url, name, dateInit, dateEnd }: Meeting,
  token: string
): Promise<RequestStatus> => {
  let scoId = null

  try {
    /**
     * Obtener `sco_id`.
     */
    const getShortcutId = await fetchEndpoint(`${url}/api/xml`, {
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
    const checkMeeting = await fetchEndpoint(`${url}/api/xml`, {
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
        url: url + checkMeeting.results.scos.sco['url-path']
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
        url: url + createMeeting.results.sco['url-path']
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
