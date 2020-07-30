import { LoginProps } from '../types'
import {
  Meeting,
  Participant,
  ProviderConstructor,
  ParticipantToMeetingProps,
  GoMeetingProps
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

export class AdobeConnect extends BaseProvider {
  private _username: string
  private _password: string
  private _meeting: Meeting
  private _email: string
  private _participants: Array<Participant> = []
  private _userId: string

  private _logged = false

  constructor (props: ProviderConstructor) {
    super()

    const { url, username, password } = props
    this.url = url
    this._username = username
    this._password = password
  }

  public async login (props: LoginProps): Promise<string> {
    const { username, password } = props

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

    const Meeting = await createMeeting({
      ...meeting,
      url: this.url,
      token: this.token
    })

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
    props: ParticipantToMeetingProps
  ): Promise<boolean> {
    const { permissionId, principalId } = props
    let scoId = props.scoId || 0

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

    return await participantToMeeting({
      scoId,
      principalId,
      permissionId,
      token: this.token,
      url: this.url
    })
  }

  public async goMeeting (props: GoMeetingProps): Promise<string> {
    const {
      scoUrl,
      loginProps: { username, password }
    } = props

    /**
     * Loguea a la aplicación de Adobe Connect con el usuario ingresado.
     */
    const localToken = await login({ username, password, url: this.url })
    return goMeeting(scoUrl, localToken)
  }

  public async goMeetingTeacher (props: GoMeetingProps): Promise<string> {
    const {
      scoUrl,
      loginProps: { username, password }
    } = props

    /**
     * Loguea a la aplicación de Adobe Connect con el usuario ingresado.
     */
    const localToken = await login({ username, password, url: this.url })
    return goMeetingTeacher(scoUrl, localToken)
  }
}
