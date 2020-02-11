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
                // todo colors
                if (!cell) {
                    this.context.fillStyle = '#000';
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
        // todo improve color-generating (array of pre-defined colors)
        let hash = id.split('').reduce((accumulator, currentValue) => accumulator + currentValue.charCodeAt(0), '');
        let hashSum = parseInt(hash.split('').reduce((accumulator, currentValue) => accumulator + currentValue.charCodeAt(0), 0));
        let r = hashSum % 256;
        let g = (hashSum * 2) % 256;
        let b = (hashSum * 3) % 256;

        return `rgb(${r}, ${g}, ${b})`;
    }
}
