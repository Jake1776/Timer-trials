class Timer {
  constructor(container) {
    this.container = container;
    this.timerInterval = null;
    this.timerRunning = false;
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
      <h2 class="timerName">${this.timerName}</h2>
      <div class="display">00:00:00</div>
      <button class="toggleButton">Start</button>
      <button class="resetButton">Reset</button>
      <button class="changeNameButton">Change Name</button>
    `;
    this.container.appendChild(timerDiv);

    const display = timerDiv.querySelector('.display');
    const toggleButton = timerDiv.querySelector('.toggleButton');
    const resetButton = timerDiv.querySelector('.resetButton');
    const changeNameButton = timerDiv.querySelector('.changeNameButton');
    const timerNameDisplay = timerDiv.querySelector('.timerName');

    toggleButton.addEventListener('click', () => this.toggleTimer(display, toggleButton));
    resetButton.addEventListener('click', () => this.resetTimer(display, toggleButton));
    changeNameButton.addEventListener('click', () => this.changeTimerName(timerNameDisplay));
  }

  toggleTimer(display, toggleButton) {
    if (!this.timerRunning) {
      this.timerInterval = setInterval(() => this.updateTimer(display), 1000);
      toggleButton.textContent = "Pause";
      this.timerRunning = true;
    } else {
      clearInterval(this.timerInterval);
      toggleButton.textContent = "Start";
      this.timerRunning = false;
    }
  }

  updateTimer(display) {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    display.textContent = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
  }

  resetTimer(display, toggleButton) {
    if (confirm("Are you sure you want to reset the timer?")) {
      clearInterval(this.timerInterval);
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      display.textContent = '00:00:00';
      toggleButton.textContent = 'Start';
      this.timerRunning = false;
    }
  }

  changeTimerName(timerNameDisplay) {
    this.timerName = prompt("Enter a new name for the timer:", this.timerName);
    if (this.timerName !== null) {
      timerNameDisplay.textContent = this.timerName;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const timersContainer = document.getElementById('timers');
  const createButton = document.getElementById('createButton');

  createButton.addEventListener('click', () => new Timer(timersContainer));
});
