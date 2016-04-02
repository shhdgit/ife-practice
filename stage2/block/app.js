$(function () {
  var myblock = new singleCmdBlock($('myblock'), 50),
      ele = myblock.ele,
      param = myblock.param,
      wallArr = []

  /* --------------控制器--------------- */
  var cmdMap = {
      // 移动一格
    'GO': function () {
      myblock.go()
    },
    // 转向
    'TUN': {
      'LEF': function () {
        myblock.turn(-90)
      },
      'RIG': function () {
        myblock.turn(90)
      },
      'BAC': function () {
        myblock.turn(180)
      },
    },
    // 不转向移动
    'TRA': {
      'TOP': function () {
        myblock.moveTo(0)
      },
      'BOT': function () {
        myblock.moveTo(180)
      },
      'LEF': function () {
        myblock.moveTo(270)
      },
      'RIG': function () {
        myblock.moveTo(90)
      },
    },
    // 转向移动
    'MOV': {
      'TOP': function () {
        myblock.turnTo(0)
        myblock.go()
      },
      'BOT': function () {
        myblock.turnTo(180)
        myblock.go()
      },
      'LEF': function () {
        myblock.turnTo(270)
        myblock.go()
      },
      'RIG': function () {
        myblock.turnTo(90)
        myblock.go()
      },
    },
    // 建墙
    'BUILD': function () {
      var x, y
      var point = myblock.getPoint()

      x = point.x
      y = point.y

      var haveId = wallArr.some(function ( wall, i ) {
        if ( wall.wall.id === ( y * 10 + x ) ) return true
        return false
      })

      var isInRange = function () {
        return ( 0 > x || 9 < x || 0 > y || 9 < y )
      }

      if ( !haveId && !isInRange() ) {
        wallArr[ wallArr.length ] = myblock.build( x, y )
      } else {
        console.log('already built')
      }
    },
    // 刷墙
    'BRU': function bru ( color ) {
      color = color || '#000'

      return function () {
        var id, msg
        var point = myblock.getPoint(),

        id = point.y * 10 + point.x

        msg = wallArr.some( function ( wall, i ) {
          if ( wall.wall.id === id ) {
            wall.dom.style.backgroundColor = color
            wall.dom.style.borderColor = color

            return true
          }
        } )
        if ( !msg ) console.log('no wall there')
      }
    },
  }

  // 可移区域分析
  function analysis ( wallArr ) {
    function isInRange () {
      return ( 0 > param.x || 9 < param.x || 0 > param.y || 9 < param.y )
    }

    function isWall () {
      var nowId = param.y * 10 + param.x

      return wallArr.some( function ( wall, i ) {
        return nowId === wall.wall.id
      } )
    }

    if ( isInRange() || isWall() ) {
      // 撞墙则归位
      param.x = param.record.x
      param.y = param.record.y
      console.log( 'wall!' )

      return false
    } else {
      return true
    }
  }

  /* ---------------渲染-------------- */
  var render = creatRender( myblock )

  /* -----------------controller----------------- */
  var addToQueue = creatQueue()

  function befoExec ( fn ) {
    return function () {
      fn()
      if ( analysis( wallArr ) ) {
        render()

        param.record.x = param.x
        param.record.y = param.y
        param.record.deg = param.deg
      }
    }
  }

  // 初始化界面
  var getText
  var init = ( function () {
    getText = creatText.call( $( 'command' ), $( 'leftNum' ) )
    render()
  } )()

  function execute () {
    var i, j
    var eText = getText()

    for ( i = 0, n = eText.length; i < n; i++ ) {
      var tmp = lexical( eText[ i ], cmdMap, i )

      if ( typeof tmp.func === 'function' ) {
        if ( tmp.func.name === 'bru' ) {
          addToQueue( befoExec( tmp.func( tmp.argument ) ) )
        } else {
          // 加入队列的次数
          var times = parseInt( tmp.times ) || 1
          for ( j = 0; j < times; j++ ) {
            addToQueue( befoExec( tmp.func ) )
          }
        }
      // 在错误行变红
      } else {
        $('leftNum').children[tmp.line].style.backgroundColor = 'red'
        break
      }
    }
  }


  // 绑定按钮
  $('executeBtn').addEventListener('click', execute)

})
