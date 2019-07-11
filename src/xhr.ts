import { AsRequestConfig } from './types'

/**
 * 包装请求
 * @author songjian
 */
export default function xhr(config: AsRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
