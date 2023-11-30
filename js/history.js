window.onload = displayResults;

function displayResults() {
    const results = JSON.parse(localStorage.getItem("cut-history")) ?? [];

    const tbodyElement = document.querySelector("tbody");

    results.forEach((result) => {
        const { date, score, username, duration, result: gameResult } = result;
        const resultElement = `
          <tr>
            <td>${username}</td>
            <td>${date}</td>
            <td>${duration}</td>
            <td>${score}</td>
            <td>${gameResult}</td>
          </tr>
        `;

        tbodyElement.innerHTML += resultElement;
    });
}

function saveResult({ date, durationMs, username, score, result }) {
    const results = JSON.parse(localStorage.getItem("cut-history")) ?? [];

    const resultLabel =
        result === GAME_STATUSES.COMPLETE ? "Победа" : "Поражение";

    const newResult = {
        date,
        score,
        username,
        duration: formatMs(durationMs),
        result: resultLabel,
    };

    results.push(newResult);

    localStorage.setItem("cut-history", JSON.stringify(results));
}

function formatMs(milliseconds) {
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
}
