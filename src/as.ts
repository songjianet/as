import { AsInstance, AsRequestConfig } from './types'
import As from './core/As'
import { extend } from './helpers/util'
import defaluts from './defaults'

function createInstance(config: AsRequestConfig): AsInstance {
  const context = new As(config)
  const instance = As.prototype.request.bind(context)

  extend(instance, context)

  return instance as AsInstance
}

const as = createInstance(defaluts)

export default as
