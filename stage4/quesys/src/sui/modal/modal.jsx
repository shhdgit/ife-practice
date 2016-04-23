const React = require( 'react' )

const ModalHeader = React.createClass({
  drag: function () {
    let oldX, oldY, odomX, odomY, modal
    
    function mouseMove ( e ) {
      let dX = event.clientX - oldX,
          dY = event.clientY - oldY
      
      modal.style.left = odomX + dX + 'px'
      modal.style.top = odomY + dY + 'px'
    }
    
    return {
      down: function ( e ) {
        if ( !modal ) modal = document.querySelector( '.sui-modal-dialog' )
        
        oldX = e.clientX
        oldY = e.clientY
        odomX = modal.offsetLeft
        odomY = modal.offsetTop
        
        document.addEventListener( 'mousemove', mouseMove )
      },
      up: function ( e ) {
        document.removeEventListener( 'mousemove', mouseMove )
      }
    }
  }(),
  render: function () {
    return (
      <header onMouseDown={this.drag.down} onMouseUp={this.drag.up} className="sui-modal-header">
        <p>{this.props.title}</p>
      </header>
    )
  }
})

const ModalDialog = React.createClass({
  stopPropagation: function ( e ) {
    e.stopPropagation()
  },
  render: function () {    
    return (
      <div className="sui-modal-dialog" onClick={this.stopPropagation}>
        <ModalHeader title={this.props.config.title} />
        <div className="sui-modal-body">{this.props.config.content}</div>
      </div>
    )
  }
})

const Modal = React.createClass({
  render: function () {
    return (
      <div id="sui-modal" className="sui-modal">
        <ModalDialog config={this.props.config} />
      </div>
    )
  }
})

module.exports = Modal