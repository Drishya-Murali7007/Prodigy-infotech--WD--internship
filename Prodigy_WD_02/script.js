let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let display = document.getElementById("display");
let lapsContainer = document.getElementById("laps");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let lapCount = 1;

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    display.textContent = `${h}:${m}:${s}.${ms}`;
}

function startTimer() {
    if (timer !== null) return;

    timer = setInterval(() => {
        milliseconds++;

        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;

    lapCount = 1;
    lapsContainer.innerHTML = "";

    updateDisplay();
}

function addLap() {
    if (timer === null) return;

    let lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");

    lapItem.innerHTML = `
        <span>🏳 Lap ${lapCount}</span>
        <span>${display.textContent}</span>
    `;

    lapsContainer.appendChild(lapItem);
    lapCount++;
}


startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
