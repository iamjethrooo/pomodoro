const PLAY_PAUSE = document.querySelector(".pause-play");

PLAY_PAUSE.addEventListener("click", () => {
  PLAY_PAUSE.classList.toggle("playing");
  if (!PLAY_PAUSE.classList[1]) {
    clearTimeout(timer);
    return;
  }
  startTimer();
});
let timer;
let mins = 0;
let secs = 10;
let count = 0;
let shortBreak = 5; // Minutes
let longBreak = 15; // Minutes
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

function startTimer() {
  timer = setTimeout(() => {
    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;
    if (secs == 0) {
      if (mins == 0) {
        count++;
        STATUS.textContent = "Break Time!";
        if (count % 4 == 0) {
          mins = longBreak;
        } else {
          mins = shortBreak;
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

document.addEventListener("DOMContentLoaded", () => {
  MINUTES.textContent = pad(mins);
  SECS.textContent = pad(secs);
});
