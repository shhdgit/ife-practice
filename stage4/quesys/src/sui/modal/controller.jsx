const React = require( 'react' )
const ReactDOM = require( 'react-dom' )

const Modal = require( './modal.jsx' )

function ModalCons ( dom, configs ) {
  var _this = this
  
  function createDOM () {
    const modal = ReactDOM.render(
      <div onClick={_this.toggle.bind( _this )}>
        <Modal config={configs} />
      </div>,
      dom
    )
    
    return modal
  }
  
  this.dom = createDOM()
  this.configs = configs
  this.flag = 1
}

ModalCons.prototype.toggle = function () {
  if ( this.configs.enable ) {
    if ( !this.flag ) {
      this.dom.style.display = 'block'
    } else {
      this.dom.style.display = 'none'
    }
    
    this.flag = !this.flag
  } else {
    alert( this.configs.content )
  }
}

function init ( id, config ) {
  let prop, modal
  const dom = document.querySelector( id )
  
  const configs = {
    enable: true,
    mask: .6,
    content: dom.innerText,
    title: dom.dataset.title
  }
  
  for ( prop in config ) {
    if ( configs[ prop ] ) configs[ prop ] = config[ prop ]
  }
  
  
  modal = new ModalCons( dom, configs )
  modal.toggle()
  
  return modal
}

module.exports = {
  init: init
}