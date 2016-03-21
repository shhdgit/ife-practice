$(function () {
  var myblock = new singleCmdBlock($('myblock'), 50),
  ele = myblock.ele,
  param = myblock.param,
  command = {
    move: function () {
      myblock.move()
    },
    turn: function (deg) {
      myblock.turn(deg)
    },
    turnTo: function (orien) {
      myblock.turnTo(orien)
    },
  }

  // 渲染方块
  var render = function () {
    ele.style.border = '0'

    ele.style.top = (param.y * param.speed) + 'px'
    ele.style.left = (param.x * param.speed) + 'px'
    switch (param.head) {
      case 'top':
        ele.style.borderTop = '10px solid blue'
        break
      case 'bottom':
        ele.style.borderBottom = '10px solid blue'
        break
      case 'left':
        ele.style.borderLeft = '10px solid blue'
        break
      case 'right':
        ele.style.borderRight = '10px solid blue'
        break
      default:
        console.log('error')
    }
  }

  // 撞墙判断
  var isInRange = function () {
    return (0 === param.x && 'left' === param.head) || (9 === param.x && 'right' === param.head) || (0 === param.y && 'top' === param.head) || (9 === param.y && 'bottom' === param.head)
  }

  var execute = (function () {
    var cmdMap = {
      'GO': function () {
        if (!isInRange()) {
          command.move()
        } else {
          console.log('wall!')
        }
      },
      'TUN LEF': function () {
        command.turn(-90)
      },
      'TUN RIG': function () {
        command.turn(90)
      },
      'TUN BAC': function () {
        command.turn(180)
      }
    }

    return function () {
      var eText = $('command').value

      if (cmdMap[eText]) {
        cmdMap[eText]()
        render()
      } else {
        console.log('WRONG CMD!')
      }
    }
  })()

  // 初始化界面
  var init = (function () {
    render()
  })()

  // 绑定按钮
  $('executeBtn').addEventListener('click', execute)


})
