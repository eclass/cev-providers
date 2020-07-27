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

  const searchRegistrants = await fetchEndpoint({
    token,
    method: 'get',
    pathUrl: `/meetings/${meetingId}/registrants`
  })

  /**
   * @todo Pagination.
   */
  const registrant = searchRegistrants.registrants.filter(
    record => record.email === email
  )
  return registrant.join_url
}
