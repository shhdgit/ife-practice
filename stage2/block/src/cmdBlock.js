// my command block
var CmdBlock = function (ele, speed) {
  this.ele = ele
  this.param = {
    x: 0,
    y: 0,
    record: {
      x: 0,
      y: 0,
    }, //x, y记录
    deg: 0,
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
  this.param.record.x = x
  this.param.record.y = y
}

CmdBlock.prototype.turn = function (deg) {
  var oDeg = this.param.deg

  this.param.deg = (oDeg + deg + 360) % 360
}

CmdBlock.prototype.turnTo = function (deg) {
  this.param.deg = deg
}

// move
CmdBlock.prototype.moveReg = function (orien) {
  var param = this.param

  switch (orien) {
    case 0:
      param.y -= 1
      break
    case 180:
      param.y += 1
      break
    case 270:
      param.x -= 1
      break
    case 90:
      param.x += 1
      break
    default:
      console.log('wrong orientation!')
  }
}

CmdBlock.prototype.moveTo = function (orien) {
  this.moveReg(orien)
}

CmdBlock.prototype.move = function () {
  this.moveReg(this.param.deg)
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
