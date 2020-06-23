import { Participant } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

export const createParticipant = async (
  participant: Participant,
  token: string,
  url: string
): Promise<Participant> => {
  const response = await fetchEndpoint(`${url}/api/xml`, {
    session: token,
    action: 'principal-update',
    'first-name': participant.firstName,
    'last-name': participant.lastName,
    email: participant.username,
    login: participant.username,
    password: participant.password,
    type: 'external-user',
    'send-email': 'false',
    'has-children': 0
  })

  const {
    results: { status, principal }
  } = response
  /**
   * `OK` significa que la cuenta fue creada.
   */
  if (status['@_code'] === 'ok') {
    return {
      principalId: principal['@_principal-id'],
      accountId: principal['@_account-id'],
      name: principal.name,
      login: principal.login,
      email: participant.username,
      password: participant.password
    }
  } else {
    /**
     * `invalid` significa que la cuenta ya existe.
     */
    const getCreatedUser = await fetchEndpoint(`${url}/api/xml`, {
      session: token,
      action: 'principal-list',
      'filter-like-login': participant.username
    })

    const principalUser = getCreatedUser.results['principal-list'].principal
    return {
      principalId: principalUser['@_principal-id'],
      accountId: principalUser['@_account-id'],
      name: principalUser.name,
      login: principalUser.login,
      email: participant.username,
      password: participant.password
    }
  }
}
