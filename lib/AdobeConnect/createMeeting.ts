import { Meeting, RequestStatus } from '../types'
import { fetchEndpoint } from './lib/fetchEndpoint'

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
    const checkMeeting = await fetchEndpoint(
      url,
      {
        session: token,
        action: 'sco-contents',
        'sco-id': scoId,
        'filter-type': 'meeting',
        'filter-name': name
      },
      true
    )
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
