import { fetchEndpoint } from './lib/fetchEndpoint'

export const participantToMeeting = async (
  scoId: number,
  principalId: number,
  permissionId: string,
  token: string,
  url: string
): Promise<boolean> => {
  const added = await fetchEndpoint(`${url}/api/xml`, {
    session: token,
    action: 'permissions-update',
    'acl-id': scoId,
    'principal-id': principalId,
    'permission-id': permissionId
  })

  return added.results.status['@_code'] === 'ok'
}
