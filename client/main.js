const snake = new Snake(document);
const connectionManager = new ConnectionManager(snake);
try {
    // For local development/running on the same server
    connectionManager.connect('ws://' + window.location.hostname + ':9000');
} catch(err) {
    // For Gitpod.io development
    console.warn(err);
    let address = window.location.hostname.replace('8080', '9000');
    connectionManager.connect('wss://' + address);
}

const gesture = new Gesture(document);
gesture.listenForGestures(direction => {
    switch (direction) {
        case GestureType.UP:
            sendDirection('UP');
            break;
        case GestureType.RIGHT:
            sendDirection('RIGHT');
            break;
        case GestureType.DOWN:
            sendDirection('DOWN');
            break;
        case GestureType.LEFT:
            sendDirection('LEFT');
            break;
    }
});

const keyListener = (event) => {
    switch (event.keyCode) {
        case 87:
        case 38:
            sendDirection('UP');
            break;
        case 68:
        case 39:
            sendDirection('RIGHT');
            break;
        case 83:
        case 40:
            sendDirection('DOWN');
            break;
        case 65:
        case 37:
            sendDirection('LEFT');
            break;

    }
};

document.addEventListener('keydown', keyListener);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
resizeCanvas();


function sendDirection(direction) {
    connectionManager.send({
        type: 'direction-update',
        direction: direction
    });
}


function resizeCanvas() {
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    const scale = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.95 / 20);
    canvas.width = canvas.height = scale * 20;
    context.font = "1px Comic Sans MS";
    context.textBaseline = "top";
    context.scale(scale, scale);
  }