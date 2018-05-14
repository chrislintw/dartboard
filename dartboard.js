$(function(){ 
  
  // functions
  var getX = (x, radius, angle) => x + radius * Math.cos(angle * Math.PI / 180)
  var getY = (y, radius, angle) => y - radius * Math.sin(angle * Math.PI / 180)
  var svg =  $('svg');
  var startAngle = 9;
  var radii = [20, 130, 150, 220, 240]
  var points = [13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6]
  var centre = { x: 270, y: 270 }
  var getPoints = angle => {
    return $.map(radii, radius => {
      return {
        x: getX(centre.x, radius, angle),
        y: getY(centre.y, radius, angle)
      }
    })
  }
  var lastPoints = getPoints(startAngle)
  $.each(points,(i, p) => {
    var deg = 18 * (i+1) + startAngle;
    var newPoints = getPoints(deg);
    // == Draw
    text = $('<text>')
    text.html(p).attr({
      x: getX(centre.x, 260, deg - 9),
      y: getY(centre.x, 258, deg - 9)
    })
    svg.append(text)
    for(j= 0; j < 4;j++){
      var path = $('<path>')
      var klass = i % 2 == 0 ? "black" : "white"
      var rate = 1
      if (j === 1) {
        rate = 3
        klass = i % 2 == 0 ? "red" : "green"
      } 
      if (j === 3) {
        rate = 2
        klass = i % 2 == 0 ? "red" : "green"
      }
      path.attr({
        'data-point': p*rate,
        class: klass,
        d: "M "+lastPoints[j].x+","+lastPoints[j].y+" A "+radii[j]+","+radii[j]+" 0 0,0 "+newPoints[j].x+","+newPoints[j].y+" L "+newPoints[j+1].x+","+newPoints[j+1].y+" A "+radii[j+1]+","+radii[j+1]+" 0 0,1 "+lastPoints[j+1].x+","+lastPoints[j+1].y +" Z"
      })
      svg.append(path)
    }
    lastPoints = newPoints
  })
  var bulls_eye = $('<circle>').attr({
    class: 'red',
    cx: centre.x,
    cy: centre.y,
    r: 9,
    "data-point": 50
  })
  var outer_bull = $('<circle>').attr({
    class: 'green',
    cx: centre.x,
    cy: centre.y,
    r: 20,
    'data-point': 25
  })
  svg.append(outer_bull)
  svg.append(bulls_eye)
  // events
  svg.on('click', 'path, circle', e => $('#point').html($(e.currentTarget).data('point')))
  // render
  svg.html(svg.html())
  
});