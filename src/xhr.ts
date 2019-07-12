import { AsRequestConfig } from './types'

/**
 * 包装请求
 * @author songjian
 */
export default function xhr(config: AsRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(n => {
    if (data === null && n.toLowerCase() === 'content-type') {
      delete headers[n]
    } else {
      request.setRequestHeader(n, headers[n])
    }
  })

  request.send(data)
}
