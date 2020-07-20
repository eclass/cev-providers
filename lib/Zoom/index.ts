import { LoginProps } from '../types'
import { MeetingZoom, Participant } from '../'
import { BaseProvider } from '../BaseProvider'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

import { createParticipant } from './createParticipant'

import { createMeeting } from './createMeeting'
import { goMeeting } from './goMeeting'

import { participantToMeeting } from './participantToMeeting'

export class Zoom extends BaseProvider {
  private _username: string
  private _password: string
  private _email: string
  private _meeting: MeetingZoom
  private _participants: Array<Participant> = []
  private _userId: string

  private _logged = false

  constructor (
    url: string,
    username: string,
    password: string,
    email?: string
  ) {
    super()
    this.url = url
    this._username = username
    this._password = password
    this._email = email
  }

  public async login ({ username, password }: LoginProps): Promise<string> {
    const loginInfo = await login({ username, password }, this.url, this._email)
    if (loginInfo) {
      this.token = loginInfo.token
      this._userId = loginInfo.userId
      this._logged = true
    }
    return loginInfo.token
  }

  public async createMeeting (meeting: MeetingZoom): Promise<MeetingZoom> {
    /**
     * Si no está logueado, loguea a la aplicación de Zoom.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    const Meeting = await createMeeting(
      {
        ...meeting,
        url: this.url
      },
      this.token,
      this._userId
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
     * Si no está logueado, loguea a la aplicación de Zoom.
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
     * Si no está logueado, loguea a la aplicación de Zoom.
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
     * Loguea a la aplicación de Zoom con el usuario ingresado.
     */
    return await goMeeting(scoUrl, this.token)
  }
}
