let centisecondsCounter = 0;
let seconds = 0;
let minutes = 0;
let lapItem = 0;
let isReset = false;
let isPlay = false;
const playButton = document.getElementById("play");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const clearButton = document.getElementById("lap-clear-button");
const bg = document.querySelector(".outerbox");
const laps = document.getElementById("laps");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");
const centiSecond = document.getElementById("centiseconds");

const loop = () => {
  if (!isPlay && !isReset) {
    return;
  }

  centisecondsCounter++;
  if (centisecondsCounter == 100) {
    seconds++;
    centisecondsCounter = 0;
  }

  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }

  if (minutes < 10) {
    minute.innerHTML = "0" + minutes;
  } else {
    minute.innerHTML = minutes;
  }

  if (seconds < 10) {
    second.innerText = "0" + seconds;
  } else {
    second.innerText = seconds;
  }

  if (centisecondsCounter < 10) {
    centiSecond.innerText = "0" + centisecondsCounter;
  } else {
    centiSecond.innerText = centisecondsCounter;
  }

  setTimeout(loop, 10);
};

const play = () => {
  isPlay = !isPlay;
  isReset = !isReset;
  if (isPlay && isReset) {
    playButton.innerHTML = "Pause";
    bg.classList.add("animation-bg");
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    loop();
  } else {
    playButton.innerHTML = "Play";
    bg.classList.remove("animation-bg");
  }
};

const reset = () => {
  isPlay = !isPlay;
  isReset = !isReset;
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  playButton.innerHTML = "Play";
  centisecondsCounter = 0;
  seconds = 0;
  minutes = 0;
  centiSecond.innerHTML = "00";
  second.innerHTML = "00";
  minute.innerHTML = "00";
};

const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "numberoflaps");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerHTML = `#${++lapItem} `;

  let centisecondsCounterStr = "";
  let secondsStr = "";
  let minutesStr = "";

  if (minutes < 10) {
    minutesStr = "0" + minutes;
  } else {
    minutesStr = minutes;
  }

  if (seconds < 10) {
    secondsStr = "0" + seconds;
  } else {
    secondsStr = seconds;
  }

  if (centisecondsCounter < 10) {
    centisecondsCounterStr = "0" + centisecondsCounter;
  } else {
    centisecondsCounterStr = centisecondsCounter;
  }

  timeStamp.innerHTML = `${minutesStr} : ${secondsStr} : ${centisecondsCounterStr}`;

  li.append(number, timeStamp);
  laps.append(li);

  clearButton.classList.remove("hidden");
};

const clearAll = () => {
  laps.innerHTML = "";
  laps.append(clearButton);
  clearButton.classList.add("hidden");
  lapItem = 0;
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
