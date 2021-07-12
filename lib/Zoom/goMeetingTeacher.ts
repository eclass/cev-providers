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
  try {
    const { response } = await fetchEndpoint({
      token,
      method: 'get',
      pathUrl: `/meetings/${meetingId}`
    })

    return response.start_url
  } catch (err) {
    throw new Error(err)
  }
}
