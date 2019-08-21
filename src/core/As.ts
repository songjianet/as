import {
  AsPromise,
  AsRequestConfig,
  AsResponseConfig,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AsRequestConfig>
  response: InterceptorManager<AsResponseConfig>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AsRequestConfig) => AsPromise)
  rejected?: RejectedFn
}

export default class As {
  defaults: AsRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AsRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AsRequestConfig>(),
      response: new InterceptorManager<AsResponseConfig>()
    }
  }

  request(url: any, config?: any): AsPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AsRequestConfig): AsPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  getUri(config?: AsRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AsRequestConfig): AsPromise {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AsRequestConfig
  ): AsPromise {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
