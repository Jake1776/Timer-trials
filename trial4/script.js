class Timer {
  constructor(container) {
    this.container = container;
    this.timerInterval = null;
    this.timerRunning = false;
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timerName = "New Timer";

    this.initializeUI();
  }

  initializeUI() {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.innerHTML = `
      <div class="title-bar">
        <input class="timerName" value="${this.timerName}">
        <div class="move-handle"></div>
      </div>
      <div class="display">00:00:00.00</div>
      <button class="toggleButton">Start</button>
      <button class="resetButton">Reset</button>
      <button class="deleteButton">Delete</button>
    `;
    this.container.appendChild(timerDiv);

    const display = timerDiv.querySelector('.display');
    const toggleButton = timerDiv.querySelector('.toggleButton');
    const resetButton = timerDiv.querySelector('.resetButton');
    const timerNameInput = timerDiv.querySelector('.timerName');
    const deleteButton = timerDiv.querySelector('.deleteButton');
    const moveHandle = timerDiv.querySelector('.move-handle');

    toggleButton.addEventListener('click', () => this.toggleTimer(display, toggleButton));
    resetButton.addEventListener('click', () => this.resetTimer(display, toggleButton));
    deleteButton.addEventListener('click', () => this.confirmDeleteTimer(timerDiv));

    // Make the timer movable
    this.makeMovable(timerDiv);

    // Add an input event listener to update the timer name
    timerNameInput.addEventListener('input', () => this.changeTimerName(timerNameInput));

    // Add an event listener to save the name on Enter key press
    timerNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        timerNameInput.blur(); // Remove focus
        this.changeTimerName(timerNameInput);
      }
    });
  }

  toggleTimer(display, toggleButton) {
    if (!this.timerRunning) {
      this.timerInterval = setInterval(() => this.updateTimer(display), 10);
      toggleButton.textContent = "Pause";
      this.timerRunning = true;
    } else {
      clearInterval(this.timerInterval);
      toggleButton.textContent = "Start";
      this.timerRunning = false;
    }
  }

  updateTimer(display) {
    this.milliseconds += 10;
    if (this.milliseconds === 1000) {
      this.milliseconds = 0;
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }
    display.textContent = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}.${String(this.milliseconds / 10).padStart(2, '0')}`;
  }

  resetTimer(display, toggleButton) {
    if (confirm("Are you sure you want to reset the timer?")) {
      clearInterval(this.timerInterval);
      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      display.textContent = '00:00:00.00';
      toggleButton.textContent = 'Start';
      this.timerRunning = false;
    }
  }

  changeTimerName(timerNameInput) {
    this.timerName = timerNameInput.value;
  }

  confirmDeleteTimer(timerDiv) {
    if (confirm("Are you sure you want to delete this timer?")) {
      this.container.removeChild(timerDiv);
    }
  }
  
  makeMovable(timerDiv) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    timerDiv.querySelector('.timerName').addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      timerDiv.style.top = timerDiv.offsetTop - pos2 + 'px';
      timerDiv.style.left = timerDiv.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
  
  document.addEventListener("DOMContentLoaded", function () {
    const timersContainer = document.getElementById('timers');
    const createButton = document.getElementById('createButton');
  
    createButton.addEventListener('click', () => new Timer(timersContainer));
  });