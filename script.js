let startTime, updatedTime, difference, tInterval, running = false, lapCounter = 1;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000 / 60);
        running = true;
    }
});

document.getElementById('pause').addEventListener('click', function() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 1;
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter++}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}