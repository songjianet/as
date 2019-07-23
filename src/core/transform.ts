import { AsTransformer } from '../types'

export function transform(data: any, headers: any, fns?: AsTransformer | AsTransformer[]): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
