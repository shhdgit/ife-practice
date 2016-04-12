$(function () {
  var modal = sUI.modal.init( 'modal' )

  $( 'btn' ).addEventListener( 'click', function () {
    modal.show()
  } )
  $( 'cancel' ).addEventListener( 'click', function () {
    modal.hide()
  } )
  $( 'confirm' ).addEventListener( 'click', function () {
    modal.hide()
  } )
})
