import { URL } from 'url'
import { GoMeetingPayload } from '..'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const goMeeting = goMeeting(url, token)
 */
export const goMeeting = (url: string, token: string): GoMeetingPayload => {
  const returnUrl = new URL(url)
  returnUrl.searchParams.append('session', token)
  return {
    url: returnUrl.href,
    log: { status: 200, statusText: '', url: '' },
    registrants: {}
  }
}
