/**
 * 定义as中允许的method参数
 * @author songjian
 */
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'

/**
 * 定义as请求头参数类型
 * @author songjian
 */
export interface AsRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
