const snake = new Snake(document);
const connectionManager = new ConnectionManager(snake);
connectionManager.connect('ws://' + window.location.hostname + ':9000');

// todo
// const gesture = new Gesture(document);
// gesture.subscribe(document, direction => movePlayer(direction));
// listenForGestures(tetrisLocal.element, movePlayer);

function sendDirection(direction) {
    connectionManager.send({
        type: 'direction-update',
        direction: direction
    });
}

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
