const form = document.querySelector("[data-form-settings]");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const nameValue = form.name.value;
    const difficultyValue = form.difficulty.value;

    if (nameValue.trim().length < 1) {
        return;
    }

    difficulty = difficultyValue;
    username = nameValue;

    const url = window.origin + "/game.html";
    window.location.href = `${url}?difficulty=${difficulty}&username=${username}`;
}
