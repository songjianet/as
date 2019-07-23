import { AsRequestConfig, AsStatic } from './types'
import As from './core/As'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AsRequestConfig): AsStatic {
  const context = new As(config)
  const instance = As.prototype.request.bind(context)

  extend(instance, context)

  return instance as AsStatic
}

const as = createInstance(defaults)

as.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default as
