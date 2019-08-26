import as from '../src'
import { getAjaxRequest } from './helper'

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () => {
    as('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () => {
    return as('/foo', {
      auth: {
        username: 'fasβdfdj',
        password: 'open sesame'
      }
    })
      .then(() => {
        throw new Error(
          'Should not succeed to make a HTTP Basic auth request with non-latin1 chart in credentials.'
        )
      })
      .catch(error => {
        expect(/character/i.test(error.message)).toBeTruthy()
      })
  })
})
