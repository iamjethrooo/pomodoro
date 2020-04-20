const PLAY_PAUSE = document.querySelector(".pause-play");

PLAY_PAUSE.addEventListener("click", () => {
  PLAY_PAUSE.classList.toggle("playing");
});

let mins = 25;
let secs = 00;
let count = 0;
let shortBreak = 5; // Minutes
let longBreak = 15; // Minutes

const MINUTES = document.querySelector("#minutes");
const SECS = document.querySelector("#seconds");
const PLAY = document.querySelector(".play");

function pad(n) {
  return n < 10 && n >= 0 ? "0" + n : n;
}

function startTimer() {
  setTimeout(() => {
    if (secs == 0) {
      if (mins == 0) {
        count++;
        if (count % 4 == 0) {
          breakTimer(longBreak);
          return;
        } else {
          breakTimer(shortBreak);
          return;
        }
      }
      mins--;
      MINUTES.textContent = pad(mins);
      secs = 60;
    }
    secs--;
    SECS.textContent = pad(secs);
    startTimer();
  }, 1000);
}

function breakTimer(minutes) {
  mins = minutes;
  startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
  MINUTES.textContent = pad(mins);
  SECS.textContent = pad(secs);
});

PLAY.addEventListener("click", startTimer);
