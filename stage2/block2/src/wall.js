var Wall = {
  parent: $('wall'),

  /**
   * 新建一堵墙
   * @param  {Number} x [description]
   * @param  {Number} y [description]
   * @return {Object}   对应的dom元素
   */
  createAt: function (x, y) {
    this.x = x
    this.y = y
    this.id = y * 10 + x

    return this.addWall(x, y)
  },

  addWall: function (x, y) {
    var wall = document.createElement('div')

    wall.setAttribute('style', 'position:absolute;background-color:#eee;top:' + y * 50 + 'px;left:' + x * 50 + 'px;')
    this.parent.appendChild(wall)

    return wall
  },
}
