import { BaseProvider } from '../types'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

import createParticipant from './createParticipant'
import editParticipant from './editParticipant'
import deleteParticipant from './deleteParticipant'

import { createMeeting } from './createMeeting'
import editMeeting from './editMeeting'
import deleteMeeting from './deleteMeeting'

import goMeeting from './goMeeting'
import goMeetingTeacher from './goMeetingTeacher'

export const AdobeConnect: BaseProvider = {
  login,
  createParticipant,
  editParticipant,
  deleteParticipant,
  createMeeting,
  editMeeting,
  deleteMeeting,
  goMeeting,
  goMeetingTeacher
}
