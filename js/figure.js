class Figure {
    constructor(points) {
        this.points = points;
        this.lines = points.map((point, index, array) => {
            const nextPoint = array[index + 1] ?? array[0];
            return {
                startX: point.x,
                startY: point.y,
                endX: nextPoint.x,
                endY: nextPoint.y,
            };
        });
    }
}
