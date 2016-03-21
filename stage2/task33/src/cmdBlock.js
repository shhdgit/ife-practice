// my command block
var CmdBlock = function (ele, speed) {
  this.ele = ele
  this.param = {
    x: 0,
    y: 0,
    head: 'top',
    speed: speed,
  }

  this.init()
}

CmdBlock.prototype.init = function () {
  var x, y

  x = Math.floor(10 * Math.random())
  y = Math.floor(10 * Math.random())

  this.param.x = x
  this.param.y = y
}

CmdBlock.prototype.turn = (function () {
  var oDeg = 0

  return function (deg) {
    oDeg = (oDeg + deg + 360) % 360

    this.param.head = (function degToStr () {
      var tmpOri

      switch (oDeg) {
        case 0:
          tmpOri = 'top'
          break
        case 180:
          tmpOri = 'bottom'
          break
        case 270:
          tmpOri = 'left'
          break
        case 90:
          tmpOri = 'right'
          break
        default:
          console.log('wrong orientation')
      }
      return tmpOri
    })()
  }
})()

CmdBlock.prototype.turnTo = function (orien) {
  this.param.head = orien
}

CmdBlock.prototype.move = function () {
  var param = this.param

  switch (param.head) {
    case 'top':
      param.y -= 1
      break
    case 'bottom':
      param.y += 1
      break
    case 'left':
      param.x -= 1
      break
    case 'right':
      param.x += 1
      break
    default:
      console.log('wrong orientation!')
  }
}

var singleCmdBlock = (function () {
  var instance

  return function (ele, speed) {
    if (!instance) {
      instance = new CmdBlock(ele, speed)
    }

    return instance
  }
})()
