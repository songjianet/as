import as from '../../src/index'
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
