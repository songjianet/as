import as from '../src'
import { getAjaxRequest } from './helper'

describe('cancel', () => {
  const CancelToken = as.CancelToken
  const Cancel = as.Cancel

  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('when called before sending request', () => {
    test('should rejects Promise with a Cancel object', () => {
      const source = CancelToken.source()
      source.cancel('Operation has been canceled.')

      return as
        .get('/foo', {
          cancelToken: source.token
        })
        .catch(reason => {
          expect(reason).toEqual(expect.any(Cancel))
          expect(reason.message).toBe('Operation has been canceled.')
        })
    })
  })

  describe('when called after request has been sent', () => {
    test('should reject Promise with a Cancel object', done => {
      const source = CancelToken.source()
      as.get('/foo/bar', {
        cancelToken: source.token
      }).catch(reason => {
        expect(reason).toEqual(expect.any(Cancel))
        expect(reason.message).toBe('Operation has been canceled.')
        done()
      })

      getAjaxRequest().then(request => {
        source.cancel('Operation has been canceled.')
        setTimeout(() => {
          request.respondWith({
            status: 200,
            responseText: 'OK'
          })
        }, 10000)
      })
    })

    test('calls abort on request object', done => {
      const source = CancelToken.source()
      let request: any

      as.get('/foo/bar', {
        cancelToken: source.token
      }).catch(() => {
        expect(request.statusText).toBe('abort')
        done()
      })

      getAjaxRequest().then(req => {
        source.cancel()
        request = req
      })
    })
  })
})
