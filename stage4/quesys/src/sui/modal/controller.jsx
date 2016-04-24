const React = require( 'react' )
const ReactDOM = require( 'react-dom' )

const Modal = require( './modal.jsx' )

function ModalCons ( dom, config ) {
  function createDom () {
    const modal = ReactDOM.render(
      <Modal config={config} />,
      dom
    )

    return modal
  }

  this.reactDom = createDom()
  this.config = config
}

ModalCons.prototype.toggle = function () {
  if ( this.config.enable ) {
    this.reactDom.toggle()
  } else {
    alert( this.config.content )
  }
}

function init ( id, config ) {
  let prop, modal
  const dom = document.querySelector( id )

  const defConf = {
    enable: true,
    mask: .6,
    content: dom.innerText,
    title: dom.dataset.title,
    modalstyle: 'comfirm'
  }

  for ( prop in config ) {
    if ( defConf[ prop ] ) defConf[ prop ] = config[ prop ]
  }


  modal = new ModalCons( dom, defConf )

  return modal
}

module.exports = {
  init: init
}