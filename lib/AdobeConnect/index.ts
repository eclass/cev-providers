import { BaseProvider, RequestStatus, Meeting } from '../types'

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

export class AdobeConnect {
  private _url: string
  private _token: string

  private _username: string
  private _password: string

  private _logged = false

  constructor (url: string, username: string, password: string) {
    this._url = url
    this._username = username
    this._password = password
  }

  public async login (
    username: string,
    password: string
  ): Promise<RequestStatus> {
    const loginResponse = await login({ username, password, url: this._url })
    if (loginResponse.success) {
      this._token = `${loginResponse.data}`
      this._logged = true
    }
    return loginResponse
  }

  public async createMeeting (meeting: Meeting): Promise<RequestStatus> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) await this.login(this._username, this._password)

    return await createMeeting(this._token, {
      ...meeting,
      token: this._token,
      url: this._url
    })
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
