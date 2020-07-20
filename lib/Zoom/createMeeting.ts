import { Meeting } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

/**
 * Crear meeting en Zoom
 *
 * @example
 *  const createMeeting = createMeeting({url, name, dateInit, dateEnd}, token, userId)
 */
export const createMeeting = async (
  { url, name, dateInit }: Meeting,
  token: string,
  userId: string
): Promise<Meeting> => {
  const optionsMeeting = {
    topic: name,
    type: '2',
    start_time: dateInit,
    timezone: 'America/Santiago',
    password: 'eClass.20',
    agenda: name,
    duration: 40,
    schedule_for: 'test@test.cl',
    settings: {
      approval_type: 0,
      alternative_hosts: 'test@test.cl',
      waiting_room: 1
    }
  }
  // console.log(getUserInfo.id)
  const createMeeting = await fetchEndpoint(
    {
      baseUrl: `${url}`,
      token,
      method: 'post',
      pathUrl: `/v2/users/${userId}/meetings`,
      body: optionsMeeting
    },
    true
  )
  // console.log(createMeeting)

  return {
    name,
    dateInit,
    scoId: 123,
    url
  }
}
