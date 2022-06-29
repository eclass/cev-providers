import { Meeting, UpdateMeetingTimezone } from '../index'
import { fetchEndpoint } from './lib/fetchEndpoint'

/**
 * Actualiza la zona horaria del meeting en zoom
 *
 * @example const meeting = updateMeetingTimezone({meetingId, timezone, token})
 */
export const updateMeetingTimezone = async (
  meeting: UpdateMeetingTimezone
): Promise<Meeting> => {
  const { meetingId, timezone, token } = meeting

  try {
    const { response, log } = await fetchEndpoint({
      token,
      method: 'patch',
      pathUrl: `/meeting/${meetingId}`,
      body: {
        timezone: timezone
      }
    })

    return {
      ...response,
      startUrl: '',
      log
    }
  } catch (error) {
    throw new Error(error)
  }
}
