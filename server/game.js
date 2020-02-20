const ARENA_SIZE = 20;
const MAX_COIN_COUNT = 2;
const WALL_SHAPES = [
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], // I
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], // _
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], // square
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }], // T
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }], // L
]

class Game {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.coins = [];
        this.walls = [];
        this.arena = Array.from(Array(ARENA_SIZE), () => new Array(ARENA_SIZE));
        this.coinCount = 0;
        this.buildWalls();

        setInterval(() => {
            this.players.forEach(player => player.move());
            this.checkCollisions();
            this.spawnCoin();
            this.updateArena();
            this.broadcastState();
        }, 400);
    }

    broadcastState() {
        this.players.forEach(player => player.send({
            type: 'state-update',
            state: this.arena,
            scores: this.players.map(player => {
                return {
                    id: player.id,
                    score: player.score
                }
            })
        }));
    }

    buildWalls(wallCount = 5) {
        for (let i = 0; i < wallCount; i++) {
            let coords = this.randomCoordinates();
            this.buildWall(coords);
        }
    }

    buildWall(coords) {
        let wallIdx = this.getRandomInt(0, WALL_SHAPES.length - 1);
        let wallShape = WALL_SHAPES[wallIdx];
        wallShape.forEach(piece => {
            if (coords.y + piece.y < ARENA_SIZE && coords.x + piece.x < ARENA_SIZE) {
                this.walls.push({ x: coords.x + piece.x, y: coords.y + piece.y });
            }
        });
    }

    emptyCoordinates(padding = 0) {
        let found = false;
        let res;
        while (!found) {
            res = this.randomCoordinates(padding);
            if (!this.arena[res.y][res.x]) {
                found = true;
            }
        }
        return res;
    }

    randomCoordinates(padding = 0) {
        return { x: this.getRandomInt(padding, ARENA_SIZE - padding - 1), y: this.getRandomInt(padding, ARENA_SIZE - padding - 1) };
    }

    checkCollisions() {
        this.players.forEach(player => {
            if (player.coordinates.x < 0 || player.coordinates.x >= ARENA_SIZE ||
                player.coordinates.y < 0 || player.coordinates.y >= ARENA_SIZE) {
                player.restart(this.emptyCoordinates(1));
            } else if (this.arena[player.coordinates.y][player.coordinates.x]) {
                switch (this.arena[player.coordinates.y][player.coordinates.x].type) {
                    case 'PLAYER':
                    case 'WALL':
                        player.restart(this.emptyCoordinates(1));
                        break;
                    case 'COIN':
                        player.eat(this.arena[player.coordinates.y][player.coordinates.x]);
                        this.coins = this.coins.filter(item => !(item.coordinates.x === player.coordinates.x && item.coordinates.y === player.coordinates.y));
                        this.coinCount--;
                        break;
                    default:
                        throw new Error('Unknown type ' + this.arena[player.coordinates.y][player.coordinates.x].type)
                }
            }
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    join(client) {
        if (client.session) {
            throw new Error('Client already in session');
        }
        this.players.push(client);
        client.session = this;
        client.restart(this.emptyCoordinates(1));
    }

    leave(client) {
        if (client.session !== this) {
            throw new Error('Client not in session');
        }
        this.players = this.players.filter(player => player.id != client.id);
        client.session = null;
    }

    spawnCoin() {
        if (this.coinCount < MAX_COIN_COUNT) {
            this.coins.push({
                type: 'COIN',
                value: 1,
                coordinates: this.emptyCoordinates()
            });
            this.coinCount++;
        }
    }

    updateArena() {
        // todo efektivne vynulovat
        this.arena = Array.from(Array(ARENA_SIZE), () => new Array(ARENA_SIZE));
        this.players.forEach(player => {
            player.body.forEach(piece => {
                this.arena[piece.y][piece.x] = {
                    type: 'PLAYER',
                    id: player.id,
                    direction: player.direction
                };
            });
        });
        this.coins.forEach(coin => {
            this.arena[coin.coordinates.y][coin.coordinates.x] = {
                type: 'COIN',
                value: coin.value
            };
        });
        this.walls.forEach(wall => {
            this.arena[wall.y][wall.x] = {
                type: 'WALL'
            };
        });
    }
}

module.exports = Game;
