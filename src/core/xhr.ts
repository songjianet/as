import { AsRequestConfig, AsPromise, AsResponseConfig } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'

/**
 * 处理请求，存储返回信息
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {AsPromise} promise格式的返回信息
 * @author songjianet
 */
export default function xhr(config: AsRequestConfig): AsPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    // 打开请求
    request.open(method.toUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    // 发送请求
    request.send(data)

    function configureRequest(): void {
      if (timeout) {
        // 设置超时
        request.timeout = timeout
      }

      if (responseType) {
        // 设置返回类型
        request.responseType = responseType
      }

      if (withCredentials) {
        // 设置跨域相关
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        // 包装返回数据
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 0) {
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AsResponseConfig = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      request.onerror = function handleError() {
        // 处理错误请求
        reject(createError('Network Error!', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        // 处理超时请求
        reject(createError(`Timeout of ${timeout}ms exceeded!`, config, 'ECONNABORTED', request))
      }

      if (onDownloadProgress) {
        // 下载监控
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        // 上传监控
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(n => {
        // 处理请求头
        if (data === null && n.toLowerCase() === 'content-type') {
          delete headers[n]
        } else {
          request.setRequestHeader(n, headers[n])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 处理http状态码
    function handleResponse(res: AsResponseConfig): void {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(
          createError(`Request failed with status code ${res.status}!`, config, null, request, res)
        )
      }
    }
  })
}
