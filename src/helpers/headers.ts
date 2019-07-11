import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(keyName => {
    if (keyName !== normalizeName && keyName.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[keyName]
      delete headers[keyName]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8 '
    }
  }
}
