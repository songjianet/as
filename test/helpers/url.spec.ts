import { buildURL, isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(buildURL('/foo', { foo: 'bar' })).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () => {
      expect(buildURL('/foo', { foo: 'bar', baz: null })).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param value is null', () => {
      expect(buildURL('/foo', { baz: null })).toBe('/foo')
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: { bar: 'baz' }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    test('should support date params', () => {
      const date = new Date()
      expect(buildURL('/foo', { date: date })).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      )
    })

    test('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {})
  })

  describe('isAbsoluteURL', () => {})

  describe('combineURL', () => {})

  describe('isURLSameOrigin', () => {})
})
