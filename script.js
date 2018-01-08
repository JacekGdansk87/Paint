var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineWidth = 5;
var down = false;

canvas.addEventListener('mousemove',draw);

canvas.addEventListener('mousedown', function()
{
    down = true;
    context.beginPath();
    context.moveTo(xPos, yPos);
    canvas.addEventListener("mousemove", draw);
});

canvas.addEventListener('mouseup', function() { down = false; });

var size =  document.getElementById('brushSize');
size.addEventListener("change",changeBrushSize);
size.addEventListener("mousemove",changeBrushSize);


function draw(e)
{
    xPos = e.clientX - canvas.offsetLeft;
    yPos = e.clientY - canvas.offsetTop;
    
    if(down == true)
        {
            context.lineTo(xPos, yPos);
            context.stroke();
        }
} 

function changeColor(color) {context.strokeStyle = color; context.fillStyle = color; }
function clearCanvas() {context.clearRect(0,0, canvas.width, canvas.height);}
function changeBrushSize(size){context.lineWidth = this.value;}
function fillCanvas() { context.fillRect(0, 0, canvas.width, canvas.height);}
function changeBrushStyle(brushStyle) { context.lineCap = brushStyle; }
function triggerClick() {document.getElementById('file').click(); }

document.getElementById('file').addEventListener('change', function(e)
{
    clearCanvas();
    //URL = URL || webkitURL;
    var temp = URL.createObjectURL(e.target.files[0]);
    var image = new Image();
    image.src = temp;
    
    image.addEventListener('load', function()
    {
        imageWidth = image.naturalWidth;
        imageHeight = image.naturalHeight;
        newImageWidth = imageWidth;
        newImageHeight = imageHeight;
        originalImageRatio = imageWidth / imageHeight;
        
        if(newImageWidth > imageHeight && newImageWidth > 800) 
            {
                newImageWidth = 800;
                newImageWidth = 800 / originalImageRatio;
            }
        
        if(newImageWidth >= newImageHeight || newImageHeight > newImageWidth && newImageHeight > 500) 
        {
            newImageHeight = 500;
            newImageWidth = 500 * originalImageRatio;
        }        

        context.drawImage(image, 0, 0, newImageWidth, newImageHeight);    
        URL.revokeObjectURL(temp);
    });
});
