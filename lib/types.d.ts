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
  login: (props: LoginProps) => Promise<RequestStatus>

  /**
   * Método que permite añadir un participante a la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a añadir.
   */
  createParticipant: (token: string, participant: Participant) => void
  /**
   * Método que permite editar un participante de la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a editar.
   */
  editParticipant: (token: string, participant: Participant) => void
  /**
   * Método que permite eliminar un participante de la reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Participant} participant - Instancia de participante a eliminar.
   */
  deleteParticipant: (token: string, participant: Participant) => void

  /**
   * Método que permite crear una reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Meeting} meeting - Instancia de meeting a crear.
   */
  createMeeting: (token: string, meeting: Meeting) => Promise<RequestStatus>
  /**
   * Método que permite editar una reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Meeting} meeting - Instancia de meeting a editar.
   */
  editMeeting: (token: string, meeting: Meeting) => void
  /**
   * Método que permite eliminar una reunión.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {Meeting} meeting - Instancia de meeting a eliminar.
   */
  deleteMeeting: (token: string, meeting: Meeting) => void

  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {boolean} param - Primer parametro.
   */
  goMeeting: (token: string, param: boolean) => void
  /**
   * @todo Complementar parametros y respuestas según funcionamiento actual V6.
   *
   * Formatea la pregunta leída desde la base de datos.
   * @param {string} token - Token para acceder a la API Proveedor CEV.
   * @param {boolean} param - Primer parametro.
   */
  goMeetingTeacher: (token: string, param: boolean) => void
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
   * URL API.
   */
  url: string
  /**
   * Token del Proveedor CEV.
   */
  token: string
  /**
   * Nombre reunión
   */
  name: string
  /**
   * Fecha inicio reunión
   */
  dateInit: Date
  /**
   * Fecha fin reunión
   */
  dateEnd?: Date
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
  err?: unknown

  /**
   * Data asociada a request.
   */
  data?: unknown
}
