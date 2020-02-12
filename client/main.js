const snake = new Snake(document);
const connectionManager = new ConnectionManager(snake);
connectionManager.connect('ws://' + window.location.hostname + ':9000');

function sendDirection(direction) {
    connectionManager.send({
        type: 'direction-update',
        direction: direction
    });
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
