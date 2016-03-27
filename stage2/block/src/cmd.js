function creatText () {
  var textval,
      leftbar = [].shift.call(arguments),
      lineRecord = 1

  function renderTArea () {
    textval = this.value.split('\n')

    // 行数有变化则重新渲染
    if (lineRecord !== textval.length) {
      leftbar.innerHTML = '<li>1</li>'

      for (var i = 1; i < textval.length; i++) {
        var li = document.createElement('li')
        li.innerHTML = i + 1
        leftbar.appendChild(li)
      }

      // 行数大于10时,调整textarea大小
      if ( 10 < textval.length ) {
        this.style.height = textval.length * 20 + 5 + 'px'
        leftbar.style.height = textval.length * 20 + 10 + 'px'
      } else {
        this.style.height = '205px'
        leftbar.style.height = '100%'
      }

      lineRecord = textval.length
    }
  }

  this.addEventListener('keydown', function (event) {
    setTimeout(renderTArea.bind(this), 0)
  })

  return function () {
    return textval
  }
}
