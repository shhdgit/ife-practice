function creatQueue () {
  var timer,
  queue = []

  function timerFunc () {
    var fn

    if ( queue.length ) {
      fn = queue.shift()
      fn()
    } else {
      clearInterval(timer)
      timer = undefined
    }
  }

  return function (newFn) {
    queue.push(newFn)

    if ( !timer ) {
      timer = setInterval(timerFunc, 1000)
    }
  }
}
