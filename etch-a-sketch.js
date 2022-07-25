const MOVE_AMOUNT = 10;

// Select the elements on the page - canvas, shake button
let canvas = document.querySelector('#etch-a-sketch');
let shakeButton = document.querySelector('.shake');

// destructing and taking the width property and putting it into width
// and the height and putting it into height
const {width, height} = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// set up our canvas for drawing
// makes canvas 2d
const ctx = canvas.getContext('2d');

// ensure to get a smooth drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

function draw({ key }) {
    // increment the hue
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // start the path
    ctx.beginPath();
    ctx.moveTo(x, y);

    // move our x and y values depending on what the user did
    switch(key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        default:
            break;

    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// write a handler for the keys
function handleKey (e) {
    if(e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key })
    }
}

window.addEventListener('keydown', handleKey);

// clear or shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener("animationend", function() {
        canvas.classList.remove('shake');
    },
    { once: true }
    );
}

shakeButton.addEventListener('click', clearCanvas);