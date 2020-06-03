import { LoginProps, RequestStatus, Participant, Meeting } from './types'

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
  abstract login (props: LoginProps): Promise<RequestStatus>

  /**
   * Método que permite añadir un participante a la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a añadir.
   */
  // abstract createParticipant(token: string, participant: Participant): void
  /**
   * Método que permite editar un participante de la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a editar.
   */
  // abstract editParticipant(token: string, participant: Participant): void
  /**
   * Método que permite eliminar un participante de la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a eliminar.
   */
  // abstract deleteParticipant(token: string, participant: Participant): void

  /**
   * Método que permite crear una reunión.
   * @param {Meeting} meeting - Instancia de meeting a crear.
   * @param {string} [token] - Token para acceder a la API Proveedor CEV.
   */
  abstract createMeeting (
    meeting: Meeting,
    token: string
  ): Promise<RequestStatus>
  /**
   * Método que permite editar una reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Meeting} meeting - Instancia de meeting a editar.
   */
  // abstract editMeeting(token: string, meeting: Meeting): void
  /**
   * Método que permite eliminar una reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Meeting} meeting - Instancia de meeting a eliminar.
   */
  // abstract deleteMeeting(token: string, meeting: Meeting): void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {boolean} param - Primer parametro.
   */
  // abstract goMeeting(token: string, param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {boolean} param - Primer parametro.
   */
  // abstract goMeetingTeacher(token: string, param: boolean): void
}
