// myQuery
var $ = (function () {
  return function myquery (query) {
    // 选择器部分
    var ele, oldFn,
        querytype = typeof query

    if ('string' === querytype) {
      ele = document.getElementById(query)

      return ele
    } else if ('function' === querytype) {
      // window.onload队列
      oldFn = window.onload

      if ('function' === typeof window.onload) {
        window.onload = function () {
          oldFn()
          query()
        }
      } else {
        window.onload = query
      }
    } else {
      console.log('error')
    }

    // 方法
  }
})()
