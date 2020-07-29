import { URL } from 'url'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const goMeetingTeacher = goMeetingTeacher(url, token)
 */
export const goMeetingTeacher = (url: string, token: string): string => {
  const returnUrl = new URL(url)
  returnUrl.searchParams.append('session', token)
  return returnUrl.href
}
