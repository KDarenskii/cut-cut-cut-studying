class Game {
    constructor(difficulty, username) {
        this.difficulty = difficulty;
        this.username = username;
        this.level = 0;
        this.isEnd = false;
        this.score = 0;
        this.startTimeMs = Date.now();
        this.endTimeMs = Date.now();
        this.startDate = new Date().toLocaleDateString();
    }

    increaseScore(time) {
        const difficultyRatio =
            this.difficulty === DIFFICULTY.NORMAL ? 0.25 : 0.5;
        const timeRatio = 1 - (60 - time) / 100;
        this.score += Math.round(10 + 10 * difficultyRatio * timeRatio);
    }

    increaseLevel() {
        this.level++;
        if (this.level === levels.length - 1) {
            this.isEnd = true;
            this.endTimeMs = Date.now();
        }
    }

    checkFinish(progress) {
        const { linesCount, linesLimit, figuresCount, figuresLimit, time } =
            progress;

        if (time < 1) {
            return { status: GAME_STATUSES.LOSE, message: "Время вышло" };
        }

        if (linesCount === linesLimit && figuresCount < figuresLimit) {
            return {
                status: GAME_STATUSES.LOSE,
                message: "Разрезов не осталось",
            };
        }

        if (figuresCount === figuresLimit && linesCount < linesLimit) {
            return {
                status: GAME_STATUSES.LOSE,
                message: "Разрезы не потрачены",
            };
        }

        if (linesCount > linesLimit || figuresCount > figuresLimit) {
            return {
                status: GAME_STATUSES.LOSE,
                message: "Лимит разрезов или фигур превышен",
            };
        }

        if (linesCount === linesLimit && figuresCount === figuresLimit) {
            if (this.isEnd) {
                return {
                    status: GAME_STATUSES.COMPLETE,
                    message: "Вы прошли все уровни",
                };
            }

            return {
                status: GAME_STATUSES.WIN,
                message: "К следующему уровню -->",
            };
        }

        return { status: GAME_STATUSES.PLAYING, message: "Игра продолжается" };
    }

    displayResult(status, message) {
        const gameWrapperElement = document.querySelector(
            "[data-game-wrapper]"
        );

        if (status === GAME_STATUSES.WIN) {
            const result = `
              <div class="game-result game-result--win">
                <div>
                  <h3 class="game-result-title game-result-title--win">Уровень пройден</h3>
                  <div class="game-result-message game-result-message--win">
                    <button class="next-level-button" type="button" data-next-level-btn>
                      ${message}
                    </button>
                  </div>
                </div>
              </div>
            `;
            gameWrapperElement.innerHTML = result;
        }

        if (status === GAME_STATUSES.COMPLETE) {
            const result = `
              <div class="game-result game-result--win">
                <div>
                  <h3 class="game-result-title game-result-title--win">Победа</h3>
                  <div class="game-result-message game-result-message--win">
                    ${message}
                  </div>
                </div>
              </div>
            `;
            gameWrapperElement.innerHTML = result;
        }

        if (status === GAME_STATUSES.LOSE) {
            const result = `
              <div class="game-result game-result--lose">
                <div>
                  <h3 class="game-result-title game-result-title--lose">Поражение</h3>
                  <div class="game-result-message game-result-message--lose">
                    ${message}
                  </div>
                </div>
              </div>
            `;
            gameWrapperElement.innerHTML = result;
        }
    }
}
