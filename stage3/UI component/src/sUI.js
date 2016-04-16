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
              algo: function ( arr ) {
                var i, j, sortLen, temp
                var sorted = [],
                    arrLen = arr.length

                sorted.push( arr[0] )

                for ( i = 1; i < arrLen; i++ ) {
                  temp = sorted.some( function ( item, j ) {
                    if ( item.data > arr[ i ].data ) {
                      sorted.splice( j, 0, arr[ i ] )

                      return true
                    } else {
                      return false
                    }
                  } )

                  if ( !temp ) sorted.push( arr[ i ] )
                }

                return sorted
              },
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

        /**
         * 数据初始化
         * @return {undefined} [description]
         */
        function initData () {
          var i
          var enableline = options.enableline.split( ',' ),
              formHeader = dom.querySelectorAll( '#form-header th' ),
              formBody = dom.querySelectorAll( '#form-body tr' ),
              enableLen = enableline.length,
              headerLen = formHeader.length,
              bodyLen = formBody.length,
              data = this.data,
              that = this

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
                data: parseInt(tmpNode.innerText),
                parent: tmpNode.parentNode
              })
            }
          }

          function initHelper ( config, fn ) {
            var i
            var length = 1 === config ? headerLen : enableLen

            for ( i = 0; i < length; i++ ) {
              fn( i )
            }
          }

          if ( 'all' === enableline[0] ) {
            initHelper( 1, function ( i ) {
              oneLineData( i )
              formHeader[ i ].style.backgroundColor = 'red'
              formHeader[ i ].addEventListener( 'click', function () {
                that.formsort( data[ enableline[ i ] ], enableline[ i ] )
              } )
            } )
          } else {
            initHelper( 0, function ( i ) {
              oneLineData( enableline[ i ] )
              formHeader[ enableline[ i ] ].setAttribute( 'style', 'background-color:red;cursor:pointer;' )
              formHeader[ enableline[ i ] ].addEventListener( 'click', function () {
                that.formsort( data[ enableline[ i ] ], enableline[ i ] )
              } )
            } )
          }
        }

        fFrozen()
        initData.call( newform )

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
        this.order = NaN

        // ************************** Form's prototype **************************
        if ( 'function' !== typeof this.formsort ) {
          Form.prototype.formsort = function () {
            var neworder

            return function ( data, line ) {
              var i, newoLen
              var tmpHtml = '',
                  formbody = this.dom.querySelector( '#form-body' )

              if ( line !== this.order ) {
                neworder = this.options.algo( data )
                newoLen = neworder.length

                this.order = line

                for ( i = 0; i < newoLen; i++ ) {
                  tmpHtml += neworder[ i ].parent.outerHTML
                }

                formbody.innerHTML = tmpHtml
              } else {
                neworder.reverse()
                newoLen = neworder.length

                for ( i = 0; i < newoLen; i++ ) {
                  tmpHtml += neworder[ i ].parent.outerHTML
                }

                formbody.innerHTML = tmpHtml
              }
            }
          }()
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
