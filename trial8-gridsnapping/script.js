const timersContainer = document.getElementById("timersContainer");
const newTimerBtn = document.getElementById("newTimerBtn");

newTimerBtn.addEventListener("click", createTimer);

function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("button");
    return button;
}

function createTimer() {
    const timerBox = document.createElement("div");
    timerBox.classList.add("timer-box");

    const centerX = (window.innerWidth - 300) / 2;
    const centerY = (window.innerHeight - 200) / 2;
    timerBox.style.left = `${centerX}px`;
    timerBox.style.top = `${centerY}px`;

    const timerName = document.createElement("div");
    timerName.classList.add("timer-name");
    timerName.textContent = "Timer";
    timerName.contentEditable = true;

    timerName.addEventListener("focus", function () {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    });

    timerName.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            timerName.textContent = timerName.textContent.toUpperCase();
            timerName.blur();
        }
    });

    const timerDisplay = document.createElement("div");
    timerDisplay.classList.add("timer-time");
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
            interval = setInterval(() => updateTimer(timerDisplay), 10);
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

    setTimeout(() => {
        timerName.focus();
    }, 10);
}

function makeDraggable(element) {
  let offsetX, offsetY, isDragging = false;
  const gridSize = 325; // Adjust the grid size as needed

  element.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
      if (isDragging) {
          let left = e.clientX - offsetX;
          let top = e.clientY - offsetY;

          element.style.left = left + "px";
          element.style.top = top + "px";
      }
  });

  document.addEventListener("mouseup", () => {
      if (isDragging) {
          // Snap to the grid
          let left = parseFloat(element.style.left);
          let top = parseFloat(element.style.top);

          left = Math.round(left / gridSize) * gridSize;
          top = Math.round(top / gridSize) * gridSize;

          // Adjust for element size to prevent overlapping
          left = Math.min(left, window.innerWidth - element.clientWidth);
          top = Math.min(top, window.innerHeight - element.clientHeight);

          element.style.left = left + "px";
          element.style.top = top + "px";

          isDragging = false;
      }
  });
}

let intervalId = null;

function startTimer(timerDisplay) {
    if (intervalId !== null) { // If a timer is already running, do nothing
        return;
    }

    intervalId = setInterval(() => {
        updateTimer(timerDisplay);
    }, 10); // Update the timer every 10 milliseconds
}

function updateTimer(timerDisplay) {
    const timeParts = timerDisplay.textContent.split(/[:.]/);
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let seconds = parseInt(timeParts[2]);
    let milliseconds = parseInt(timeParts[3] || 0); // Use 0 if milliseconds are undefined

    milliseconds += 1;

    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
    }

    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }

    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }

    const formattedMilliseconds = String(milliseconds).padStart(2, '0');
    
    timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${formattedMilliseconds}`;
}