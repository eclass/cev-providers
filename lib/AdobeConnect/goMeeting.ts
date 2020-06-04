import { RequestStatus } from '../types'

import { URL } from 'url'

/**
 * Genera url formateada con session para ingresar a llamada
 *
 * @example
 *  const goMeeting = goMeeting(url, token)
 */
export const goMeeting = (url: string, token: string): RequestStatus => {
  try {
    const returnUrl = new URL(url)
    returnUrl.searchParams.append('session', token)
    return {
      success: true,
      code: 200,
      detail: 'URL generated',
      name: 'Successful Request',
      data: returnUrl.href
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      detail: 'error generating url',
      name: 'Error URL',
      err
    }
  }
}
