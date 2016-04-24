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

const ModalFooter = React.createClass({
  clickHandle: function () {
    return {
      modaltog: this.props.modaltog
    }
  },
  render: function () {
    return (
      <footer className="sui-modal-footer">
        <ModalFooterBtn modalstyle={this.props.modalstyle} clickHandle={this.clickHandle()}></ModalFooterBtn>
      </footer>
    )
  }
})

const ModalFooterBtn = React.createClass({
  btnClass: {
    comfirm: function () {
      return (
        <button onClick={this.props.clickHandle.modaltog}>确认</button>
      )
    },
  },
  render: function () {
    return (
      this.btnClass[ this.props.modalstyle ].call( this )
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
        <ModalFooter modalstyle={this.props.config.modalstyle} modaltog={this.props.modaltog}></ModalFooter>
      </div>
    )
  }
})

const Modal = React.createClass({
  getInitialState: function () {
    return {
      display: 'block'
    }
  },
  toggle: function () {
    if ( 'block' !== this.state.display ) {
      this.setState({
        display: 'block'
      })
    } else {
      this.setState({
        display: 'none'
      })
    }
  },
  getCss: function () {
    return {
      display: this.state.display,
      backgroundColor: 'rgba(0,0,0,' + this.props.config.mask + ')'
    }
  },
  render: function () {
    return (
      <div id="sui-modal" className="sui-modal" style={this.getCss()} onClick={this.toggle}>
        <ModalDialog config={this.props.config} modaltog={this.toggle} />
      </div>
    )
  }
})

module.exports = Modal