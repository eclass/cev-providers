import { LoginProps } from '../types'
import {
  Meeting,
  Participant,
  ProviderConstructor,
  ParticipantToMeetingProps,
  GoMeetingProps,
  GoMeetingPayload
} from '../'
import { BaseProvider } from '../BaseProvider'

/**
 * Métodos del Proveedor Adobe Connect.
 */
import { login } from './login'

import { createParticipant } from './createParticipant'

import { createMeeting } from './createMeeting'
import { goMeeting } from './goMeeting'
import { goMeetingTeacher } from './goMeetingTeacher'

import { participantToMeeting } from './participantToMeeting'
import { updateMeetingTimezone } from './updateMeetingTimezone'

export class Zoom extends BaseProvider {
  private _username: string
  private _password: string
  private _meeting: Meeting
  private _email: string
  private _participants: Array<Participant> = []
  private _userId: string
  private _timeZone: string

  private _logged = false

  constructor (props: ProviderConstructor) {
    super()

    const { url, username, password, email, timeZone } = props
    this.url = url
    this._username = username
    this._password = password
    this._email = email
    this._timeZone = timeZone
  }

  public async login (props: LoginProps): Promise<string> {
    const { username, password } = props
    const loginInfo = await login({ username, password }, this.url, this._email)
    if (loginInfo) {
      this.token = loginInfo.token
      this._userId = loginInfo.userId
      this._logged = true
    }
    return loginInfo.token
  }

  public async createMeeting (meeting: Meeting): Promise<Meeting> {
    /**
     * Si no está logueado, loguea a la aplicación de Zoom.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    const Meeting = await createMeeting({
      ...meeting,
      url: this.url,
      token: this.token,
      userId: this._userId
    })

    if (!Meeting) {
      throw new Error('Empty meeting')
    }

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
    props: ParticipantToMeetingProps
  ): Promise<boolean> {
    /**
     * Si no está logueado, loguea a la aplicación de Zoom.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    return await participantToMeeting({
      ...props,
      token: this.token
    })
  }

  public async goMeeting (props: GoMeetingProps): Promise<GoMeetingPayload> {
    /**
     * Si no está logueado, loguea a la aplicación de Zoom.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    /**
     * Loguea a la aplicación de Zoom con el usuario ingresado.
     */

    // await updateMeetingTimezone({
    //   meetingId: props.meetingId,
    //   token: this.token,
    //   timezone: this._timeZone
    // })

    // console.log("here after update");

    return await goMeeting({
      ...props,
      token: this.token,
      timezone: this._timeZone
    })
  }

  public async goMeetingTeacher (props: GoMeetingProps): Promise<string> {
    /**
     * Si no está logueado, loguea a la aplicación de Zoom.
     */
    if (!this._logged) {
      await this.login({ username: this._username, password: this._password })
    }

    /**
     * Obtiene start_url de meetingId ingresado.
     */
    return await goMeetingTeacher({
      ...props,
      token: this.token
    })
  }
}
