import { LoginProps } from '../types'

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
}: LoginProps): Promise<string> => {
  const loginUrl = new URL(`${url}/api/xml`)
  const params = {
    action: 'login',
    'external-auth': 'use',
    login: username,
    password
  }
  Object.keys(params).forEach(key =>
    loginUrl.searchParams.append(key, params[`${key}`])
  )
  try {
    const response = await fetch(loginUrl)
    if (!response.ok) {
      throw new Error('Response Error')
    }

    const cookies = response.headers.get('set-cookie')
    if (cookies === '' || !cookies.includes('BREEZESESSION')) {
      throw new Error('Cookie BREEZESESSION not found in header')
    }
    const [[, breezeSession]] = cookies
      .split(';')
      .map(cookie => cookie.split('='))

    return breezeSession
  } catch (err) {
    throw new Error(err)
  }
}
