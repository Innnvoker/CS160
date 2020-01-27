var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' + 
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

function main() {
  var canvas = document.getElementById('webgl');
  var clearButton = document.getElementById('clearButton');
  var squareButton = document.getElementById('squares');
  var triangleButton = document.getElementById('triangles');
  var circleButton = document.getElementById('circles');
  var shapeRange = document.getElementById('shapeRange');
  var segmentRange = document.getElementById('segmentRange');
  var close = document.getElementById('close');
  var mediam = document.getElementById('mediam');
  var farAway = document.getElementById('farAway');
  var red = document.getElementById('redRange');
  var green = document.getElementById('greenRange');
  var blue = document.getElementById('blueRange');
  var transparent = document.getElementById('transparentRange');

  var shape = 4;
  
  clearButton.onclick = function(ev) {
    tri_points = [];
    sqr_points = [];
    cir_points = [];
    circle_shape = [];
    tri_color = [];
    sqr_color = [];
    cir_color = [];

    vec = [0, 0];
    count = [0, 0, 0];
    drawShapes(gl, a_Position, a_Color, vec[0], vec[1]);
  }

  triangleButton.onclick = function(ev) {
    shape = 3;
  }
  squareButton.onclick = function(ev) {
    shape = 4;
  }
  circleButton.onclick = function(ev) {
    shape = 5;
  }

  close.onclick = function(ev) {
    speed = 1;
  }
  mediam.onclick = function(ev) {
    speed = 5;
  }
  farAway.onclick = function(ev) {
    speed = 10;
  }

  shapeRange.onmouseup = function(ev) {
    pointSize = shapeRange.value / 70;
  }

  segmentRange.onmouseup = function(ev) {
    seCount = (Math.round(segmentRange.value / 20) + 1) * 3;
  }

  red.onmouseup = function(ev) {
    colorRed = (Math.round(red.value/10)/10);
  }
  green.onmouseup = function(ev) {
    colorGreen = (Math.round(green.value/10)/10);
  }
  blue.onmouseup = function(ev) {
    colorBlue = (Math.round(blue.value/10)/10);
  }
  transparent.onmouseup = function(ev) {
    transParent = (Math.round(transparent.value/10)/10);
  }

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (!a_Color) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  canvas.onmousedown = function(ev) {
    mouse_press = true;
    vec = makeShapes(ev, canvas, shape); //the float32array containing all vertices
    drawShapes(gl, a_Position, a_Color, vec[0], vec[1]);
  }

  canvas.onmouseup = function(ev) {
    mouse_press = false;
  }

  canvas.onmouseout = function(ev) {
    mouse_press = false;
  }

  canvas.onmousemove = function(ev) {
    if (mouse_press == true) {
      var d = new Date();
      if (d.getMilliseconds() % speed == 0) {
        vec = makeShapes(ev, canvas, shape); //the float32array containing all vertices
        drawShapes(gl, a_Position, a_Color, vec[0], vec[1]);
      }
    }
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var tri_points = [];
var sqr_points = [];
var cir_points = [];
var circle_shape = [];
var tri_color = [];
var sqr_color = [];
var cir_color = [];
var pointSize = 1;
var seCount = 12;
var count = [0, 0, 0];
var mouse_press = false;
var speed = 1;
var colorRed = 0.5;
var colorGreen = 0.5;
var colorBlue = 0.5;
var transParent = 1;

function makeShapes(ev, canvas, shape) {
 
  if (shape == 3) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
    var val = 0.2;  //size of the shape
    var point1 = [x, y + val* pointSize]
    var point2 = [x - Math.sqrt(3) * val * pointSize/2, y - val * pointSize/2]
    var point3 = [x + Math.sqrt(3) * val * pointSize/2, y - val * pointSize/2]
    tri_points.push(point1[0]); tri_points.push(point1[1]);
    tri_points.push(point2[0]); tri_points.push(point2[1]);
    tri_points.push(point3[0]); tri_points.push(point3[1]);
    for (var i = 0; i < 3; i++) {
      addColor(tri_color);
    }
    count[0] += 1;
  }

  else if (shape == 4) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
    var val = 0.2;  //size of the shape
    var point1 = [x - val* pointSize, y + val* pointSize];
    var point2 = [x - val* pointSize, y - val* pointSize];
    var point3 = [x + val* pointSize, y + val* pointSize];
    var point4 = [x + val* pointSize, y - val* pointSize];
    sqr_points.push(point1[0]); sqr_points.push(point1[1]);
    sqr_points.push(point2[0]); sqr_points.push(point2[1]);
    sqr_points.push(point3[0]); sqr_points.push(point3[1]);
    sqr_points.push(point3[0]); sqr_points.push(point3[1]);
    sqr_points.push(point2[0]); sqr_points.push(point2[1]);
    sqr_points.push(point4[0]); sqr_points.push(point4[1]);
    for (var i = 0; i < 6; i++) {
      addColor(sqr_color);
    }
    count[1] += 1; 
  }

  else if (shape == 5) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
    cir_points.push(x);
    cir_points.push(y);
    addColor(cir_color);
    
    var r = 0.2;  //size of the shape
    var angle_offset = 360/seCount;
    for (angle = 0; angle <= 360; angle += angle_offset) {
      cir_points.push(x + r*Math.cos(Math.PI * angle/180)* pointSize);
      cir_points.push(y + r*Math.sin(Math.PI * angle/180)* pointSize);
      addColor(cir_color);
    }
    circle_shape.push(seCount);
    count[2] += 1;
  }

  var points = tri_points.concat(sqr_points).concat(cir_points);
  var lenP = points.length;

  var shapes = tri_color.concat(sqr_color).concat(cir_color);
  var lenC = shapes.length;

  var arrPoints = new Float32Array(lenP);
  for (var i = 0; i < lenP; i++ ) {
    arrPoints[i] = points[i];
  }
  var arrColors = new Float32Array(lenC);
  for (var i = 0; i < lenC; i++ ) {
    arrColors[i] = shapes[i];
  }
  return [arrPoints, arrColors];
}

function drawShapes(gl, a_Position, a_Color, vecPoints, vecColors) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vecPoints, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  var colorBuffer = gl.createBuffer();
  if (!colorBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vecColors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);

  var i = 0;

  // triangles
  if (count[0] > 0) {

    gl.drawArrays(gl.TRIANGLES, i, count[0] * 3);
    i += count[0] * 3;

  }

  // rectangle 
  if (count[1] > 0) {
    gl.drawArrays(gl.TRIANGLES, i, count[1] * 6);
    i += count[1] * 6;

  } 

  // circle
  if (count[2] > 0) {
    var startFan = i;
    for (var j = 1; j <= count[2]; j ++) {
      startFan = i + 1;
      var circle_count = circle_shape[j-1] + 2;
      gl.drawArrays(gl.TRIANGLE_FAN, startFan, circle_count);
      i += circle_count;
    }
  }

}

function addColor(arr) {
  arr.push(colorRed);
  arr.push(colorGreen);
  arr.push(colorBlue);
  arr.push(transParent);
}