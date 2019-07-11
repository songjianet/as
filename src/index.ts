import { AsRequestConfig } from './types'
import xhr from './xhr'

/**
 * 接收as请求信息
 * @author songjian
 */
function as(config: AsRequestConfig): void {
  xhr(config)
}

export default as
