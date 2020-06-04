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
  /**
   * Identificador del scheduleId.
   */
  scoId?: number
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
}
