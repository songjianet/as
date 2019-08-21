import { getAjaxRequest } from './helper'
import as from '../src'

function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k].trim()).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}

describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should use default common headers', () => {
    const headers = as.defaults.headers.common

    as('/foo')

    return getAjaxRequest().then(request => {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })

  test('should add extra headers for post', () => {
    as.post('/foo', 'fizz=buzz')

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should use application/json when posting an object', () => {
    as.post('/foo/bar', {
      firstName: 'foo',
      lastName: 'bar'
    })

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('should remove content-type if data is empty', () => {
    as.post('/foo')

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })

  it('should preserve content-type if data is false', () => {
    as.post('/foo', false)

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should remove content-type if data is FormData', () => {
    const data = new FormData()

    data.append('foo', 'bar')

    as.post('/foo', data)

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })
})
