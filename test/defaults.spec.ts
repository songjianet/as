import as, { AsTransformer } from '../src'
import { getAjaxRequest } from './helper'
import { deepMerge } from '../src/helpers/util'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () => {
    expect((as.defaults.transformRequest as AsTransformer[])[0]({ foo: 'bar' })).toBe(
      '{"foo":"bar"}'
    )
  })

  test('should do nothing to request string', () => {
    expect((as.defaults.transformRequest as AsTransformer[])[0]('foo=bar')).toBe('foo=bar')
  })

  test('should transform response json', () => {
    const data = (as.defaults.transformResponse as AsTransformer[])[0]('foo=bar')

    expect(typeof data).toBe('object')
    expect(data.foo).toBe('bar')
  })
})
