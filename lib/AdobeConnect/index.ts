import { RequestStatus, Meeting, LoginProps, Participant } from '../types'
import { BaseProvider } from '../BaseProvider'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

import { createParticipant } from './createParticipant'
// import editParticipant from './editParticipant'
// import deleteParticipant from './deleteParticipant'

import { createMeeting } from './createMeeting'
// import editMeeting from './editMeeting'
// import deleteMeeting from './deleteMeeting'

// import goMeeting from './goMeeting'
// import goMeetingTeacher from './goMeetingTeacher'

import { participantToMeeting } from './participantToMeeting'

export class AdobeConnect extends BaseProvider {
  private _username: string
  private _password: string
  private _meeting: Meeting

  private _logged = false

  constructor (url: string, username: string, password: string) {
    super()
    this.url = url
    this._username = username
    this._password = password
  }

  public async login ({
    username,
    password
  }: LoginProps): Promise<RequestStatus> {
    const loginResponse = await login({ username, password, url: this.url })
    if (loginResponse.success) {
      this.token = `${loginResponse.data}`
      this._logged = true
    }
    return loginResponse
  }

  public async createMeeting (meeting: Meeting): Promise<RequestStatus> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    const response = await createMeeting(
      {
        ...meeting,
        url: this.url
      },
      this.token
    )

    if (response.success) {
      const { data } = response
      this._meeting = {
        ...meeting,
        id: data['sco-id'],
        url: data.url
      }
    }
    return response
  }

  public async createParticipant (
    participant: Participant
  ): Promise<RequestStatus> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    return await createParticipant(participant, this.token, this.url)
  }

  public async participantToMeeting (
    scoId: number,
    principalId: number,
    permissionId: string
  ): Promise<void> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    return await participantToMeeting(
      scoId,
      principalId,
      permissionId,
      this.token,
      this.url
    )
  }

  // createParticipant,
  // editParticipant,
  // deleteParticipant,
  // createMeeting,
  // editMeeting,
  // deleteMeeting,
  // goMeeting,
  // goMeetingTeacher
}
