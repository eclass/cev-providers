import { URL } from 'url'
import fetch = require('node-fetch')

/**
 * Login a Adobeconnect
 *
 * @example
 *  const login = login(username, password)
 */
export const login = async (
  url: string,
  username: string,
  password: string
): Promise<string> => {
  try {
    const loginUrl = new URL(url)
    const params = {
      action: 'login',
      'external-auth': 'use',
      login: username,
      password
    }
    // eslint-disable-next-line security/detect-object-injection
    Object.keys(params).forEach(key =>
      loginUrl.searchParams.append(key, params[key])
    )
    const response = await fetch(loginUrl)
    if (response.ok) {
      const cookies = response.headers.get('set-cookie')
      if (cookies !== '' && cookies.includes('BREEZESESSION')) {
        return cookies.split(';')[0].split('=')[1]
      } else {
        throw new Error('cookie not found')
      }
    } else {
      throw new Error(`unexpected response ${response.statusText}`)
    }
  } catch (error) {
    return error.name
  }
  return ''
}
