sUI = {
  /* ---------------------------- 模态框 ------------------------------ */
  modal: {
    init: function ( id, opts ) {
      var opt
      var dom = $( id ),
          options = {
        enable: true,
        mask: .6,
        title: dom.querySelector( '.modal-header' ).dataset.title,
        content: dom.querySelector( '.modal-body' ).dataset.content
      }

      // 更改配置项
      if ( opts ) {
        for ( opt in opts ) {
          options[ opt ] = opts[ opt ]
        }
      }

      var modal = new sUI.construct.Modal( dom, options )

      return modal
    }
  },


  /* ---------------------------- 构造函数 ------------------------------ */
  construct: {
    Modal: function Modal ( dom, options ) {
      this.dom = dom
      this.options = options

      dom.querySelector( '.modal-content' ).addEventListener( 'click', function (e) {
        e.stopPropagation()
      } )

      /**
       * 点击header移动模块狂
       * @return {undefined} [description]
       */
      function headerFn () {
        var oldDomX, oldDomY, oldMouseX, oldMouseY
        var header = dom.querySelector( '.modal-header' ),
            content = dom.querySelector( '.modal-content' )

        function movable ( event ) {
          var dX = event.clientX - oldMouseX,
              dY = event.clientY - oldMouseY

          content.style.left = oldDomX + dX + 'px'
          content.style.top = oldDomY + dY + 'px'
        }

        header.addEventListener( 'mousedown', function ( e ) {
          oldDomX = content.offsetLeft
          oldDomY = content.offsetTop
          oldMouseX = e.clientX
          oldMouseY = e.clientY

          header.addEventListener( 'mousemove', movable )
        } )

        header.addEventListener( 'mouseup', function () {
          header.removeEventListener( 'mousemove', movable )
        } )

        header.addEventListener( 'mouseout', function () {
          header.removeEventListener( 'mousemove', movable )
        } )
      }

      /**
       * 遮罩层
       * @return {undefined} [description]
       */
      function dialogFn () {
        var dialog = dom.querySelector( '.modal-dialog' )

        function modalhide () {
          this.hide()
        }

        dialog.setAttribute( 'style', 'background:rgba(0, 0, 0, ' + this.options.mask + ')' )
        dialog.addEventListener( 'click', modalhide.bind( this ) )
      }

      headerFn()
      dialogFn.call( this )

      // ************************** Modal's prototype **************************
      if ( 'function' !== typeof this.show ) {
        Modal.prototype.show = function () {
          if ( this.options.enable ) {
            this.dom.setAttribute( 'style', 'display:block;')
          } else {
            alert( this.options.title + ':' + this.options.content + '!' )
          }
        }

        Modal.prototype.hide = function () {
          this.dom.setAttribute( 'style', 'display:none;' )
        }
      }

    }
  }
}
