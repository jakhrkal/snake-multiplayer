import { MessageType } from "../interface/message-type";
import { Snake } from "./snake";

export class ConnectionManager {

    private conn: WebSocket | null;
    private snake: Snake;

    constructor(snake: Snake) {
        this.conn = null;
        this.snake = snake;
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connection established');
            this.initSession();
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    initSession() {
        const sessionId = window.location.hash.split('#')[1];
        if (sessionId) {
            this.send({
                type: 'join-game',
                id: sessionId
            });
        } else {
            this.send({
                type: 'create-game'
            });
        }
    }

    receive(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'game-created') {
            window.location.hash = data.id;
        } else if (data.type === MessageType.STATE_UPDATE) {
            console.log('Updating state.');
            this.snake.updateState(data);
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn?.send(msg);
    }
}
