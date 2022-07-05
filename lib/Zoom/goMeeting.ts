import { fetchEndpoint } from '../Zoom/lib/fetchEndpoint'
import { GoMeetingProps, GoMeetingPayload } from '..'
import { updateMeetingTimezone } from './updateMeetingTimezone'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const {url, log} = goMeeting(url, token, meetingId, email)
 */
export const goMeeting = async (
  props: GoMeetingProps
): Promise<GoMeetingPayload> => {
  const { token, meetingId, email, timezone } = props

  try {
    const meetingWithRegistant = fetchEndpoint({
      token,
      method: 'get',
      pathUrl: `/meetings/${meetingId}/registrants`
    })
    const meeting = fetchEndpoint({
      token,
      method: 'get',
      pathUrl: `/meetings/${meetingId}`
    })

    const [{ response, log }, meetingResponse] = await Promise.all([
      meetingWithRegistant,
      meeting
    ])

    /*
     * Si es que el alumno cambio la zona horaria se actualiza la de zoom
     */
    if (meetingResponse.response?.timezone !== timezone) {
      await updateMeetingTimezone({ meetingId, timezone, token })
    }

    /**
     * @todo Pagination.
     */
    const registrant = response.registrants?.find(
      record => record.email === email
    )

    return {
      url: registrant ? registrant.join_url : '',
      log,
      registrants: response.registrants
    }
  } catch (err) {
    throw new Error(err)
  }
}
