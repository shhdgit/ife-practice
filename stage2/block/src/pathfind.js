var Node = {
  init: function ( x, y, now, end ) {
    var g = Math.abs( now.x - x ) + Math.abs( now.y - y )

    this.x = x
    this.y = y
    this.f = g + h
  }
}

var AStar = {
  init: function ( start, end ) {
    this.openList = [ start ]
    this.record = []

    function boot () {

    }

  },
}

function getPath ( start, end, algo ) {
  algo = Object.create(algo)

  algo.init( start, end )

  return algo.record
}
