$(function(){ 
  
  // functions
  var getX = (x, radius, angle) => {
    return x + radius * Math.cos(angle * Math.PI / 180)
  }
  var getY = (y, radius, angle) => {
    return y - radius * Math.sin(angle * Math.PI / 180)
  }
  var svg =  $('svg');
  var startAngle = 9;
  var radii = [20, 130, 150, 220, 240]
  var points = [13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6]
  var centre = { x: 270, y: 270 }
  var getPoints = (angle) => {
    return $.map(radii, (radius) => {
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
    text.html(p)
    text.attr('x', getX(centre.x, 260, deg- 9)) 
    text.attr('y', getY(centre.x, 258, deg- 9))
    svg.append(text)
    
    for(j= 0; j < 4;j++){
      var colour = i % 2 == 0 ? "#222" : "#EEE"
      var path = $('<path>')
      var rate = 1
      if (j === 1) {
        rate = 3
        colour = i % 2 == 0 ? "#F22" : "#0f9606"
      } 
      if (j === 3) {
        rate = 2
        colour = i % 2 == 0 ? "#F22" : "#0f9606"
      }
      path.attr('data-point', p * rate)
      path.attr('style', "fill:"+ colour+"; stroke:#C0C0C0; stroke-width:2;")
      path.attr('d',"M "+lastPoints[j].x+","+lastPoints[j].y+" A "+radii[j]+","+radii[j]+" 0 0,0 "+newPoints[j].x+","+newPoints[j].y+" L "+newPoints[j+1].x+","+newPoints[j+1].y+" A "+radii[j+1]+","+radii[j+1]+" 0 0,1 "+lastPoints[j+1].x+","+lastPoints[j+1].y +" Z")
      svg.append(path)
      
    }
    // ==
    lastPoints = newPoints
  })
  var bulls_eye = $('<circle>').attr({
    style: 'fill:#F22; stroke:#C0C0C0; stroke-width:1;',
    cx: centre.x,
    cy: centre.y,
    r: 9
  })
  bulls_eye.attr('data-point', 50)
  var outer_bull = $('<circle>').attr({
    style: 'fill:#0f9606; stroke:#C0C0C0; stroke-width:1;',
    cx: centre.x,
    cy: centre.y,
    r: 20
  })
  outer_bull.attr('data-point', 25)
  
  svg.append(outer_bull)
  svg.append(bulls_eye)
  // events
  $('svg').on('click', 'path, circle',(e) =>{
    $('#point').html($(e.currentTarget).data('point'))
  })
  // render
  $('svg').html(svg.html())
  
});