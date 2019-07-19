import { AsRequestConfig } from '../types'

const starts = Object.create(null)

function defaultStart(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val2 : val1
}

function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 === 'undefined') {
    return val2
  }
}

const startKeysFromVal2 = ['url', 'params', 'data']

startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

export default function mergeConfig(
  config1: AsRequestConfig,
  config2?: AsRequestConfig
): AsRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2![key])
  }

  return config
}
