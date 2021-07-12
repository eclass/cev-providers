import { Participant } from '../'
import { fetchEndpoint } from './lib/fetchEndpoint'

const findOrCreate = async (
  participant: Participant,
  token: string,
  url: string
): Promise<Participant> => {
  try {
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
  } catch (err) {
    throw new Error(err)
  }

  try {
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
  } catch (err) {
    throw new Error(err)
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
    try {
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
    } catch (err) {
      throw new Error(err)
    }
  }

  delete zoomParticipant.groupId
  return zoomParticipant
}
