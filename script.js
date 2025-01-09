let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');
const resumeButton = document.getElementById('resume');
const addMinuteButton = document.getElementById('add-minute');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - Pomodoro Timer`;
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    
    const toggleIcon = modeToggleButton.querySelector('.toggle-icon');
    toggleIcon.textContent = isWorkTime ? '☀️' : '🌙';
    
    if (isWorkTime) {
        modeToggleButton.classList.add('work-mode');
        modeToggleButton.classList.remove('break-mode');
    } else {
        modeToggleButton.classList.add('break-mode');
        modeToggleButton.classList.remove('work-mode');
    }
    
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                toggleMode();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
                startTimer();
            }
        }, 1000);
        startButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        resumeButton.classList.add('hidden');
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    pauseButton.classList.add('hidden');
    resumeButton.classList.remove('hidden');
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Work Time';
    modeToggleButton.classList.add('work-mode');
    modeToggleButton.classList.remove('break-mode');
    updateDisplay();
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    resumeButton.classList.add('hidden');
}

function addOneMinute() {
    if (timerId !== null) {  // Only allow adding time while timer is running
        timeLeft += 60;  // Add 60 seconds
        updateDisplay();
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);
resumeButton.addEventListener('click', startTimer);
addMinuteButton.addEventListener('click', addOneMinute);

// Initialize the display
resetTimer(); 