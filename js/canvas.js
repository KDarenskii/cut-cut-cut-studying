class Canvas {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.isDrawing = false;
        this.drawStartPoint = {};
        this.drawEndPoint = {};
        this.lines = [];
    }

    getCanvas() {
        return this.canvas;
    }

    getCanvasCtx() {
        return this.ctx;
    }

    drawLine(line) {
        this.ctx.beginPath();
        this.ctx.moveTo(line.startX, line.startY);
        this.ctx.lineTo(line.endX, line.endY);
        this.ctx.stroke();
    }

    drawLines(lines) {
        lines.forEach((line) => {
            this.drawLine(line);
        });
    }

    drawAddedLines() {
        this.drawLines(this.lines);
    }

    drawCurrentLine() {
        this.drawLine({
            startX: this.drawStartPoint.x,
            startY: this.drawStartPoint.y,
            endX: this.drawEndPoint.x,
            endY: this.drawEndPoint.y,
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    addLine(line) {
        this.lines.push(line);
    }
}
