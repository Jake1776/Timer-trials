let timerId = 0;
document.getElementById('create').addEventListener('click', function() {
    let timer = document.createElement('div');
    timer.className = 'timer';
    timer.id = 'timer' + timerId++;
    
    let h2 = document.createElement('h2');
    h2.textContent = 'Timer';
    
    let p = document.createElement('p');
    p.textContent = '00:00:00.00';
    
    let start = document.createElement('button');
    start.textContent = 'Start/Pause';
    
    let reset = document.createElement('button');
    reset.textContent = 'Reset';
    
    let del = document.createElement('button');
    del.textContent = 'Delete';
    
    timer.appendChild(h2);
    timer.appendChild(p);
    timer.appendChild(start);
    timer.appendChild(reset);
    timer.appendChild(del);
    
    document.getElementById('timers').appendChild(timer);

    // Add event listeners for the buttons
    start.addEventListener('click', function() {
        // Start or pause the timer
        if (start.textContent === 'Start') {
            startTimer(timer.id);
            start.textContent = 'Pause';
        } else {
            pauseTimer(timer.id);
            start.textContent = 'Start';
        }
    });
    
    reset.addEventListener('click', function() {
        // Reset the timer
        resetTimer(timer.id);
        start.textContent = 'Start';
    });
    
    del.addEventListener('click', function() {
        // Delete the timer
        deleteTimer(timer.id);
    });

    // Make the timer draggable
    $(`#${timer.id}`).draggable();
});

// Timer functions (startTimer, pauseTimer, resetTimer, deleteTimer) go here
