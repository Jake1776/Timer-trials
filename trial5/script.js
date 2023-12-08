const createTimerBtn = document.getElementById("createTimerBtn");
const timersContainer = document.getElementById("timersContainer");
const newTimerBtn = document.getElementById("newTimerBtn");

newTimerBtn.addEventListener("click", createTimer);

function createTimer() {
  const timerBox = document.createElement("div");
  timerBox.classList.add("timer-box");

  // Center the timer box on the screen
  const centerX = (window.innerWidth - 300) / 2; // Adjust the width to match your timer box width
  const centerY = (window.innerHeight - 200) / 2; // Adjust the height to match your timer box height
  timerBox.style.left = `${centerX}px`;
  timerBox.style.top = `${centerY}px`;

  const timerName = document.createElement("div");
  timerName.classList.add("timer-name");
  timerName.textContent = "Timer";
  timerName.contentEditable = true;
  timerName.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
          event.preventDefault();
          timerName.contentEditable = false;
      }
  });

    const timerDisplay = document.createElement("div");
    timerDisplay.textContent = "00:00:00.00";

    const startPauseBtn = createButton("Start");
    const resetBtn = createButton("Reset");
    const deleteBtn = createButton("Delete");

    let isRunning = false;
    let interval;

    startPauseBtn.addEventListener("click", () => {
        if (isRunning) {
            clearInterval(interval);
            isRunning = false;
            startPauseBtn.textContent = "Start";
        } else {
            interval = setInterval(updateTimer, 10);
            isRunning = true;
            startPauseBtn.textContent = "Pause";
        }
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(interval);
        timerDisplay.textContent = "00:00:00.00";
        isRunning = false;
        startPauseBtn.textContent = "Start";
    });

    deleteBtn.addEventListener("click", () => {
        timerBox.remove();
    });

    timerBox.appendChild(timerName);
    timerBox.appendChild(timerDisplay);
    timerBox.appendChild(startPauseBtn);
    timerBox.appendChild(resetBtn);
    timerBox.appendChild(deleteBtn);

    timersContainer.appendChild(timerBox);

    makeDraggable(timerBox);
}

function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("button");
    return button;
}

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + "px";
            element.style.top = e.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

function updateTimer() {
    const timerDisplays = document.querySelectorAll(".timer-box > div:nth-child(2)");
    timerDisplays.forEach((display) => {
        const timeParts = display.textContent.split(":");
        let milliseconds = parseFloat(timeParts[2]) + 0.01;
        let seconds = parseInt(timeParts[1]);
        let minutes = parseInt(timeParts[0]);

        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toFixed(2).padStart(5, "0")}`;
    });
}