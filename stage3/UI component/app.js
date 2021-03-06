$(function () {
  // modal
  var useUI = $( 'useSUI' ),
      modalBtn = $( 'modalBtn' ),
      modalCancel = $( 'modalCancel' ),
      modalConfirm = $( 'modalConfirm' )

  var modal = sUI.modal.init( 'modal', {
    enable: useUI.checked
  } )

  useUI.addEventListener( 'click', function () {
    modal.options.enable = $( 'useSUI' ).checked
  } )

  modalBtn.addEventListener( 'click', function () {
    modal.show()
  } )

  modalCancel.addEventListener( 'click', function () {
    modal.hide()
  } )

  modalConfirm.addEventListener( 'click', function () {
    modal.hide()
  } )

  // form
  var form = sUI.form.init( 'form', {
    enableline: '1,2,3,4'
  } )
})
