function creatRender ( block ) {
  var param = block.param,
      ele = block.ele,
      Sdeg = 0

  ele.style.top = (param.y * param.speed) + 'px'
  ele.style.left = (param.x * param.speed) + 'px'

  return function () {
    var Odeg = 0

    // 动画函数
    function animate (old, attr, peace, speed, fn) {
      var timer = setInterval(function () {
        var nowPos = parseInt( ele.style[attr].match(/[-]?\d+/g) ) || 0

        if ( old + peace === nowPos ) {
          clearInterval(timer)
        } else {
          var tmp = Math.ceil( Math.abs( ( old + peace - nowPos ) / peace ) * speed )
          var num = ( 0 < peace ) ? tmp + nowPos : -tmp + nowPos
          ele.style[attr] = fn(num)
        }
      }, 16.666)
    }

    var x = parseInt( ele.style.left.match(/\d+/g) )
    animate(x, 'left', param.speed, 3, function (num) {
      return (num + 'px')
    })
    var y = parseInt( ele.style.top.match(/\d+/g) )
    animate(y, 'top', param.speed, 3, function (num) {
      return (num + 'px')
    })

    Odeg = param.deg - param.record.deg
    // 解决0与270度之间的转向问题
    switch ( Odeg ) {
      case 270:
        Odeg = -90
        break
      case -270:
        Odeg = 90
        break
      default:
        break
    }

    animate(Sdeg, 'webkitTransform', Odeg, 12, function (num) {
      return ('rotate(' + num + 'deg)')
    })
    Sdeg += Odeg
  }
}
