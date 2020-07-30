import { fetchEndpoint } from '../Zoom/lib/fetchEndpoint'
import { GoMeetingProps } from '..'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  goMeetingTeacher(token, meetingId)
 */
export const goMeetingTeacher = async (
  props: GoMeetingProps
): Promise<string> => {
  const { token, meetingId } = props
  const meeting = await fetchEndpoint({
    token,
    method: 'get',
    pathUrl: `/meetings/${meetingId}`
  })

  return meeting.start_url
}
