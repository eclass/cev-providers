/**
 * Parámetros de la función login del Proveedor CEV.
 */
export type LoginProps = {
  /**
   * URL API.
   */
  url?: string
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
  name: string
  /**
   * Fecha inicio meeting
   */
  dateInit: string
  /**
   * Fecha fin meeting
   */
  dateEnd?: string
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
  err?: any

  /**
   * Data asociada a request.
   */
  data?: any
}
