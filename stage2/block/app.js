$(function () {
  var myblock = new singleCmdBlock($('myblock'), 50),
      ele = myblock.ele,
      param = myblock.param


  /* --------------控制器--------------- */
  var cmd = (function command (targ) {
    var cmdMap = {
      // 移动一格
      'GO': function () {
        targ.move()
      },
      // 转向
      'TUN LEF': function () {
        targ.turn(-90)
      },
      'TUN RIG': function () {
        targ.turn(90)
      },
      'TUN BAC': function () {
        targ.turn(180)
      },
      // 不转向移动
      'TRA TOP': function () {
        targ.moveTo(0)
      },
      'TRA BOT': function () {
        targ.moveTo(180)
      },
      'TRA LEF': function () {
        targ.moveTo(270)
      },
      'TRA RIG': function () {
        targ.moveTo(90)
      },
      // 转向移动
      'MOV TOP': function () {
        targ.turnTo(0)
        targ.move()
      },
      'MOV BOT': function () {
        targ.turnTo(180)
        targ.move()
      },
      'MOV LEF': function () {
        targ.turnTo(270)
        targ.move()
      },
      'MOV RIG': function () {
        targ.turnTo(90)
        targ.move()
      }
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

        return true
      } else {
        return false
      }
    }

    // 执行
    return function cmdRun (cmd) {
      // 如果指令存在
      if ( cmdMap[cmd] ) {
        cmdMap[cmd]()
        // 如果撞墙
        if ( analysis() ) {
          console.log('wall!')

          return false
        }

        return true
      } else {
        console.log('wrong command!')

        return false
      }
    }
  })(myblock)


  /* ---------------渲染-------------- */
  var render = creatRender(myblock)

  /* -----------------controller----------------- */
  var addToQueue = creatQueue()

  function befoExec (eText) {
    return function () {
      if ( cmd(eText) ) {
        render()

        param.record.x = param.x
        param.record.y = param.y
        param.record.deg = param.deg
      }
    }
  }

  function execute () {
    var eText = $('command').value

    addToQueue(befoExec(eText))
  }

  // 初始化界面
  var init = (function () {
    render()
    creatText($('leftNum'), $('command'))
  })()

  // 绑定按钮
  $('executeBtn').addEventListener('click', execute)

})
