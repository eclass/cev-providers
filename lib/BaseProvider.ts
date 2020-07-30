import { LoginProps } from './types'
import {
  Participant,
  Meeting,
  ParticipantToMeetingProps,
  GoMeetingProps
} from '.'

/**
 * **Módulo** de Proveedor CEV.
 */
export abstract class BaseProvider {
  /**
   * Dominio proveedor.
   */
  url: string
  /**
   * Token del proveedor.
   */
  token: string

  /**
   * Método que autentifica contra el proveedor el usuario con privilegios
   * para crear una reunión.
   *
   * @param {LoginProps} props - Parámetros para el Login del Proveedor CEV.
   */
  abstract login (props: LoginProps): Promise<string>

  /**
   * Método que permite añadir un participante a la reunión.
   * @param {Participant} participant - Instancia de participante a añadir.
   */
  abstract createParticipant (participant: Participant): Promise<Participant>

  /**
   * Método que permite crear una reunión.
   * @param {Meeting} meeting - Instancia de meeting a crear.
   */
  abstract createMeeting (meeting: Meeting): Promise<Meeting>

  /**
   * Devuelve la url con la sesión para conectar directamente a AdobeConnect.
   * @param {GoMeetingProps} props - Parámetros de goMeeting.
   */
  // abstract goMeeting (url: string, props: LoginProps): Promise<string>
  abstract goMeeting (props: GoMeetingProps): Promise<string>

  /**
   * Devuelve la url con la sesión para conectar directamente al proveedor.
   * @param {GoMeetingProps} props - Parámetros de goMeeting.
   */
  abstract goMeetingTeacher (props: GoMeetingProps): Promise<string>

  /**
   * Añade un participante a la meeting.
   * @param {ParticipantToMeetingProps} props - Parámetros de ParticipantToMeeting.
   */
  abstract participantToMeeting (
    props: ParticipantToMeetingProps
  ): Promise<boolean>
}
