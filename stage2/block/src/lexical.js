/**
 * 指令分析
 * @param  {String} command 输入指令
 * @param  {Object} cmdList 指令列表
 * @return {function,String}         指令,附带信息
 */
function lexical (command, cmdList, line) {
  var cmd = command.split(' ')

  var tmp = cmdList,
      tmptext, i, n

  var isNum = function (text) {
    return /\d+/gi.test(text) && !/\D+/gi.test(text)
  }

  var returnFalse = function () {
  }

  for (i = 0, n = cmd.length; i < n; i++) {
    tmptext = cmd.shift()
    tmp = tmp[ tmptext ]

    if ( 'function' === typeof tmp ) {
      tmptext = cmd.shift()

      // 数字之后还有无指令
      if ( !( 0 === cmd.length ) ) {
        break
      // 如果为粉刷墙
      } else if ( '' !== tmp.name ) {
        return {
          func: tmp,
          argument: tmptext
        }
      // 为数字或无字符则返回
      } else if ( isNum( tmptext ) || !tmptext ) {
        return {
          func: tmp,
          times: tmptext
        }
      }
    } else if ( undefined === tmp ) {
      console.log( 'wrong command: line ' + ( parseInt( line ) + 1 ) )
      return {
        func: undefined,
        times: undefined,
        line: line
      }
    }
  }
  console.log( 'wrong command: line ' + ( parseInt( line ) + 1 ) )
  return {
    func: undefined,
    times: undefined,
    line: line
  }
}
