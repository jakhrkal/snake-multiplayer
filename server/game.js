const ARENA_SIZE = 20;

class Game {
    constructor(id) {
        this.id = id;
        this.players = new Set;
        this.arena = Array.from(Array(ARENA_SIZE), () => new Array(ARENA_SIZE));

        setInterval(() => {
            this.players.forEach(player => player.move());
            this.checkCollisions();
            this.updateArena();
            this.broadcastState();
        }, 500);
    }

    broadcastState() {
        this.players.forEach(player => player.send({
            type: 'state-update',
            state: this.arena
        }));
    }

    checkCollisions() {
        this.players.forEach(player => {
            if (player.coordinates.x < 0 || player.coordinates.x >= ARENA_SIZE ||
                player.coordinates.y < 0 || player.coordinates.y >= ARENA_SIZE ||
                this.arena[player.coordinates.y][player.coordinates.x]) {
                player.kill();
            }
        })
    }

    join(client) {
        if (client.session) {
            throw new Error('Client already in session');
        }
        this.players.add(client);
        client.session = this;
    }

    leave(client) {
        if (client.session !== this) {
            throw new Error('Client not in session');
        }
        this.players.delete(client);
        console.log(this.players);
        client.session = null;
    }

    updateArena() {
        // todo efektivne vynulovat
        this.arena = Array.from(Array(ARENA_SIZE), () => new Array(ARENA_SIZE));
        this.players.forEach(player => {
             player.body.forEach(piece => {
                this.arena[piece.y][piece.x] = player.id;
            });
        })
    }
}

module.exports = Game;
