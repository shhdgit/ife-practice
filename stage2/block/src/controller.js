$(function () {
  var myblock = new singleCmdBlock($('myblock'), 50),
      ele = myblock.ele,
      param = myblock.param


  /* --------------控制器--------------- */
  var cmd = (function command (targ) {
    var cmdMap = {
      'GO': function () {
        targ.move()
      },
      'TUN LEF': function () {
        targ.turn(-90)
      },
      'TUN RIG': function () {
        targ.turn(90)
      },
      'TUN BAC': function () {
        targ.turn(180)
      },
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
    }

    // 可移区域分析
    function analysis (cmd) {
      var reg = analysis.reg[cmd]

      if (reg) {
        return !reg()
      } else {
        return true
      }
    }
    // 移动限制
    analysis.reg = {
      'GO': function () {
        return (0 === param.x && 270 === param.deg) || (9 === param.x && 90 === param.deg) || (0 === param.y && 0 === param.deg) || (9 === param.y && 180 === param.deg)
      },
    }

    // 执行
    return function cmdRun (cmd) {
      if ( cmdMap[cmd] && analysis(cmd) ) {
        cmdMap[cmd]()
        return true
      } else {
        console.log('wrong command or its wall!')
        return false
      }
    }
  })(myblock)


  /* ---------------渲染-------------- */
  // function render () {
  //   var timer,
  //   now

  //   function calcu (start, term) {}

  //   return function animate (ele, attr, interv) {
  //     if ( !timer ) {
  //       timer = setInterval(function () {
  //         ele.style[attr] = ''
  //       }, interv || 16.666)
  //     }
  //   }
  // }

  function render () {
    ele.style.border = '0'

    ele.style.top = (param.y * param.speed) + 'px'
    ele.style.left = (param.x * param.speed) + 'px'
    switch (param.deg) {
      case 0:
        ele.style.borderTop = '10px solid blue'
        break
      case 180:
        ele.style.borderBottom = '10px solid blue'
        break
      case 270:
        ele.style.borderLeft = '10px solid blue'
        break
      case 90:
        ele.style.borderRight = '10px solid blue'
        break
      default:
        console.log('error')
    }
  }


  /* -----------------controller----------------- */
  function execute () {
    var eText = $('command').value

    if ( cmd(eText) ) render()
  }

  // 初始化界面
  var init = (function () {
    render()
  })()

  // 绑定按钮
  $('executeBtn').addEventListener('click', execute)

})
