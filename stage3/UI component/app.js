$(function () {
  var modal = sUI.modal.init( 'modal' )

  $( 'useSUI' ).addEventListener( 'click', function () {
    modal.options.enable = $( 'useSUI' ).checked
  } )

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
