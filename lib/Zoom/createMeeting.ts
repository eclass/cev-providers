import { fetchEndpoint } from './lib/fetchEndpoint'
import { Meeting } from '..'

/**
 * Crear meeting en Zoom
 *
 * @example
 *  const createMeeting = createMeeting({url, name, dateInit, dateEnd}, token, userId)
 */
export const createMeeting = async (meeting: Meeting): Promise<Meeting> => {
  const {
    name,
    dateInit,
    duration,
    password,
    timezone,
    scheduleFor,
    settings,
    topic,
    agenda,
    userId,
    token
  } = meeting

  const baseMeeting = {
    topic,
    agenda,
    name,
    start_time: dateInit,
    duration,
    password,
    timezone,
    schedule_for: scheduleFor,
    settings
  }

  return await fetchEndpoint({
    token,
    method: 'post',
    pathUrl: `/users/${userId}/meetings`,
    body: baseMeeting
  })
}
