import { EditParticipantAttributes, FetchEndpoint } from '..'
import { fetchEndpoint } from './lib/fetchEndpoint'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default async function (
  participant: EditParticipantAttributes,
  token: string
): Promise<FetchEndpoint> {
  try {
    return await fetchEndpoint({
      token,
      pathUrl: `/users/${participant.userId}`,
      method: 'PATCH',
      body: { ...participant },
      parseJson: false
    })
  } catch (error) {
    throw new Error(error)
  }
}
