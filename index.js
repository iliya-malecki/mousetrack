let history = []
var pos = { x: 0, y: 0 };
var pathidx = 0;


var canvas = document.createElement('canvas');
document.getElementById('canvas').appendChild(canvas);


ctx = canvas.getContext("2d");
var background = new Image();
background.src = "./img/big-flower.jpeg";
background.onload = resize


var button = document.getElementById('btn-dwnld');
exportJson = (el) => {

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify({
            'data': history,
            'image': background.src
        })
    );

    const link = document.createElement('a')
    link.href = dataStr
    link.download = 'mousedata.json'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(dataStr)
}




lastTime = Date.now()


window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseup', ()=>pathidx++);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
    var rect = canvas.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
}

// resize canvas
function resize() {
    box = document.getElementById('btn-dwnld');
    let innerHeight = screen.availHeight
                        - (window.outerHeight - window.innerHeight)
                        - box.offsetHeight
                        - 20*2 - 10;
    let scale_factor = Math.min(
        window.innerWidth / background.width,
        innerHeight / background.height
    );
    let w = background.width * scale_factor;
    let h = background.height * scale_factor;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.drawImage(background,0,0, w, h);
    history = [];
}

function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    // attempt = Date.now();
    // if (attempt - lastTime < 25) return;
    // lastTime = attempt;

    history.push({
    'date': Date.now(),
    'x': pos.x,
    'y': pos.y,
    'idx': pathidx
    })

    ctx.beginPath(); // begin

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
}
