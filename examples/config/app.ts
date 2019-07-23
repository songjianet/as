import as, { AsTransformer } from '../../src/index'
import qs from 'qs'

console.log(as)

as.defaults.headers.common['test2'] = 123

as({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})

as({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(as.defaults.transformRequest as AsTransformer[])],
  transformResponse: [...(as.defaults.transformResponse as AsTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

const instance = as.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(as.defaults.transformRequest as AsTransformer[])],
  transformResponse: [...(as.defaults.transformResponse as AsTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1111
  }
}).then((res) => {
  console.log(res.data)
})
