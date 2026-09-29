import { Coords, Message } from "../interface/types.js";
import Game from "./game.js";

const START_DIRECTION = 'RIGHT';
const START_LENGTH = 4;

export class Player {

    id: string;
    score = 0;
    body: Coords[] = [];
    coordinates: Coords;
    direction = START_DIRECTION;
    session: Game; 

    private conn;
    private length = 0;

    constructor(conn, id: string) {
        this.conn = conn;
        this.id = id;

        this.length = 0;
        this.direction = START_DIRECTION;
        this.body = [];
        this.score = 0;
    }

    eat(coin) {
        this.length += coin.value;
        this.score += coin.value;
    }

    move() {
        switch (this.direction) {
            case "UP":
                this.coordinates.y--;
                break;
            case "RIGHT":
                this.coordinates.x++;
                break;
            case "DOWN":
                this.coordinates.y++;
                break;
            case "LEFT":
                this.coordinates.x--;
                break;
            default:
                console.warn('Unknown direction ' + this.direction);
        }
        this.body.unshift(Object.assign({}, this.coordinates));
        while (this.body.length > this.length) {
            this.body.pop();
        }
    }

    restart(coordinates) {
        this.coordinates = { x: coordinates.x, y: coordinates.y };
        this.body = [];
        this.body.unshift(Object.assign({}, this.coordinates));
        this.length = START_LENGTH;
        this.direction = START_DIRECTION;
        this.score = Math.floor(this.score / 2);
    }

    // todo move away
    send(message: Message) {
        const msg = JSON.stringify(message);
        // console.log('Sending message', msg);
        this.conn.send(msg, function ack(err) {
            if (err) {
                console.error('Error sending message', msg, err);
            }
        });
    }

    updateDirection(direction) {
        if (!(['LEFT', 'RIGHT'].includes(direction) && ['LEFT', 'RIGHT'].includes(this.direction)) &&
            !(['UP', 'DOWN'].includes(direction) && ['UP', 'DOWN'].includes(this.direction))) {
            this.direction = direction;
        }
    }
}
