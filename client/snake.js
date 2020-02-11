const COLORS = ['Chocolate', 'CornflowerBlue', 'Chartreuse', 'Purple', 'DarkRed', 'DarkBlue', 'DarkGreen', 'Crimson', ]

class Snake {

    constructor(document) {
        this.document = document;
        this.canvas = this.document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.playerColors = new Map();
    }

    updateState(state) {
        state.forEach((col, y) => {
            col.forEach((cell, x) => {
                if (!cell) {
                    this.context.fillStyle = '#010';
                } else {
                    switch (cell.type) {
                        case 'PLAYER':
                            this.context.fillStyle = this.colorFromId(cell.id);
                            break;
                        case 'COIN':
                            this.context.fillStyle = 'gold'
                            break;

                    }
                }
                this.context.fillRect(x, y, 1, 1);
            });
        });
    }

    colorFromId(id) {
        if (!this.playerColors.has(id)) {
            this.playerColors.set(id, COLORS[this.playerColors.size % COLORS.length]);
        }
        return this.playerColors.get(id);
    }
}
