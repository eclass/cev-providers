import { URL } from 'url'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const goMeeting = goMeeting(url, token)
 */
export const goMeeting = (url: string, token: string): string => {
  const returnUrl = new URL(`${url}/api/xml`)
  returnUrl.searchParams.append('session', token)
  return returnUrl.href
}
