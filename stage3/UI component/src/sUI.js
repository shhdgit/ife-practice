+function (w) {
  sUI = {
    modal: {
      init: function ( id, opts ) {
        var opt
        var dom = document.getElementById( id ),
            options = {
          enable: true,
          mask: .6,
          content: dom.querySelector( '.modal-body' ).dataset.content
        }

        // 更改配置项
        if ( opts ) {
          for ( opt in opts ) {
            options[ opt ] = opts[ opt ]
          }
        }

        // new Modal
        var modal = new sUI.construct.Modal( dom, options )

        // 为modal dom添加特性
        /**
         * 点击header移动模态框
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
        dialogFn.call( modal )

        // 阻止冒泡、捕获
        dom.querySelector( '.modal-content' ).addEventListener( 'click', function (e) {
          e.stopPropagation()
        } )

        return modal
      }
    },

    form: {
      init: function ( id, opts ) {
        var opt
        var dom = document.getElementById( id ),
            options = {}

        // 更改配置项
        if ( opts ) {
          for ( opt in opts ) {
            options[ opt ] = opts[ opt ]
          }
        }
      }
    },

    construct: {
      // Modal
      Modal: function Modal ( dom, options ) {
        this.dom = dom
        this.options = options

        // ************************** Modal's prototype **************************
        if ( 'function' !== typeof this.show ) {
          Modal.prototype.show = function () {
            if ( this.options.enable ) {
              this.dom.setAttribute( 'style', 'display:block;')
            } else {
              alert( this.options.content )
            }
          }

          Modal.prototype.hide = function () {
            this.dom.setAttribute( 'style', 'display:none;' )
          }
        }
      },

      // Form
      Form: function Form ( dom, options ) {
        this.dom = dom
        this.options = options

        // ************************** Form's prototype **************************
        if ( 'function' !== typeof this.show ) {}
      },

    }
  }

  w['sUI'] = sUI
}( window )
