import { LoginProps } from './types'

// Clases
export * from './AdobeConnect/'
export * from './Zoom/'

// Types
export * from './BaseProvider'

/**
 * Instancia de Meeting del Proveedor CEV.
 */
export type Meeting = {
  /**
   * Nombre reunión
   * @requires AdobeConnect
   * @requires Zoom
   */
  name?: string
  /**
   * Fecha inicio meeting
   * @requires AdobeConnect
   * @requires Zoom
   */
  dateInit?: string
  /**
   * Fecha fin meeting
   * @requires AdobeConnect
   */
  dateEnd?: string

  /**
   * Duración de la reunión.
   * @requires Zoom
   */
  duration?: number

  /**
   * Identificador único de la reunión.
   * @requires AdobeConnect
   * @emits
   */
  id?: string
  /**
   * URL API.
   * @requires AdobeConnect
   * @emits
   */
  url?: string
  /**
   * Token del Proveedor CEV.
   * @requires AdobeConnect
   * @requires Zoom
   * @emits
   */
  token?: string
  /**
   * Identificador del scheduleId.
   * @requires AdobeConnect
   * @emits
   */
  scoId?: number

  /**
   * Tipo de Meeting.
   * @requires Zoom
   */
  type?: number
  /**
   * Zona horaria.
   * @requires Zoom
   */
  timezone?: string
  /**
   * Contraseña a configurar en la meeting.
   * @requires Zoom
   */
  password?: string
  /**
   * Topic.
   * @requires Zoom
   */
  topic?: string
  /**
   * Agenda.
   * @requires Zoom
   */
  agenda?: string
  /**
   * Agendar para otro usuario
   * @requires Zoom
   */
  scheduleFor?: string
  /**
   * Configuraciones
   * @requires Zoom
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any
  /**
   * userId.
   * @requires Zoom
   */
  userId?: string
}

/**
 * Instancia de Participante a la reunión del Proveedor CEV.
 */
export type Participant = {
  /**
   * Identificador del usuario al proveedor CEV.
   */
  id?: string | number
  /**
   * Nombre de usuario al proveedor CEV.
   */
  username?: string
  /**
   * Contraseña del usuario al proveedor CEV.
   */
  password?: string
  /**
   * Nombre del participante.
   */
  firstName?: string
  /**
   * Apellido del participante.
   */
  lastName?: string

  /**
   * Login del usuario al proveedor CEV.
   */
  login?: string
  /**
   * Identificador del participante en el proveedor CEV.
   */
  principalId?: number
  /**
   * Identificador de la cuenta del proveedor CEV.
   */
  accountId?: number
  /**
   * Nombre del participante del proveedor CEV.
   */
  name?: string
  /**
   * Correo electrónico del participante proveedor CEV.
   */
  email?: string
  /**
   * Identificador del permiso del participante.
   */
  permissionId?: 'view' | 'host' | 'mini-host' | 'remove'
  /**
   * Identificador del rol del participante en Zoom CEV.
   */
  type?: string
  /**
   * Identificador del grupo al que puede pertenecer un participante.
   */
  groupId?: string
}

/**
 * Constructor del Proveedor CEV.
 */
export type ProviderConstructor = {
  url?: string
  username?: string
  password?: string
  email?: string
}

/**
 * Parámetros para participantToMeeting en Proveedor CEV.
 */
export type ParticipantToMeetingProps = {
  /**
   * Rol del participante (host=Anfitrión, mini-host=Presentador, view=Participante, remove=Eliminar participante).
   * @requires AdobeConnect
   */
  permissionId?: string
  /**
   * Identificador del participante.
   * @requires AdobeConnect
   */
  principalId?: number
  /**
   * Identificador de la reunión.
   * @requires AdobeConnect
   */
  scoId?: number
  /**
   * URL.
   * @requires AdobeConnect
   */
  url?: string
  /**
   * Token.
   * @requires AdobeConnect
   * @requires Zoom
   */
  token?: string

  /**
   * Reunión
   * @requires Zoom
   */
  meeting?: Meeting
  /**
   * Participante
   * @requires Zoom
   */
  participant?: Participant
}

/**
 * Parámetros para goMeeting en Proveedor CEV.
 */
export type GoMeetingProps = {
  /**
   * URL de la Meeting.
   * @requires AdobeConnect
   */
  scoUrl?: string
  /**
   * Datos para loguearse.
   * @requires AdobeConnect
   */
  loginProps?: LoginProps

  /**
   * URL.
   * @requires Zoom
   */
  url?: string
  /**
   * Token.
   * @requires Zoom
   */
  token?: string
  /**
   * meetingId.
   * @requires Zoom
   */
  meetingId?: number
  /**
   * E-Mail.
   * @requires Zoom
   */
  email?: string
}
