import { createError } from '../../src/helpers/error'
import { AsRequestConfig, AsResponseConfig } from '../../src/types'

describe('helpers:error', () => {
  test('should create an Error with message, config, code, request, response and isAsError', () => {
    const request = new XMLHttpRequest()
    const config: AsRequestConfig = { method: 'post' }
    const response: AsResponseConfig = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.isAsError).toBeTruthy()
  })
})
