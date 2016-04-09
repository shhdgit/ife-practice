$(function () {
  var myblock = new Block($('myblock'), 50),
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
      'TO': function movto ( position ) {},
    },
    // 建墙
    'BUILD': function () {
      var x, y
      var point = myblock.getPoint()

      x = point.x
      y = point.y

      if ( !haveWall( x, y ) && !wallInRange( x, y ) ) {
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

  function haveWall ( x, y ) {
    return wallArr.some(function ( wall, i ) {
      if ( wall.wall.id === ( y * 10 + x ) ) return true
      return false
    })
  }

  function wallInRange ( x, y ) {
    return ( 0 > x || 9 < x || 0 > y || 9 < y )
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

  /* ---------------方块渲染-------------- */
  var blockRender = new BlockRender( myblock )

  /* -----------------controller----------------- */
  function befoExec ( fn ) {
    return function () {
      fn()
      if ( analysis( wallArr ) ) {
        blockRender.render()

        param.record.x = param.x
        param.record.y = param.y
        param.record.deg = param.deg
      }
    }
  }

  // 初始化界面
  var textarea
  var init = ( function () {
    textarea = new CmdArea( $( 'command' ), $( 'leftNum' ) )
    blockRender.render()
  } )()

  function execute () {
    var i, j
    var eText = textarea.getValue()

    for ( i = 0, n = eText.length; i < n; i++ ) {
      var tmp = lexical( eText[ i ], cmdMap, i )

      if ( 'function' === typeof tmp.func ) {
        if ( '' !== tmp.func.name ) {
          bundle.addToQueue( befoExec( tmp.func( tmp.argument ) ) )
        } else {
          // 加入队列的次数
          var times = parseInt( tmp.times ) || 1

          for ( j = 0; j < times; j++ ) {
            bundle.addToQueue( befoExec( tmp.func ) )
          }
        }
      // 在错误行变红
      } else {
        $( 'leftNum' ).children[ tmp.line ].setAttribute( 'style', 'background-color:red;' )
        break
      }
    }
  }

  // 随机建墙
  function randomWall () {
    var x = Math.floor( Math.random() * 10 ),
        y = Math.floor( Math.random() * 10 ),
        isStayPos = ( x === param.x && y === param.y )

    if ( !haveWall( x, y ) && !wallInRange( x, y ) && !isStayPos ) {
      wallArr[ wallArr.length ] = myblock.build( x, y )
    } else {
      randomWall()
    }
  }


  // 绑定按钮
  $( 'executeBtn' ).addEventListener( 'click', execute )
  $( 'randomwall' ).addEventListener( 'click', randomWall )

})
