import { Player } from './player.js';
import { Game } from './game.js';
import WebSocket, { WebSocketServer as WSWebSocketServer } from 'ws';

const WebSocketServer = WebSocket.Server || WSWebSocketServer;
const server = new WebSocketServer({ port: 9000 });

const games = new Map;

function createId(len = 4, chars = 'abcdefghjkmnopqrstvwxyz01234567890') {
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

function createClient(conn, id = createId()) {
    return new Player(conn, id);
}

function createGame(id = createId()) {
    if (games.has(id)) {
        throw new Error(`Game ${id} already exists`);
    }

    const game = new Game(id);
    console.log('Creating game', game);

    games.set(id, game);

    return game;
}

function getGame(id) {
    return games.get(id);
}

console.log('Creating server')
server.on('connection', conn => {
    console.log('Connection established');
    const client = createClient(conn);

    conn.on('message', msg => {
        // console.log('Message received', msg);
        const data = JSON.parse(msg as any);

        if (data.type === 'create-game') {
            const game = createGame();
            game.join(client);
            client.send({
                type: 'game-created',
                id: game.id,
            });
        } else if (data.type === 'join-game') {
            const game = getGame(data.id) || createGame(data.id);
            game.join(client);
        } else if (data.type === 'direction-update') {
            client.updateDirection(data.direction);
        } else {
            console.warn('Unknown message type ' + data.type);
        }

    });

    conn.on('close', () => {
        console.log('Connection closed');
        const game = client.session;
        if (game) {
            game.leave(client);
            if (game.players.length === 0) {
                games.delete(game.id);
            }
        }
    });
});
