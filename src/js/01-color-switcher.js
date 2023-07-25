
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");
let timerId = null;

stopBtn.disabled = true;

const handleStart = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

const handleStop = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
};

startBtn.addEventListener("click", handleStart);
stopBtn.addEventListener("click", handleStop);