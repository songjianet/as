import { AsRequestConfig, AsResponseConfig, AsPromise } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import xhr from './xhr'

/**
 * 接收请求信息
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {AsPromise} promise格式的返回信息
 * @author songjianet
 */
export default function dispatchRequest(config: AsRequestConfig): AsPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理请求信息
 *
 * @param config {AsRequestConfig} 请求信息
 * @author songjianet
 */
function processConfig(config: AsRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 处理URL
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {string} 处理后的URL
 * @author songjianet
 */
function transformURL(config: AsRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

/**
 * 处理data参数
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {any} 处理后的data
 * @author songjianet
 */
function transformRequestData(config: AsRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * 处理请求头
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {any} 返回处理后的信息
 * @author songjianet
 */
function transformHeader(config: AsRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

/**
 * 处理返回信息中的data字符串问题
 *
 * @param res {AsResponseConfig} 请求返回的信息
 * @returns {AsResponseConfig} 返回处理后的信息
 * @author songjianet
 */
function transformResponseData(res: AsResponseConfig): AsResponseConfig {
  res.data = transformResponse(res.data)
  return res
}
