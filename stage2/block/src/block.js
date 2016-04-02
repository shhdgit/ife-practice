// my command block
var CmdBlock = function (ele, speed) {
  this.ele = ele
  this.param = {
    x: 0,
    y: 0,
    deg: 0,
    record: { //记录
      x: 0,
      y: 0,
      deg: 0,
    },
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
  this.param.deg = (this.param.deg + deg + 360) % 360
}

CmdBlock.prototype.turnTo = function (deg) {
  this.param.deg = deg
}

// move
CmdBlock.prototype.go = function () {
  var point = this.getPoint()

  this.param.x = point.x
  this.param.y = point.y
}

CmdBlock.prototype.moveTo = function (orien) {
  var point = this.getPoint(orien)

  this.param.x = point.x
  this.param.y = point.y
}

/**
 * 建墙
 * @param  {Number} x x坐标
 * @param  {Number} y y坐标
 * @return {[Object, Object]}   墙的参数, 对应的DOM元素
 */
CmdBlock.prototype.build = function (x, y) {
  var wall = Object.create(Wall)
  var dom = wall.createAt(x, y)

  return {
    wall: wall,
    dom: dom
  }
}

CmdBlock.prototype.getPoint = function (orien) {
  var deg = orien || this.param.deg
  x = this.param.x,
  y = this.param.y

  switch (deg) {
    case 0:
      y -= 1
      break
    case 180:
      y += 1
      break
    case 270:
      x -= 1
      break
    case 90:
      x += 1
      break
    default:
      console.log('wrong orientation')
  }

  return {
    x: x,
    y: y
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
