const COLORS = ['CornflowerBlue', 'LimeGreen', 'Violet', 'LemonChiffon', 'DarkBlue', 'DarkGreen', 'DarkViolet', 'DarkKhaki',]

export class Snake {

    private document: any
    private canvas: any
    private context: any
    private playerColors: any

    constructor(document) {
        this.document = document;
        this.canvas = this.document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.playerColors = new Map();
    }

    updateState(data) {
        data.state.forEach((col, y) => {
            col.forEach((cell, x) => {
                if (!cell) {
                    this.context.fillStyle = '#010';
                } else {
                    switch (cell.type) {
                        case 'PLAYER':
                            this.context.fillStyle = this.colorFromId(cell.id);
                            break;
                        case 'COIN':
                            this.context.fillStyle = 'gold';
                            break;
                        case 'WALL':
                            this.context.fillStyle = 'DarkRed';
                            break;
                        default:
                            console.warn('Unknown cell.', cell);
                    }
                }
                this.context.fillRect(x, y, 1, 1);
            });
        });

        data.scores.forEach((item, index) => {
            // tap = toggle display score
            this.context.fillStyle = this.colorFromId(item.id);
            this.context.fillText(item.score, 0, index);
        });
    }

    colorFromId(id) {
        if (!this.playerColors.has(id)) {
            this.playerColors.set(id, COLORS[this.playerColors.size % COLORS.length]);
        }
        return this.playerColors.get(id);
    }
}
