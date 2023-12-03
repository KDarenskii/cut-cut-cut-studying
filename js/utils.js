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

function setDarkTheme() {
    const body = document.body;
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
}

function removeDarkTheme() {
    const body = document.body;
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
}

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;

    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
    }
});
