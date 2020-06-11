const PLAY_PAUSE = document.querySelector(".pause-play");
const STOP = document.querySelector(".stop");

PLAY_PAUSE.addEventListener("click", () => {
  PLAY_PAUSE.classList.toggle("playing");
  // If button is triangle(play)
  if (!PLAY_PAUSE.classList[1]) {
    clearTimeout(timer);
    return;
  }
  startTimer();
});

STOP.addEventListener("click", () => {
  // If stop button is clicked while timer is running
  if (PLAY_PAUSE.classList[1]) {
    PLAY_PAUSE.classList.remove("playing");
  }
  // Reset
  clearTimeout(timer);
  mins = pomodoro;
  secs = 0;
  count = 0;
  TIME_LIMIT = mins * 60 + secs;
  timeLeft = TIME_LIMIT;
  init();
  updateCircle();
});

let timer;
let pomodoro = 25; // Minutes in a pomodoro
let mins = 25;
let secs = 00;
let count = 0;
let shortBreakTime = 1; // Minutes
let longBreakTime = 15; // Minutes
let longBreak = 4; // Pomodoros before long break
const FULL_DASH_ARRAY = 283;

const MINUTES = document.querySelector("#minutes");
const SECS = document.querySelector("#seconds");
const STATUS = document.querySelector("#status");

let TIME_LIMIT = mins * 60 + secs;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function pad(n) {
  return n < 10 && n >= 0 ? "0" + n : n;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

const PATH_REMAINING = document.querySelector("#path-remaining");

function updateCircle() {
  const pathRemaining = `${
    calculateTimeFraction() * FULL_DASH_ARRAY.toFixed(0)
  } 283`;

  PATH_REMAINING.setAttribute("stroke-dasharray", pathRemaining);
}

let breakTime = false;

function startTimer() {
  timer = setTimeout(() => {
    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;
    if (secs == 0) {
      if (mins == 0) {
        if (!breakTime) {
          count++;
          breakTime = true;
          STATUS.textContent = "Break Time!";
        } else {
          breakTime = false;
          mins = pomodoro;
          STATUS.textContent = "Pomodoro";
        }
        if (breakTime) {
          if (count % longBreak == 0) {
            mins = longBreakTime;
          } else {
            mins = shortBreakTime;
          }
        }
        TIME_LIMIT = mins * 60;
        timePassed = 0;
      }
      mins--;
      MINUTES.textContent = pad(mins);
      secs = 60;
    }

    secs--;
    SECS.textContent = pad(secs);
    updateCircle();
    startTimer();
  }, 1000);
}

// Settings
const SETTINGS = document.querySelector("#settings-button");
const SETTINGS_WRAP = document.querySelector("#settings-wrap");
SETTINGS.addEventListener("click", () => {
  SETTINGS_WRAP.classList.toggle("visible");
});
SETTINGS_WRAP.addEventListener("click", () => {
  SETTINGS_WRAP.classList.toggle("visible");
});

const POMODORO_DURATION = document.querySelector(".pomodoro-duration");
const BREAK_DURATION = document.querySelector(".break-duration");
const LONG_BREAK_DURATION = document.querySelector(".long-break-duration");

const POMODORO_SLIDER = document.querySelector(".pomodoro-slider");
const BREAK_SLIDER = document.querySelector(".break-slider");
const LONG_BREAK_SLIDER = document.querySelector(".long-break-slider");

const SLIDERS = document.querySelectorAll(".slider");
SLIDERS.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    let value = e.target.value;
    if (e.target.classList[0] == "pomodoro-slider") {
      POMODORO_DURATION.textContent = `${value} minutes`;
      pomodoro = value;
      return;
    }
    if (e.target.classList[0] == "break-slider") {
      BREAK_DURATION.textContent = `${value} minutes`;
      shortBreakTime = value;
      return;
    }
    if (e.target.classList[0] == "long-break-slider") {
      LONG_BREAK_DURATION.textContent = `${value} minutes`;
      longBreakTime = value;
      return;
    }
  });
});
function init() {
  // Timer
  MINUTES.textContent = pad(mins);
  SECS.textContent = pad(secs);

  // Settings
  POMODORO_SLIDER.setAttribute("value", mins);
  BREAK_SLIDER.setAttribute("value", shortBreakTime);
  LONG_BREAK_SLIDER.setAttribute("value", longBreakTime);
  POMODORO_DURATION.textContent = `${POMODORO_SLIDER.getAttribute(
    "value"
  )} minutes`;
  BREAK_DURATION.textContent = `${BREAK_SLIDER.getAttribute("value")} minutes`;
  LONG_BREAK_DURATION.textContent = `${LONG_BREAK_SLIDER.getAttribute(
    "value"
  )} minutes`;
}
document.addEventListener("DOMContentLoaded", init);
