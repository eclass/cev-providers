import { fetchEndpoint } from './lib/fetchEndpoint'

type LoginEndpoint = {
  token: string
  userId?: string
}
/**
 * Login a Zoom retorna el userId del usuario por su email.
 *
 * @example const login = await login(token, email)
 */
export const zoomLogin = async (
  token: string,
  email: string
): Promise<LoginEndpoint> => {
  /** Obtener id de usuario para peticiones */
  try {
    const { response } = await fetchEndpoint({
      token,
      method: 'get',
      pathUrl: '/users/' + email
    })
    const userId = `${response.id}`
    return {
      token,
      userId
    }
  } catch (err) {
    throw new Error(err)
  }
}
