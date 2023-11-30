class Board {
    constructor(difficulty) {
        this.linesCount = 0;
        this.linesLimit = difficulty === DIFFICULTY.NORMAL ? 4 : 5;
        this.figuresCount = 1;
        this.figuresLimit = difficulty === DIFFICULTY.NORMAL ? 8 : 10;
        this.time = 59;
    }

    updateProgress(lines) {
        let intersectionsCount = 0;

        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const line1 = lines[i];
                const line2 = lines[j];
                const intersectionPoint = this.getIntersectionPoint(
                    line1,
                    line2
                );
                if (intersectionPoint !== null) {
                    intersectionsCount++;
                }
            }
        }

        const figuresCount = lines.length + intersectionsCount + 1;
        this.figuresCount = figuresCount;
        this.linesCount = lines.length;
    }

    getIntersectionPointsList(figureLines, line) {
        const intersectionsList = figureLines.reduce((points, figureLine) => {
            const intersectionPoint = this.getIntersectionPoint(
                line,
                figureLine
            );
            if (intersectionPoint !== null) {
                return [...points, intersectionPoint];
            }
            return points;
        }, []);
        return intersectionsList;
    }

    getIntersectionPoint(firstLine, secondLine) {
        const p1 = { x: firstLine.startX, y: firstLine.startY };
        const p2 = { x: firstLine.endX, y: firstLine.endY };
        const p3 = { x: secondLine.startX, y: secondLine.startY };
        const p4 = { x: secondLine.endX, y: secondLine.endY };

        const denominator =
            (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
        const ua =
            ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
            denominator;
        const ub =
            ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
            denominator;
        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return {
                x: p1.x + ua * (p2.x - p1.x),
                y: p1.y + ua * (p2.y - p1.y),
            };
        }

        return null;
    }

    displayProgress(level, score) {
        const scoreElement = document.querySelector("[data-score]");
        const cutsElement = document.querySelector("[data-cuts]");
        const timeElement = document.querySelector("[data-time]");
        const levelElement = document.querySelector("[data-level]");
        const pointsElement = document.querySelector("[data-points]");

        scoreElement.innerHTML = `${this.figuresCount} / ${this.figuresLimit}`;
        cutsElement.innerHTML = `${this.linesCount} / ${this.linesLimit}`;
        timeElement.innerHTML = `00:${this.time--}`;
        levelElement.innerHTML = `${level} / ${levels.length}`;
        pointsElement.innerHTML = score;
    }
}
