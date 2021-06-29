import { Meeting } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

// import he = require('fast-xml-parser')

/**
 * Crear meeting en Adobeconnect
 *
 * @example
 *  const createMeeting = createMeeting({url, name, dateInit, dateEnd})
 */
export const createMeeting = async ({
  url,
  name,
  dateInit,
  dateEnd,
  token
}: Meeting): Promise<Meeting> => {
  let scoId = null

  /**
   * Obtener `sco_id`.
   */
  const getShortcutId = await fetchEndpoint(`${url}/api/xml`, {
    session: token,
    action: 'sco-shortcuts'
  })
  if (getShortcutId.response.results.status['@_code'] === 'ok') {
    scoId = getShortcutId.response.results.shortcuts.sco.find(
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
    checkMeeting.response.results.status['@_code'] === 'ok' &&
    checkMeeting.response.results.scos.sco
  ) {
    return {
      name,
      dateInit,
      scoId: checkMeeting.response.results.scos.sco['@_sco-id'],
      url: url + checkMeeting.response.results.scos.sco['url-path'],
      log: checkMeeting.log
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
    createMeeting.response.results.status['@_code'] !== 'ok' ||
    !createMeeting.response.results.sco
  ) {
    throw new Error(
      'Bad response createMeeting: ' + createMeeting.response.results.statusText
    )
  }

  return {
    name,
    dateInit,
    scoId: createMeeting.response.results.sco['@_sco-id'],
    url: url + createMeeting.response.results.sco['url-path'],
    log: createMeeting.log
  }
}
