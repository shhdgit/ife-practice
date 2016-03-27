$(function () {
  var myblock = new singleCmdBlock($('myblock'), 50),
      ele = myblock.ele,
      param = myblock.param


  /* --------------控制器--------------- */
  var cmdMap = {
      // 移动一格
    'GO': function () {
      myblock.move()
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
        myblock.move()
      },
      'BOT': function () {
        myblock.turnTo(180)
        myblock.move()
      },
      'LEF': function () {
        myblock.turnTo(270)
        myblock.move()
      },
      'RIG': function () {
        myblock.turnTo(90)
        myblock.move()
      },
    },
  }

  // 可移区域分析
  function analysis (wall) {
    function isInRange () {
      return ( 0 > param.x || 9 < param.x || 0 > param.y || 9 < param.y )
    }

    if ( isInRange() ) {
      // 撞墙则归位
      param.x = param.record.x
      param.y = param.record.y
      console.log('wall!')

      return false
    } else {
      return true
    }
  }

  /* ---------------渲染-------------- */
  var render = creatRender(myblock)

  /* -----------------controller----------------- */
  var addToQueue = creatQueue()

  function befoExec (fn) {
    return function () {
      fn()
      if ( analysis() ) {
        render()

        param.record.x = param.x
        param.record.y = param.y
        param.record.deg = param.deg
      }
    }
  }

  // 初始化界面
  var getText
  var init = (function () {
    getText = creatText.call($('command'), $('leftNum'))
    render()
  })()

  function execute () {
    var i, j
    var eText = getText()

    for (i = 0, n = eText.length; i < n; i++) {
      var tmp = lexical(eText[i], cmdMap, i)

      if ( typeof tmp.func === 'function' ) {
        // 加入队列的次数
        var times = parseInt(tmp.times) || 1
        for (j = 0; j < times; j++) {
          addToQueue(befoExec(tmp.func))
        }
      } else {
        $('leftNum').children[tmp.line].style.backgroundColor = 'red'
        break
      }
    }
  }


  // 绑定按钮
  $('executeBtn').addEventListener('click', execute)

})
