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
