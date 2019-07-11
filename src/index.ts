import { AsRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

/**
 * 接收as请求信息
 * @author songjian
 */
function as(config: AsRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AsRequestConfig): void {
  config.url = transformURL(config)
}

function transformURL(config: AsRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default as
