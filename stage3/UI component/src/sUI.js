+function (w) {
  var sUI = function () {
    /* ******************************模态框****************************** */
    var modal = {
      init: function ( id, opts ) {
        var opt
        var dom = document.getElementById( id ),
            modalBody = dom.querySelector( '#modal-body' ),

            options = {
              enable: true,
              mask: .6,
              content: modalBody.dataset.content
            }
        // 更改配置项
        if ( opts ) {
          for ( opt in opts ) {
            options[ opt ] = opts[ opt ]
          }
        }

        // new Modal
        var newmodal = new construct.Modal( dom, options )

        // 为modal dom添加特性
        /**
         * 点击header移动模态框
         * @return {undefined} [description]
         */
        function headerFn () {
          var oldDomX, oldDomY, oldMouseX, oldMouseY
          var header = dom.querySelector( '#modal-header' ),
              content = dom.querySelector( '#modal-content' )

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
          var dialog = dom.querySelector( '#modal-dialog' )

          function modalhide () {
            this.hide()
          }

          dialog.setAttribute( 'style', 'background:rgba(0, 0, 0, ' + this.options.mask + ')' )
          dialog.addEventListener( 'click', modalhide.bind( this ) )
        }

        headerFn()
        dialogFn.call( newmodal )

        // 阻止冒泡、捕获
        dom.querySelector( '#modal-content' ).addEventListener( 'click', function (e) {
          e.stopPropagation()
        } )

        return newmodal
      }
    }

    /* ******************************表格****************************** */
    var form = {
      init: function ( id, opts ) {
        var opt
        var dom = document.getElementById( id ),
            formHeader = dom.querySelector( '#form-header' ),
            formBody = dom.querySelector( '#form-body' ),

            options = {
              enableline: 'all',
              sort: function sort () {},
            }
        // 更改配置项
        if ( opts ) {
          for ( opt in opts ) {
            options[ opt ] = opts[ opt ]
          }
        }

        var newform = new construct.Form( dom, options )

        /**
         * 冻结首行
         * @return {undefined} [description]
         */
        function fFrozen () {
          var domTop = dom.offsetTop,
              oWindowTop = domTop

          w.addEventListener( 'scroll', function () {
            var windowTop = w.scrollY,
                headerCss = formHeader.style.position,
                isInForm = windowTop > domTop && windowTop < domTop + dom.clientHeight

            if ( isInForm && 'fiex' !== headerCss ) {
              formHeader.setAttribute( 'style', 'position:fixed;top:0;')
            } else if ( !isInForm && 'relative' !== headerCss ) {
              formHeader.setAttribute( 'style', 'position:relative;')
            }
          } )
        }

        fFrozen()

        newform.initData()

        return newform
      }
    }

    /* ******************************构造函数****************************** */
    var construct = {
      // Modal
      Modal: function Modal ( dom, options ) {
        this.dom = dom
        this.options = options

        // ************************** Modal's prototype **************************
        if ( 'function' !== typeof this.show ) {
          Modal.prototype.show = function () {
            if ( this.options.enable ) {
              this.dom.setAttribute( 'style', 'display:block;')

              // 阻止滚动
              // this.dom.addEventListener( 'mousewheel', function ( e ) {
              //   e.preventDefault()
              // } )

              // 隐藏滚动条即可阻止滚动
              document.documentElement.style.overflowY = 'hidden'
            } else {
              alert( this.options.content )
            }
          }

          Modal.prototype.hide = function () {
            this.dom.setAttribute( 'style', 'display:none;' )

            // 显示滚动条
            document.documentElement.style.overflowY = 'auto'
          }
        }
      },

      // Form
      Form: function Form ( dom, options ) {
        this.dom = dom
        this.options = options
        this.data = []

        // ************************** Form's prototype **************************
        if ( 'function' !== typeof this.initData ) {
          Form.prototype.initData = function () {
            var i
            var enableline = this.options.enableline.split( ',' ),
                formHeader = this.dom.querySelectorAll( '#form-header th' ),
                headerLen = formHeader.length,
                formBody = this.dom.querySelectorAll( '#form-body tr' ),
                bodyLen = formBody.length,
                data = this.data

            /**
             * 获取第index行的数据
             * @param  {number} index 第几行
             * @return {undefined}       [description]
             */
            function oneLineData ( index ) {
              var i, tmpNode

              data[ index ] = []

              for ( i = 0; i < bodyLen; i++ ) {
                tmpNode = formBody[ i ].querySelectorAll( 'td' )[ index ]

                data[ index ].push({
                  data: tmpNode.innerText,
                  parent: tmpNode.parentNode
                })
              }
            }


            if ( 'all' === enableline[0] ) {
              for ( i = 0; i < headerLen; i++ ) {
                oneLineData( i )
              }
            }
          }
        }
      },

    }

    return {
      modal: modal,
      form: form,
    }
  }()

  w['sUI'] = sUI
}( window )
