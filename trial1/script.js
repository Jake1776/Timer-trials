let timers = []; // Array to store timer objects

const timersContainer = document.getElementById("timers-container");
const createTimerButton = document.getElementById("create-timer");

createTimerButton.addEventListener("click", createTimer);

function createTimer() {
    const newTimer = createTimerElement();
    timers.push(newTimer);
}

function createTimerElement() {
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");

    const titleElement = document.createElement("h1");
    titleElement.innerText = "New Timer";
    titleElement.contentEditable = true;

    const timeDisplay = document.createElement("div");
    timeDisplay.classList.add("time-display");
    timeDisplay.innerText = "00:00:00";

    const startButton = document.createElement("button");
    startButton.innerText = "Start";

    const stopButton = document.createElement("button");
    stopButton.innerText = "Stop";

    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";

    timerElement.appendChild(titleElement);
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(startButton);
    timerElement.appendChild(stopButton);
    timerElement.appendChild(resetButton);

    let startTime = 0;
    let timerInterval;
    let isRunning = false;
    let isPaused = false;
    let pausedTime = 0;

    startButton.addEventListener("click", () => {
        if (!isRunning) {
            isRunning = true;
            const startDate = new Date();
            startTime += startDate - new Date(startTime);
            timerInterval = setInterval(updateTimeDisplay, 1000);
        }
    });

    stopButton.addEventListener("click", () => {
        if (!isRunning) { // If not running, start the timer
            isRunning = true;
            if (isPaused) {
                // Update startTime to account for the paused time
                const pausedTime = new Date() - new Date(startTime);
                startTime += pausedTime;
            } else {
                const startDate = new Date();
                startTime += startDate - new Date(startTime);
            }
            timerInterval = setInterval(updateTimeDisplay, 1000);
        } else if (!isPaused) { // If running and not paused, pause the timer
            clearInterval(timerInterval);
            isPaused = true;
        } else { // If running and paused, resume the timer
            isPaused = false;
            const startDate = new Date();
            startTime += startDate - new Date(startTime);
            timerInterval = setInterval(updateTimeDisplay, 1000);
        }
    });  

    resetButton.addEventListener("click", () => {
        if (isRunning) {
            clearInterval(timerInterval);
        }
        isRunning = false;
        startTime = 0;
        updateTimeDisplay();
    });

    function updateTimeDisplay() {
        if (isPaused) {
            timeDisplay.textContent = `${titleElement.innerText} - Paused`;
        } else {
            const currentTime = isRunning ? new Date() - new Date(startTime) : startTime;
            const hours = Math.floor(currentTime / 3600000);
            const minutes = Math.floor((currentTime % 3600000) / 60000);
            const seconds = Math.floor((currentTime % 60000) / 1000);
            timeDisplay.textContent = `${titleElement.innerText} - ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    timersContainer.appendChild(timerElement);
    return timerElement;
}
