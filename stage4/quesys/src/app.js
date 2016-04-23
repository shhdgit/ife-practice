const sui = require( './sui/api' )

const modalbtn = document.querySelector( '#modalbtn' )

const mymodal = sui.modal.init( '#reacttest' )

modalbtn.addEventListener( 'click', function () {
  mymodal.toggle()
} )
