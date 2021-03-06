import { fetchEndpoint } from '../Zoom/lib/fetchEndpoint'
import { GoMeetingProps } from '..'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const goMeeting = goMeeting(url, token, meetingId, email)
 */
export const goMeeting = async (props: GoMeetingProps): Promise<string> => {
  const { token, meetingId, email } = props

  try {
    const { response } = await fetchEndpoint({
      token,
      method: 'get',
      pathUrl: `/meetings/${meetingId}/registrants`
    })

    /**
     * @todo Pagination.
     */
    const registrant = response.registrants.find(
      record => record.email === email
    )
    return registrant.join_url
  } catch (err) {
    throw new Error(err)
  }
}
