//defining timer variables
const workModeTime = 25 * 60;
const breakModeTime = 5 * 60;
let interval = null;
let time = workModeTime;
let isRunning = false;
let isConfigured = false;
const notificationSound = new Audio('src/assets/noti2.mp3');
//function to update timer display
function updateTimerDisplay(totalSeconds) {
  //calculate mins and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  //format to always show two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  //update elements in html
  minutesDisplay.textContent = formattedMinutes;
  secondsDisplay.textContent = formattedSeconds;

  //update page title
  document.title = `${formattedMinutes}:${formattedSeconds} | ZenFocus Timer`;
}

//function to update the timer every second
function updateTimer() {
  if (time > 0) {
    time--;
    updateTimerDisplay(time);
  } else {
    clearInterval(interval);
    interval = null;
    isRunning = false;
    notificationSound.play();
    const nextMode = (currentMode === 'work') ? 'break' : 'work';
    switchMode(nextMode);
    startPauseTimer();
    //NOTIFICATION SOUND 
  }
}

//function connected to start button
function startTimer() {
  if (interval === null) {
    interval = setInterval(updateTimer, 1000);
  }
}

//function to reset timer
function resetTimer() {
  clearInterval(interval);
  interval = null;
  if (currentMode === "work") {
    time = workModeTime;
  } else if (currentMode === "break") {
    time = breakModeTime;
  } else {
    time = workModeTime; //default to work mode time
  }
  updateTimerDisplay(time);
}

//getting DOM elements
const title = document.getElementById("title");
const timerDisplay = document.getElementById("timer");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const workBtn = document.getElementById("workBtn");
const breakBtn = document.getElementById("breakBtn");

//functions to change colors depending on mode
function setColorstoWorkmode() {
  document.getElementById("counter").style.color =
    "var(--accent-workmode-color)";
  document.getElementById("counter").style.borderColor =
    "var(--accent-workmode-color)";
  document
    .getElementById("svgStartBtn")
    .setAttribute("fill", "var(--accent-workmode-color)");
  title.textContent = "Work Mode";
  title.style.color = "var(--accent-workmode-color)";
}

function setColorstoBreakmode() {
  document.getElementById("counter").style.color =
    "var(--accent-breakmode-color)";
  document.getElementById("counter").style.borderColor =
    "var(--accent-breakmode-color)";
  document
    .getElementById("svgStartBtn")
    .setAttribute("fill", "var(--accent-breakmode-color)");
  title.textContent = "Break Mode";
  title.style.color = "var(--accent-breakmode-color)";
}

function switchMode(newMode) {
  if (currentMode === newMode && isConfigured) {
    return;
  }

  currentMode = newMode;
  isConfigured = true;

  if (newMode === "work") {
    time = workModeTime;
    setColorstoWorkmode();
  } else if (newMode === "break") {
    time = breakModeTime;
    setColorstoBreakmode();
  }

  resetTimer();
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    interval = null;
    isRunning = false;

  }else {
    startTimer();
    isRunning = true;
  }
}

function configureAndStart() {
  if (!isConfigured) {
    switchMode("work");
  }

  startPauseTimer();
}

let currentMode = "default";

// Initial setup on page load
window.addEventListener("load", () => {
  updateTimerDisplay(time);
  document.title = "ZenFocus Timer";
});

// Event listener for mode buttons (*need to change timer too)
workBtn.addEventListener('click', () => {
    if (currentMode !== "work") { 
        switchMode("work");
    }
});

breakBtn.addEventListener('click', () => {
    if (currentMode !== "break") { 
        switchMode("break");
    }
});


startBtn.addEventListener("click", configureAndStart);
resetBtn.addEventListener("click", resetTimer);



//DARK MODE TOGGLE
const darkModeBtn = document.getElementById("darkMode");
darkMode = false;
function toggleDarkMode() {
    if (!darkMode) {
        document.body.style.backgroundColor = "var(--background-color-dark)";
        document.getElementById("counter").style.backgroundColor = "var(--background-timer-color-dark)";
        document.body.style.color = "var(--text-primary-color-dark)";
        workBtn.style.backgroundColor = "var(--accent-workmode-color-dark)";
        breakBtn.style.backgroundColor = "var(--accent-breakmode-color-dark)";
        workBtn.style.color = "var(--background-color-dark)";
        breakBtn.style.color = "var(--background-color-dark)";
        

        darkMode = true;
    } else {
        document.body.style.backgroundColor = "var(--background-color)";
        document.getElementById("counter").style.backgroundColor = "var(--background-timer-color)";
        document.body.style.color = "var(--text-primary-color)";
        workBtn.style.backgroundColor = "var(--accent-workmode-color)";
        breakBtn.style.backgroundColor = "var(--accent-breakmode-color)";        
        workBtn.style.color = "var(--background-color)";
        breakBtn.style.color = "var(--background-color)";

        darkMode = false;
    }
}
darkModeBtn.addEventListener('click', () => {
    toggleDarkMode();
});

// --- WORK BUTTON HOVER ---
workBtn.addEventListener('mouseover', () => {
    // Determinar el color de acento según el modo (oscuro o claro)
    const accentColor = darkMode ? "var(--accent-workmode-color-dark)" : "var(--accent-workmode-color)";
    
    workBtn.style.backgroundColor = "transparent";
    workBtn.style.color = accentColor;
    workBtn.style.borderColor = accentColor;
});

// --- BREAK BUTTON HOVER ---
breakBtn.addEventListener('mouseover', () => {
    const accentColor = darkMode ? "var(--accent-breakmode-color-dark)" : "var(--accent-breakmode-color)";
    
    breakBtn.style.backgroundColor = "transparent";
    breakBtn.style.color = accentColor;
    breakBtn.style.borderColor = accentColor;
});

// --- WORK BUTTON MOUSEOUT ---
workBtn.addEventListener('mouseout', () => {
    // Determinar el color de fondo según el modo
    const accentColor = darkMode ? "var(--accent-workmode-color-dark)" : "var(--accent-workmode-color)";
    
    workBtn.style.backgroundColor = accentColor; // Vuelve al color de acento como fondo
    workBtn.style.color = "var(--background-color)"; // Vuelve al color de texto inicial (claro)
    workBtn.style.borderColor = "transparent"; // Vuelve a borde transparente (o a 2px solid work color en modo claro, según tu CSS)
});

// --- BREAK BUTTON MOUSEOUT ---
breakBtn.addEventListener('mouseout', () => {
    const accentColor = darkMode ? "var(--accent-breakmode-color-dark)" : "var(--accent-breakmode-color)";
    
    breakBtn.style.backgroundColor = accentColor; // Vuelve al color de acento como fondo
    breakBtn.style.color = "var(--background-color)";
    breakBtn.style.borderColor = "transparent";
});