import { fetchEndpoint } from './lib/fetchEndpoint'

export const participantToMeeting = async (
  scoId: number,
  principalId: number,
  permissionId: string,
  token: string,
  url: string
): Promise<boolean> => {
  const added = await fetchEndpoint({
    method: 'get',
    token
  })

  return true
}
