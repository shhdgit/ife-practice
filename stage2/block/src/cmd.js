function creatText (list, text) {
  text.addEventListener('keydown', function () {


    setTimeout(function () {
      console.log(text.value)
    }, 0)
  })
}
