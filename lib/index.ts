// Clases
export * from './AdobeConnect/'
export * from './Zoom/'

// Types
export * from './BaseProvider'

export type Meeting = {
  /**
   * Identificador único de la reunión.
   */
  id?: string
  /**
   * URL API.
   */
  url?: string
  /**
   * Token del Proveedor CEV.
   */
  token?: string
  /**
   * Nombre reunión
   */
  name?: string
  /**
   * Fecha inicio meeting
   */
  dateInit?: string
  /**
   * Fecha fin meeting
   */
  dateEnd?: string
  /**
   * Identificador del scheduleId.
   */
  scoId?: number
}

export interface MeetingZoom extends Meeting {
  /**
   * Nombre
   */
  topic?: string
  /**
   * Duración de la reunión.
   */
  duration?: number
  // eslint-disable-next-line camelcase
  start_time: string
  /**
   * Tipo de Meeting.
   */
  type?: number
  /**
   * Zona horaria.
   */
  timezone?: string
  /**
   * Contraseña a configurar en la meeting.
   */
  password?: string
  /**
   * Agenda
   */
  agenda?: string
  /**
   * Agendar para otro usuario
   */
  // eslint-disable-next-line camelcase
  schedule_for?: string
  /**
   * Configuraciones
   */
  settings?: any
}

/**
 * Instancia de Participante a la reunión del Proveedor CEV.
 */
export type Participant = {
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
   *
   * @todo Zoom.
   */
  permissionId?: 'view' | 'host' | 'mini-host' | 'remove'
}
