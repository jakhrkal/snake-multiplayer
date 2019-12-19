class Snake {

    constructor(document) {
        this.document = document;
        this.canvas = this.document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateState(state) {
        state.forEach((col, y) => {
            col.forEach((cell, x) => {
                // todo player colors
                this.context.fillStyle = cell ? '#0ff' : '#000';
                this.context.fillRect(x, y, 1, 1);
            });
        });
    }
}
