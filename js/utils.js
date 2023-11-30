const lineStart = { x: 25, y: 0 };
const lineEnd = { x: 100, y: 75 };

function getIntersectionPoint(p1, p2, p3, p4) {
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

const coords = [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
];

const point = getIntersectionPoint(lineStart, lineEnd, coords[0], coords[1]);
console.log(point);
