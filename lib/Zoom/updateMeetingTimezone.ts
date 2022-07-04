import { Meeting, UpdateMeetingTimezone } from '../index'
import { fetchEndpoint } from './lib/fetchEndpoint'

/**
 * Actualiza la zona horaria del meeting en zoom
 *
 * @example const meeting = updateMeetingTimezone({meetingId, timezone, token})
 */
export const updateMeetingTimezone = async (
  meeting: UpdateMeetingTimezone
): Promise<void> => {
  const { meetingId, timezone, token } = meeting

  try {
    await fetchEndpoint({
      token,
      method: 'patch',
      pathUrl: `/meeting/${meetingId}`,
      body: {
        timezone: timezone,
        start_time: new Date('2022-07-01 12:00')
      },
      parseJson: false
    })
  } catch (error) {
    throw new Error(error)
  }
}
