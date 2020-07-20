import { MeetingZoom } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

/**
 * Crear meeting en Zoom
 *
 * @example
 *  const createMeeting = createMeeting({url, name, dateInit, dateEnd}, token, userId)
 */
export const createMeeting = async (
  propsZoom: MeetingZoom,
  token: string,
  userId: string
): Promise<MeetingZoom> => {
  const baseMeeting = {
    topic: propsZoom.name,
    start_time: propsZoom.dateInit,
    agenda: propsZoom.name
  }
  const optionsMeeting = { ...baseMeeting, ...propsZoom }
  return await fetchEndpoint({
    baseUrl: `${propsZoom.url}`,
    token,
    method: 'post',
    pathUrl: `/v2/users/${userId}/meetings`,
    body: optionsMeeting
  })
}
