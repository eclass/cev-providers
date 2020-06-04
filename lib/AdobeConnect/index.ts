import { Meeting, LoginProps, Participant } from '../types'
import { BaseProvider } from '../BaseProvider'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

import { createParticipant } from './createParticipant'

import { createMeeting } from './createMeeting'
import { goMeeting } from './goMeeting'

import { participantToMeeting } from './participantToMeeting'

export class AdobeConnect extends BaseProvider {
  private _username: string
  private _password: string
  private _meeting: Meeting
  private _participants: Array<Participant> = []

  private _logged = false

  constructor (url: string, username: string, password: string) {
    super()
    this.url = url
    this._username = username
    this._password = password
  }

  public async login ({ username, password }: LoginProps): Promise<string> {
    const token = await login({ username, password, url: this.url })
    if (token) {
      this.token = token
      this._logged = true
    }
    return token
  }

  public async createMeeting (meeting: Meeting): Promise<Meeting> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    const Meeting = await createMeeting(
      {
        ...meeting,
        url: this.url
      },
      this.token
    )

    if (!Meeting) {
      throw new Error('Empty meeting')
    }

    this._meeting = Meeting
    return Meeting
  }

  public async createParticipant (
    participant: Participant
  ): Promise<Participant> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    const Participant = await createParticipant(
      participant,
      this.token,
      this.url
    )

    if (!Participant) {
      throw new Error('Empty participant')
    }

    this._participants.push(Participant)
    return Participant
  }

  public async participantToMeeting (
    permissionId: string,
    principalId: number,
    scoId = 0
  ): Promise<boolean> {
    /**
     * Si no está logueado, loguea a la aplicación de Adobe Connect.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    /**
     * Si no viene el scoId, mantenemos el mismo del `createMeeting`.
     */
    if (!scoId) {
      scoId = this._meeting.scoId
    }

    return await participantToMeeting(
      scoId,
      principalId,
      permissionId,
      this.token,
      this.url
    )
  }

  public async goMeeting (
    scoUrl: string,
    { username, password }: LoginProps
  ): Promise<string> {
    /**
     * Loguea a la aplicación de Adobe Connect con el usuario ingresado.
     */
    const localToken = await login({ username, password, url: this.url })
    return goMeeting(scoUrl, localToken)
  }
}
