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

/**
 * Request transversal para hacer solicitudes con token.
 */
export type RequestTokenProps = {
  baseUrl: string
  token: string
  method: string
  pathUrl?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryUrl?: any
  body?: unknown
}
