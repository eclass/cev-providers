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
  meetingId?: string
  email?: string
}

/**
 * Request transversal para hacer solicitudes con token.
 */
export type RequestTokenProps = {
  /**
   * Token del proveedor CEV.
   */
  token: string
  /**
   * Metodo de request.
   */
  method: string
  /**
   * Ruta a concatenar a baseUrl.
   */
  pathUrl?: string
  /**
   * Query a agregar a url.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryUrl?: any
  /**
   * Cuerpo del request.
   */
  body?: unknown
}
