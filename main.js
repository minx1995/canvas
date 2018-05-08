var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;
autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled =true
  actions.className = 'actions'
  eraser.classList.add('active')
  pen.classList.remove('active')
  
}
pen.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
  pen.classList.add('active')
  eraser.classList.remove('active')
}
green.onclick = function()
{
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  bule.classList.remove('active')
  black.classList.remove('active')
}
red.onclick = function()
{
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  bule.classList.remove('active')
  black.classList.remove('active')
}
bule.onclick = function()
{
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  bule.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
  black.classList.remove('active')
}
black.onclick = function()
{
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  bule.classList.remove('active')
  green.classList.remove('active')
  red.classList.remove('active')
  black.classList.add('active')
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) 
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
clear.onclick = function () {
 context.clearRect(0,0,yyy.width,yyy.height);
}
save.onclick = function ()
{
var url = yyy.toDataURL("image/png")
console.log(url)
var a = document.createElement('a')
document.body.appendChild(a)
a.href = url
a.download = '我的画'
a.click()                   

}  
thin.onclick = function (){
  lineWidth = 5
}
thick.onclick = function () {
  lineWidth = 10
}
function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  if(canvas.ontouchstart !== undefined){
   canvas.ontouchstart = function(event) { 
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(event) {
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
  
      if (!using) {return}
  
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
  
    }
    canvas.ontouchend = function(event) {
      using = false
    }
  }
    else{
      canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
      canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    
      }
      canvas.onmouseup = function(aaa) {
        using = false
      }
    }

}