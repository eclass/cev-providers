import { Participant } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

export const createParticipant = async (
  participant: Participant,
  token: string,
  url: string
): Promise<Participant> => {
  const response = await fetchEndpoint({
    baseUrl: `${url}/api/xml`,
    method: 'get',
    token
  })

  return {
    principalId: 1,
    accountId: 1,
    name: 'principal.name',
    login: 'principal.login',
    email: 'participant.username',
    password: 'participant.password'
  }
}
