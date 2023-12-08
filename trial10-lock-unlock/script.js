const timersContainer = document.getElementById("timersContainer");
const newTimerBtn = document.getElementById("newTimerBtn");

let startPauseBtn, resetBtn, deleteBtn; // Define the buttons outside the function
let isLocked = false; // Define isLocked outside the function

newTimerBtn.addEventListener("click", createTimer);

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("button");
    button.addEventListener("click", onClick);
    return button;
}

function createIcon(isLocked) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", isLocked ? "fa-lock" : "fa-lock-open");
    icon.classList.add("lock-icon");
    return icon;
}

function toggleLockState(timerBox, lockIcon, timerName) {
    isLocked = !isLocked;
    console.log('Lock state changed:', isLocked);
    lockIcon.classList.toggle("fa-lock", isLocked);
    lockIcon.classList.toggle("fa-lock-open", !isLocked);
    timerBox.classList.toggle("locked", isLocked);

    if (isLocked) {
        timerBox.style.cursor = "default";
        timerName.contentEditable = false;
        startPauseBtn.disabled = true;
        resetBtn.disabled = true;
        deleteBtn.disabled = true;
    } else {
        timerBox.style.cursor = "move";
        timerName.contentEditable = true;
        startPauseBtn.disabled = false;
        resetBtn.disabled = false;
        deleteBtn.disabled = false;
    }
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
    timerName.textContent = "Case/CAD #";
    timerName.contentEditable = true;

    const lockIcon = createIcon(isLocked);

    lockIcon.addEventListener("click", () => toggleLockState(timerBox, lockIcon, timerName));

    timerBox.appendChild(lockIcon);

    const timerDisplay = document.createElement("div");
    timerDisplay.classList.add("timer-time");
    timerDisplay.textContent = "00:00:00.00";

    startPauseBtn = createButton("Start", () => startPauseTimer(timerDisplay));
    startPauseBtn.classList.add('start');
    resetBtn = createButton("Reset", () => resetTimer(timerDisplay));
    deleteBtn = createButton("Delete", () => deleteTimer(timerBox));

    timerBox.appendChild(timerName);
    timerBox.appendChild(timerDisplay);
    timerBox.appendChild(startPauseBtn);
    timerBox.appendChild(resetBtn);
    timerBox.appendChild(deleteBtn);

    timersContainer.appendChild(timerBox);

    makeDraggable(timerBox);
}

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;

    function handleMouseDown(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
    }

    function handleMouseMove(e) {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + "px";
            element.style.top = e.clientY - offsetY + "px";
        }
    }

    function handleMouseUp() {
        isDragging = false;
    }

    // Initial setup of cursor and event listeners
    element.style.cursor = "move";
    element.addEventListener("mousedown", handleMouseDown);

    // Add listeners for drag events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}

let intervalId = null;

function startPauseTimer(timerDisplay) {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    } else {
        intervalId = setInterval(() => updateTimer(timerDisplay), 10);
    }
}

function resetTimer(timerDisplay) {
    clearInterval(intervalId);
    timerDisplay.textContent = "00:00:00.00";
    intervalId = null;
}

function deleteTimer(timerBox) {
    timerBox.remove();
}

function updateTimer(timerDisplay) {
    const timeParts = timerDisplay.textContent.split(/[:.]/);
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let seconds = parseInt(timeParts[2]);
    let milliseconds = parseInt(timeParts[3] || 0);

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