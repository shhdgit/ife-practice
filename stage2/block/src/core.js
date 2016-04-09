/* --------------------------------------方块-------------------- */
function Block ( ele, speed ) {
  var _x = Math.floor( 10 * Math.random() ),
      _y = Math.floor( 10 * Math.random() )

  this.ele = ele
  this.param = {
    x: _x,
    y: _y,
    deg: 0,
    record: { //记录
      x: _x,
      y: _y,
      deg: 0,
    },
    speed: speed,
  }
}

Block.prototype.turn = function ( deg ) {
  this.param.deg = ( this.param.deg + deg + 360 ) % 360
}

Block.prototype.turnTo = function ( deg ) {
  this.param.deg = deg
}

// move
Block.prototype.go = function () {
  var point = this.getPoint()

  this.param.x = point.x
  this.param.y = point.y
}

Block.prototype.moveTo = function ( orien ) {
  var point = this.getPoint( orien )

  this.param.x = point.x
  this.param.y = point.y
}

/**
 * 建墙
 * @param  {Number} x x坐标
 * @param  {Number} y y坐标
 * @return {[Object, Object]}   墙的参数, 对应的DOM元素
 */
Block.prototype.build = function (x, y) {
  var wall = Object.create(Wall)
  var dom = wall.createAt(x, y)

  return {
    wall: wall,
    dom: dom
  }
}

/**
 * 获取面朝方向的x,y
 * @param  {Number} orien 方向
 * @return {[Number, Number]}       x,y值
 */
Block.prototype.getPoint = function (orien) {
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

/* --------------------------------------命令框-------------------- */
function CmdArea ( ele, sidebar ) {
  var render = this.render,
      _this = this

  ele.addEventListener('keydown', function ( event ) {
    setTimeout( render.bind( _this ), 0 )
  })

  this.ele = ele
  this.sidebar = sidebar
  this.lineRecord = 1
}

CmdArea.prototype.getValue = function () {
  return this.ele.value.split( '\n' )
}

/**
 * 渲染命令框
 * @return {undefined} [description]
 */
CmdArea.prototype.render = function () {
  var li
  var value = this.getValue(),
      sidebar = this.sidebar,
      valLen = value.length

  // 行数有变化则重新渲染
  if ( this.lineRecord !== valLen ) {
    sidebar.innerHTML = '<li>1</li>'

    for (var i = 1; i < valLen; i++) {
      li = document.createElement('li')
      li.innerHTML = i + 1
      sidebar.appendChild(li)
    }

    // 行数大于10时,调整textarea大小
    if ( 10 < valLen ) {
      this.ele.style.height = valLen * 20 + 5 + 'px'
      sidebar.style.height = valLen * 20 + 10 + 'px'
    } else {
      this.ele.style.height = '205px'
      sidebar.style.height = '100%'
    }

    this.lineRecord = valLen
  }
}

/* --------------------------------------渲染-------------------- */
function BlockRender ( ele ) {
  var dom = ele.ele,
      param = ele.param

  function init () {
    dom.style.top = (param.y * param.speed) + 'px'
    dom.style.left = (param.x * param.speed) + 'px'
  }

  init()

  this.dom = dom,
  this.param = param,
  this.deg = 0
}

BlockRender.prototype.render = function () {
  var left, top, tmpDeg
  var dom = this.dom,
      param = this.param

  // 改变left
  left = parseInt( dom.style.left.match( /\d+/g ) )
  if (param.x !== left / param.speed) {
    this.animate(left, 'left', ((param.x - param.record.x) * param.speed), 3, function ( num ) {
      return (num + 'px')
    })
  }

  // 改变top
  top = parseInt( dom.style.top.match( /\d+/g ) )
  if (param.y !== top / param.speed) {
    this.animate(top, 'top', ((param.y - param.record.y) * param.speed), 3, function ( num ) {
      return (num + 'px')
    })
  }

  // 改变方向
  tmpDeg = param.deg - param.record.deg
  // 解决0与270度之间的转向问题
  switch ( tmpDeg ) {
    case 270:
      tmpDeg = -90
      break
    case -270:
      tmpDeg = 90
      break
    default:
      break
  }

  if ( tmpDeg ) {
    this.animate(this.deg, 'webkitTransform', tmpDeg, 12, function (num) {
      return ('rotate(' + num + 'deg)')
    })
    this.deg += tmpDeg
  }
}

/**
 * 动画函数
 * @param  {Number}   old   属性原来的值
 * @param  {String}   attr  要改变的属性
 * @param  {Number}   peace 步长(一次调用改变的大小)
 * @param  {Number}   speed 速度
 * @param  {Function} fn    函数返回属性的值+单位
 * @return {undefined}         [description]
 */
BlockRender.prototype.animate = function ( old, attr, peace, speed, fn ) {
  var dom = this.dom

  var timer = setInterval(function () {
    var nowPos = parseInt( dom.style[ attr ].match( /[-]?\d+/g ) ) || 0

    // 若目标位置等于当前位置，清空定时器
    if ( old + peace === nowPos ) {
      clearInterval(timer)
      dom.style[ attr ] = fn( old + peace )
    } else {
      // 动画公式
      var tmp = Math.ceil( Math.abs( ( old + peace - nowPos ) / peace ) * speed )
      var num = ( 0 < peace ) ? tmp + nowPos : -tmp + nowPos

      dom.style[ attr ] = fn( num )
    }
  }, 16.666)
}

/* --------------------------------------墙-------------------- */
var Wall = {
  parent: $('wall'),

  /**
   * 新建一堵墙
   * @param  {Number} x [description]
   * @param  {Number} y [description]
   * @return {Object}   对应的dom元素
   */
  createAt: function (x, y) {
    this.x = x
    this.y = y
    this.id = y * 10 + x

    return this.addWall(x, y)
  },

  addWall: function (x, y) {
    var wall = document.createElement('div')

    wall.setAttribute('style', 'position:absolute;background-color:#eee;top:' + y * 50 + 'px;left:' + x * 50 + 'px;')
    this.parent.appendChild(wall)

    return wall
  },
}

/* --------------------------------------bundle-------------------- */
var bundle = {

  /**
   * 命令队列
   * @param  {Function}   newFn   新加入队列的函数
   * @return {undefined}   [description]
   */
  addToQueue: (function () {
    var timer,
    queue = []

    function timerFunc () {
      var fn

      if ( queue.length ) {
        fn = queue.shift()
        fn()
      } else {
        clearInterval( timer )
        timer = undefined
      }
    }

    return function ( newFn ) {
      queue.push( newFn )

      if ( !timer ) {
        timer = setInterval( timerFunc, 1000 )
      }
    }
  })(),

}
