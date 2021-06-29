import { Participant } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

const findOrCreate = async (
  participant: Participant,
  token: string,
  url: string
): Promise<Participant> => {
  const newParticipant = await fetchEndpoint({
    token,
    method: 'post',
    pathUrl: '/users',
    body: {
      action: 'custCreate',
      user_info: {
        email: participant.email,
        type: 1,
        first_name: participant.firstName,
        last_name: participant.lastName
      }
    }
  })

  if (newParticipant.response.id) {
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      type
    } = newParticipant.response
    return {
      id,
      firstName,
      lastName,
      email,
      type,
      groupId: undefined,
      log: newParticipant.log
    }
  }

  const oldParticipant = await fetchEndpoint({
    token,
    method: 'get',
    pathUrl: `/users/${participant.email}`
  })

  const {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    type,
    group_ids: [groupId]
  } = oldParticipant.response

  return {
    id,
    firstName,
    lastName,
    email,
    type,
    groupId,
    log: oldParticipant.log
  }
}

export const createParticipant = async (
  participant: Participant,
  token: string,
  url: string
): Promise<Participant> => {
  /**
   * Busca o crea el participante.
   */
  const zoomParticipant = await findOrCreate(participant, token, url)

  /**
   * Verifica la pertenencia del usuario a un grupo.
   */
  const groupId = participant.groupId
  if (groupId && zoomParticipant.groupId === undefined) {
    await fetchEndpoint({
      token,
      method: 'post',
      pathUrl: `/groups/${groupId}/members`,
      body: {
        members: [
          {
            email: participant.email
          }
        ]
      }
    })
  }

  delete zoomParticipant.groupId
  return zoomParticipant
}
