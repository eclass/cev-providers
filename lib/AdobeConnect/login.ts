import { LoginProps, RequestStatus } from '../types'

import { URL } from 'url'
import fetch = require('node-fetch')

/**
 * Login a Adobeconnect
 *
 * @example
 *  const login = login(username, password)
 */
export const login = async ({
  url,
  username,
  password
}: LoginProps): Promise<RequestStatus> => {
  try {
    const loginUrl = new URL(url)
    const params = {
      action: 'login',
      'external-auth': 'use',
      login: username,
      password
    }
    Object.keys(params).forEach(key =>
      loginUrl.searchParams.append(key, params[`${key}`])
    )
    const response = await fetch(loginUrl)
    if (response.ok) {
      const cookies = response.headers.get('set-cookie')
      if (cookies !== '' && cookies.includes('BREEZESESSION')) {
        const [[, breezeSession]] = cookies
          .split(';')
          .map(cookie => cookie.split('='))
        /**
         * @todo Transformar a RequestsStatus.
         */
        return breezeSession
      } else {
        /**
         * @todo Transformar a RequestsStatus.
         */
        throw new Error('cookie not found')
      }
    } else {
      /**
       * @todo Transformar a RequestsStatus.
       */
      throw new Error(`unexpected response ${response.statusText}`)
    }
  } catch (err) {
    /**
     * @todo Documentar este caso.
     */
    return {
      success: false,
      code: 500,
      detail: 'Detalle',
      name: 'Peticion falliah',
      err
    }
  }
}
