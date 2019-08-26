import as from '../src'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      as.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    as('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[as.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = as.defaults.xsrfCookieName + '=12345'

    as('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[as.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = as.defaults.xsrfCookieName + '=12345'

    as('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[as.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = as.defaults.xsrfCookieName + '=12345'

    as('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[as.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
