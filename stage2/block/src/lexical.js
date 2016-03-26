/**
 * 指令分析
 * @param  {String} command 输入指令
 * @param  {Object} cmdList 指令列表
 * @return {function,String}         指令,附带信息
 */
function lexical (command, cmdList) {
  var cmd = command.split(' ')

  var tmp = cmdList,
      texttmp, i, n, isNum

  for (i = 0, n = cmd.length; i < n; i++) {
    texttmp = cmd.shift()
    isNum = /\d+/gi.test(texttmp) && !/\D+/gi.test(texttmp)

    if (!isNum) {
      tmp = tmp[texttmp]
    } else {
      return {
        func: tmp,
        other: texttmp
      }
    }

    if ( 'function' === typeof tmp ) {
      texttmp = cmd.shift()

      return {
        func: tmp,
        other: texttmp
      }
    } else if ( 'function' !== typeof tmp && tmp ) {
      console.log('continue')
    } else {
      console.log('wrong command')
    }
  }

  return {
    func: undefined,
    other: undefined
  }
}
