import { Meeting } from '../'
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
): Promise<Meeting> => {
  let scoId = null

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
    return {
      name,
      dateInit,
      scoId: checkMeeting.results.scos.sco['@_sco-id'],
      url: url + checkMeeting.results.scos.sco['url-path']
    }
  }

  /**
   * Crear meeting
   */
  const createMeeting = await fetchEndpoint(`${url}/api/xml`, {
    session: token,
    action: 'sco-update',
    type: 'meeting',
    name,
    'url-path': name.toLowerCase().replace(/\s/g, '-'),
    'folder-id': scoId,
    'date-begin': dateInit,
    'date-end': dateEnd
  })

  if (
    createMeeting.results.status['@_code'] !== 'ok' ||
    !createMeeting.results.sco
  ) {
    throw new Error(
      'Bad response createMeeting: ' + createMeeting.results.statusText
    )
  }

  return {
    name,
    dateInit,
    scoId: createMeeting.results.sco['@_sco-id'],
    url: url + createMeeting.results.sco['url-path']
  }
}
