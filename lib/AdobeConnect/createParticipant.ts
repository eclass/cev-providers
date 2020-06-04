import { Participant, RequestStatus } from '../types'
import { fetchEndpoint } from './lib/fetchEndpoint'

export const createParticipant = async (
  participant: Participant,
  token: string,
  url: string
): Promise<RequestStatus> => {
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

  if (!response || !response.results) {
    /**
     * @todo Documentar error.
     */
    throw new Error('Network error')
  }

  const {
    results: { status, principal }
  } = response
  /**
   * `OK` significa que la cuenta fue creada.
   */
  if (status['@_code'] === 'ok') {
    return {
      success: true,
      code: 200,
      detail: '',
      name: '',
      data: {
        principalId: principal['@_principal-id'],
        accountId: principal['@_account-id'],
        name: principal.name,
        login: principal.login,
        email: participant.username,
        password: participant.password
      }
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

    if (!getCreatedUser || !getCreatedUser.results) {
      /**
       * @todo Documentar error.
       */
      throw new Error('Network error')
    }

    const principalUser = getCreatedUser.results['principal-list'].principal
    return {
      success: true,
      code: 200,
      detail: '',
      name: '',
      data: {
        principalId: principalUser['@_principal-id'],
        accountId: principalUser['@_account-id'],
        name: principalUser.name,
        login: principalUser.login,
        email: participant.username,
        password: participant.password
      }
    }
  }
}
