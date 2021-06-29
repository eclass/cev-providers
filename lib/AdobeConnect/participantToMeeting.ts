import { fetchEndpoint } from './lib/fetchEndpoint'
import { ParticipantToMeetingProps } from '..'

export const participantToMeeting = async (
  props: ParticipantToMeetingProps
): Promise<boolean> => {
  const { scoId, principalId, permissionId, token, url } = props
  const { response } = await fetchEndpoint(`${url}/api/xml`, {
    session: token,
    action: 'permissions-update',
    'acl-id': scoId,
    'principal-id': principalId,
    'permission-id': permissionId
  })

  return response.results.status['@_code'] === 'ok'
}
