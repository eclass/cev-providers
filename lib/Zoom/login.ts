import { LoginProps } from '../types'
import { fetchEndpoint } from './lib/fetchEndpoint'

import * as jwt from 'jsonwebtoken'

type LoginEndpoint = {
  token: string
  userId?: string
}
/**
 * Login a Zoom
 *
 * @example
 *  const login = login({username, password}, url, email)
 */
export const login = async (
  { username, password }: LoginProps,
  url: string,
  email: string
): Promise<LoginEndpoint> => {
  /** Generar Token */
  const payload = {
    iss: username,
    exp: new Date().getTime() + 5000
  }
  const token = jwt.sign(payload, password)
  /** Obtener id de usuario para peticiones */
  const getUserInfo = await fetchEndpoint(
    {
      baseUrl: `${url}`,
      token,
      method: 'get',
      pathUrl: '/v2/users/' + email
    },
    true
  )
  const userId = `${getUserInfo.id}`
  return {
    token,
    userId
  }
}
