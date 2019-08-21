import as, { AsResponseConfig, AsError } from '../src'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () => {
    as('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', () => {
    as({
      url: '/foo',
      method: 'POST'
    }).then(response => {
      expect(response.config.method).toBe('post')
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', () => {
    const resolveSpy = jest.fn((res: AsResponseConfig) => {
      return res
    })

    const rejectSpy = jest.fn((e: AsError) => {
      return e
    })

    jasmine.Ajax.uninstall()

    return as('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AsResponseConfig | AsError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AsError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()
    }
  })

  test('should reject when request timeout', done => {
    let err: AsError

    as('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })
  })
})
