import as, { AsRequestConfig, AsResponseConfig } from '../src/index'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = as.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should make a http request', () => {
    const instance = as.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should make a post request', () => {
    const instance = as.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = as.create()

    instance.put('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = as.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = as.create()

    instance.options('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = as.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = as.create()

    instance.head('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })

  test('should use instance options', () => {
    const instance = as.create({ timeout: 1000 })

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })

  test('should have defaults headers', () => {
    const instance = as.create({ baseURL: 'https://api.example.com' })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done => {
    as.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })

    const instance = as.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: AsResponseConfig

    instance.get('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({ status: 200 })

      setTimeout(() => {
        expect(response.config.timeout).toBe(0)
        expect(response.config.withCredentials).toBeTruthy()
        done()
      }, 100)
    })
  })

  test('should get the computed uri', () => {
    const fakeConfig: AsRequestConfig = {
      baseURL: 'https://www.baidu.com/',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(as.getUri(fakeConfig)).toBe(
      'https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest'
    )
  })
})
