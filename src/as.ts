import { AsInstance } from './types'
import As from './core/As'
import { extend } from './helpers/util'

function createInstance(): AsInstance {
  const context = new As()
  const instance = As.prototype.request.bind(context)

  extend(instance, context)

  return instance as AsInstance
}

const as = createInstance()

export default as
