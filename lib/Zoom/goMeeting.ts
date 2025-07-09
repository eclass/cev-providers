import { fetchEndpoint } from '../Zoom/lib/fetchEndpoint'
import { GoMeetingProps, GoMeetingPayload } from '..'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const {url, log} = goMeeting(url, token, meetingId, email)
 */
export const goMeeting = async (
  props: GoMeetingProps
): Promise<GoMeetingPayload> => {
  const { token, meetingId, email } = props
  try {
    const { response, log } = await fetchEndpoint({
      token,
      method: 'get',
      pathUrl: `/meetings/${meetingId}/registrants`
    })
    /**
     * @todo Pagination.
     */
    const registrant = response.registrants?.find(
      record => record.email?.toLowerCase() === email.toLowerCase()
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
