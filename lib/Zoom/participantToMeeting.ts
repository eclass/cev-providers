import { fetchEndpoint } from './lib/fetchEndpoint'
import { ParticipantToMeetingProps } from '..'

export const participantToMeeting = async (
  props: ParticipantToMeetingProps
): Promise<boolean> => {
  const { meeting, participant, token } = props

  try {
    const { response } = await fetchEndpoint({
      token,
      method: 'post',
      pathUrl: `/meetings/${meeting.id}/registrants`,
      body: {
        email: participant.email,
        first_name: participant.firstName || '.'
      }
    })

    return !!response && !!response.id
  } catch (err) {
    throw new Error(err)
  }
}
