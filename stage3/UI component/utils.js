// myQuery
var $ = (function () {
  /**
   * 选择器部分
   * @param  {String} query 对象ID(暂时只支持ID选择)
   * @return {ele}       选择的对象
   */
  function myquery ( query ) {
    var ele, oldFn,
        querytype = typeof query

    if ( 'string' === querytype ) {
      ele = document.getElementById( query )

      return ele
      /**
       * window.onload队列
       * @param  {Function} 'function' [description]
       * @return {[type]}            [description]
       */
    } else if ( 'function' === querytype ) {
      oldFn = window.onload

      if ( 'function' === typeof window.onload ) {
        window.onload = function () {
          oldFn()
          query()
        }
      } else {
        window.onload = query
      }
    } else {
      console.log( 'error' )
    }
  }

  return myquery
})()
