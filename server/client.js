const START_LENGTH = 4;
const START_DIRECTION = 'RIGHT'

class Client {

    constructor(conn, id) {
        this.conn = conn;
        this.id = id;
        this.session = null;

        // todo choose color
        this.color = '#0F0'
        // todo use length
        this.length = null;
        this.direction = null;
        this.body = [];
        this.restart();
    }

    kill() {
        console.log("Player " + this.id + "died.");
        this.restart();
    }

    move() {
        // todo ignore opposite direction
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
        }
        this.body.push(Object.assign({}, this.coordinates));
    }

    restart() {
        // todo choose start position
        this.coordinates = { x: 5, y: 5 };
        this.body = [];
        this.length = START_LENGTH;
        this.direction = START_DIRECTION;
    }


    // todo move away
    send(data) {
        const msg = JSON.stringify(data);
        console.log(`Sending message ${msg}`);
        this.conn.send(msg, function ack(err) {
            if (err) {
                console.log('Error sending message', msg, err);
            }
        });
    }

    updateDirection(direction) {
        this.direction = direction;
    }
}

module.exports = Client;
