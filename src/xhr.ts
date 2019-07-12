import { AsRequestConfig, AsPromise, AsResponseConfig } from './types'

/**
 * 发送请求
 *
 * @param config {object} 请求信息
 * @returns AsPromise {object} promise格式的返回信息
 * @author songjianet
 */
export default function xhr(config: AsRequestConfig): AsPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AsResponseConfig = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(n => {
      if (data === null && n.toLowerCase() === 'content-type') {
        delete headers[n]
      } else {
        request.setRequestHeader(n, headers[n])
      }
    })

    request.send(data)
  })
}
