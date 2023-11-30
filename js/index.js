const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get("difficulty");
const username = urlParams.get("username");

const game = new Game(difficulty, username);

initGame();

function initGame() {
    const canvasElement = `<canvas id="myCanvas" width="800" height="420"></canvas>`;
    const gameWrapperElement = document.querySelector("[data-game-wrapper]");
    gameWrapperElement.innerHTML = canvasElement;

    const canvasController = new Canvas();
    const canvas = canvasController.getCanvas();

    const figure = new Figure(levels[game.level].points);
    const board = new Board(difficulty);

    board.displayProgress(game.level + 1, game.score);
    canvasController.drawLines(figure.lines);

    let timeInterval;

    timeInterval = setInterval(() => {
        board.decreaseTime();

        const { status, message } = checkFinish();

        if (status !== GAME_STATUSES.PLAYING) {
            clearInterval(timeInterval);
            handleResult(status, message);
        }

        board.displayProgress(game.level + 1, game.score);
    }, 1000);

    canvas.addEventListener("mousedown", function (event) {
        if (!canvasController.isDrawing) {
            canvasController.drawStartPoint.x =
                event.clientX - canvas.getBoundingClientRect().left;
            canvasController.drawStartPoint.y =
                event.clientY - canvas.getBoundingClientRect().top;
            canvasController.isDrawing = true;
        } else {
            canvasController.drawEndPoint.x =
                event.clientX - canvas.getBoundingClientRect().left;
            canvasController.drawEndPoint.y =
                event.clientY - canvas.getBoundingClientRect().top;

            const drownedLine = {
                startX: canvasController.drawStartPoint.x,
                startY: canvasController.drawStartPoint.y,
                endX: canvasController.drawEndPoint.x,
                endY: canvasController.drawEndPoint.y,
            };

            const intersectionsList = board.getIntersectionPointsList(
                figure.lines,
                drownedLine
            );

            const isValid = intersectionsList.length === 2;

            if (intersectionsList.length === 2) {
                const [p1, p2] = intersectionsList;
                const newLine = {
                    startX: p1.x,
                    startY: p1.y,
                    endX: p2.x,
                    endY: p2.y,
                };

                canvasController.addLine(newLine);
                canvasController.drawLine(newLine);
            }

            canvasController.clearCanvas();
            canvasController.drawAddedLines();
            canvasController.drawLines(figure.lines);

            canvasController.isDrawing = false;

            board.updateProgress(canvasController.lines);

            const result = checkFinish();

            const { status, message } = result;

            if (isValid) {
                handleResult(status, message);
            }
        }
    });

    canvas.addEventListener("mousemove", function (event) {
        if (canvasController.isDrawing) {
            canvasController.drawEndPoint.x =
                event.clientX - canvas.getBoundingClientRect().left;
            canvasController.drawEndPoint.y =
                event.clientY - canvas.getBoundingClientRect().top;

            canvasController.clearCanvas();
            canvasController.drawAddedLines();
            canvasController.drawLines(figure.lines);
            canvasController.drawCurrentLine();
        }
    });

    canvasController.drawAddedLines();

    function handleResult(status, message) {
        if (status !== GAME_STATUSES.LOSE) {
            game.increaseScore(board.time);
        }

        if (status !== GAME_STATUSES.PLAYING) {
            clearInterval(timeInterval);
            game.displayResult(status, message);
        }

        if (status === GAME_STATUSES.WIN) {
            game.increaseLevel();
            const nextButton = document.querySelector("[data-next-level-btn]");
            nextButton.addEventListener("click", initGame);
        }

        if (
            status === GAME_STATUSES.COMPLETE ||
            status === GAME_STATUSES.LOSE
        ) {
            saveResult({
                date: game.startDate,
                durationMs: game.endTimeMs - game.startTimeMs,
                username: game.username,
                score: game.score,
                result: status,
            });
        }

        board.displayProgress(game.level + 1, game.score);
    }

    function checkFinish() {
        return game.checkFinish({
            linesCount: board.linesCount,
            linesLimit: board.linesLimit,
            figuresCount: board.figuresCount,
            figuresLimit: board.figuresLimit,
            time: board.time,
        });
    }
}
