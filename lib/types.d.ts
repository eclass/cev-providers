/**
 * **Módulo** de Proveedor CEV.
 */
export interface BaseProvider {
  /**
   * Método que autentifica contra el proveedor el usuario con privilegios
   * para crear una reunión.
   *
   * @param {LoginProps} props - Parámetros para el Login del Proveedor CEV.
   */
  login: (props: LoginProps) => RequestStatus

  /**
   * Método que permite añadir un participante a la reunión.
   * @param {Participant} participant - Instancia de participante a añadir.
   */
  createParticipant: (participant: Participant) => void
  /**
   * Método que permite editar un participante de la reunión.
   * @param {Participant} participant - Instancia de participante a editar.
   */
  editParticipant: (participant: Participant) => void
  /**
   * Método que permite eliminar un participante de la reunión.
   * @param {Participant} participant - Instancia de participante a eliminar.
   */
  deleteParticipant: (participant: Participant) => void

  /**
   * Método que permite crear una reunión.
   * @param {Meeting} meeting - Instancia de meeting a crear.
   */
  createMeeting: (meeting: Meeting) => void
  /**
   * Método que permite editar una reunión.
   * @param {Meeting} meeting - Instancia de meeting a editar.
   */
  editMeeting: (meeting: Meeting) => void
  /**
   * Método que permite eliminar una reunión.
   * @param {Meeting} meeting - Instancia de meeting a eliminar.
   */
  deleteMeeting: (meeting: Meeting) => void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  goMeeting(param: boolean): void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {boolean} param - Primer parametro.
   */
  goMeetingTeacher(param: boolean): void
}

/**
 * Parámetros de la función login del Proveedor CEV.
 */
export type LoginProps = {
  /**
   * URL API.
   */
  url: string
  /**
   * Usuario a loguear en el Proveedor CEV.
   */
  username?: string
  /**
   * Clave del usuario a loguear en el Proveedor CEV.
   */
  password?: string
  /**
   * Token del Proveedor CEV.
   */
  token?: string
}

export type Meeting = {
  /**
   * URL de la reunión.
   */
  url: string
}

/**
 * Instancia de Participante a la reunión del Proveedor CEV.
 */
export type Participant = {
  /**
   * Nombre de usuario al proveedor CEV.
   */
  username: string
  /**
   * Contraseña del usuario al proveedor CEV.
   */
  password: string
  /**
   * Nombre del participante.
   */
  firstName?: string
  /**
   * Apellido del participante.
   */
  lastName?: string
}

/**
 * Objeto de respuesta para todas las peticiones.
 */
export interface RequestStatus {
  /**
   * ### Estado de la petición
   * - __TRUE__: Si es exitosa y no se capturó ningún error
   * - __FALSE__: Si se capturó algún error
   */
  success: boolean

  /**
   * Nombre del estado.
   */
  name: string

  /**
   * Detalle de la Petición. En caso de error se muestra el mensaje de error de la la excepción.
   */
  detail: string

  /**
   * Código de la petición.
   */
  code: number

  /**
   * Error que dispara el resolver.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err?: any
}
