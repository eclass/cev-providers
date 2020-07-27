import { LoginProps } from './types'
import { Participant, Meeting } from '.'

/**
 * **Módulo** de Proveedor CEV.
 */
export abstract class BaseProvider {
  /**
   * Dominio proveedor
   */
  url: string
  /**
   * Token del proveedor
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
   * @param {string} [token] - Token para acceder a la API Proveedor CEV.
   */
  abstract createParticipant (
    participant: Participant,
    token: string
  ): Promise<Participant>

  /**
   * Método que permite crear una reunión.
   * @param {Meeting} meeting - Instancia de meeting a crear.
   * @param {string} [token] - Token para acceder a la API Proveedor CEV.
   */
  abstract createMeeting (meeting: Meeting, token: string): Promise<Meeting>

  /**
   * Devuelve la url con la sesión para conectar directamente a AdobeConnect.
   * @param {string} url - Url del recurso a generar.
   * @param {LoginProps} props - Parametros para el login.
   */
  // abstract goMeeting (url: string, props: LoginProps): Promise<string>
  abstract goMeeting (
    url: string,
    props: LoginProps,
    meetingId?: number,
    email?: string
  ): Promise<string>

  /**
   * Añade un participante a la meeting.
   * @param {string} permissionId - Rol del participante (host=Anfitrión, mini-host=Presentador, view=Participante, remove=Eliminar participante).
   * @param {number} principalId - Identificador del participante.
   * @param {number} scoId - Identificador de la reunión.
   */
  abstract participantToMeeting (
    permissionId: string,
    principalId: number,
    scoId: number
  ): Promise<boolean>
}
