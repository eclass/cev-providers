import { RequestStatus, Meeting, LoginProps } from '../types'
import { BaseProvider } from '../BaseProvider'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

// import createParticipant from './createParticipant'
// import editParticipant from './editParticipant'
// import deleteParticipant from './deleteParticipant'

import { createMeeting } from './createMeeting'
import { goMeeting } from './goMeeting'
// import editMeeting from './editMeeting'
// import deleteMeeting from './deleteMeeting'

// import goMeeting from './goMeeting'
// import goMeetingTeacher from './goMeetingTeacher'

export class AdobeConnect extends BaseProvider {
  private _username: string
  private _password: string

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

    return await createMeeting(
      {
        ...meeting,
        url: this.url
      },
      this.token
    )
  }

  public async goMeeting (
    scoUrl: string,
    { username, password }: LoginProps
  ): Promise<RequestStatus> {
    /**
     * Loguea a la aplicación de Adobe Connect con el usuario ingresado.
     */
    const loginUser = await login({ username, password, url: this.url })
    return goMeeting(scoUrl, loginUser.data)
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
