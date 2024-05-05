function updateDisplay(side) {
    var input = document.getElementById(side + '-input');
    var display = document.getElementById(side + '-display');
    display.textContent = input.value;
}

let timerInterval = null;
let isPaused = true;
let totalSeconds = 0;

function startTimer() {
    if (!timerInterval) {
        var snd = new Audio("sound1.mp4");
        snd.play();
        snd.currentTime=0;
        const input = document.getElementById('clock-input');
        if (input.value == "") {
            input.value = "02:00"
        }
        const timeParts = input.value.split(':');
        totalSeconds = (+timeParts[0]) * 60 + (+timeParts[1]);
        isPaused = false;
        timerInterval = setInterval(updateClock, 1000);
        document.getElementById('pause-resume').disabled = false;
        document.getElementById('pause-resume').textContent = 'Pause';
    }
}

function startBreakTimer() {
    if (!timerInterval) {
        const input = document.getElementById('break-clock-input');
        if (input.value == "") {
            input.value = "00:30"
        }
        const timeParts = input.value.split(':');
        totalSeconds = (+timeParts[0]) * 60 + (+timeParts[1]);
        isPaused = false;
        timerInterval = setInterval(updateClock, 1000);
        document.getElementById('pause-resume').disabled = false;
        document.getElementById('pause-resume').textContent = 'Pause';
    }
}

function updateClock() {
    if (totalSeconds < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('clock-display').textContent = "00:00";
        document.getElementById('pause-resume').disabled = true;

        var snd = new Audio("sound1.mp4");
        snd.play();
        return;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('clock-display').textContent =
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');

    if (!isPaused) {
        totalSeconds--;
    }
}

function toggleTimer() {
    const button = document.getElementById('pause-resume');
    if (isPaused) {
        isPaused = false;
        button.textContent = 'Pause';
        timerInterval = setInterval(updateClock, 1000);
    } else {
        isPaused = true;
        button.textContent = 'Resume';
        clearInterval(timerInterval);
    }
}

function toggleInput() {
    const input = document.getElementById('clock-input');
    const inputWeight = document.getElementById('weight-input');
    const inputBreak = document.getElementById('break-clock-input');

    const inputLeftName = document.getElementById('left-first-name-input');
    const inputRightName = document.getElementById('right-first-name-input');

    const toggleButton = document.getElementById('toggle-input');
    
    if (input.style.display === 'none') {
        input.style.display = 'block';
        inputWeight.style.display = 'block';
        inputBreak.style.display = 'block';
        inputLeftName.style.display = 'block'
        inputRightName.style.display = 'block'

        toggleButton.textContent = 'Settings';
    } else {
        input.style.display = 'none';
        inputWeight.style.display = 'none';
        inputBreak.style.display = 'none';
        inputLeftName.style.display = 'none'
        inputRightName.style.display = 'none'
        toggleButton.textContent = 'Settings';
    }
}

function modifyValue(amount, side) {
    var input = document.getElementById(side + '-input');
    var currentValue = parseInt(input.value) || 0; // Get current value or default to 0 if NaN
    if (currentValue + amount < 0) {
        return
    }
    input.value = currentValue + amount;
    updateDisplay(side);
}

function reset() {
    var inputLeft = document.getElementById('left-input');
    var InputRight = document.getElementById('right-input');
    var leftNotice = document.getElementById('left-notice-display');
    var rightNotice = document.getElementById('right-notice-display');
    var leftFirstName = document.getElementById('left-first-name-input')
    leftFirstName.value = ""

    var rightFirstName = document.getElementById('right-first-name-input')
    rightFirstName.value = ""

    leftNotice.textContent = ""
    rightNotice.textContent = ""

    inputLeft.value = 0
    InputRight.value = 0

    updateDisplay("left-first-name");
    updateDisplay("right-first-name");
    updateDisplay("left");
    updateDisplay("right");
    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('clock-display').textContent = "00:00";
    document.getElementById('pause-resume').textContent = 'Pause';
    document.getElementById('pause-resume').disabled = true;
    totalSeconds = 0;
}

function addNotice(side) {
    document.getElementById(side+'-notice-display').textContent += '-';
}

function removeNotice(side) {
    var container = document.getElementById(side+'-notice-display');
    var content = container.textContent; // Using textContent instead of innerHTML
    // Remove the last dash
    var lastDashIndex = content.lastIndexOf('-');
    if (lastDashIndex >= 0) { // Check if there's a dash
        // Remove last dash and any extra spaces around it
        container.textContent = content.substring(0, lastDashIndex);
    }
    console.log(lastDashIndex);
}

// script.js
function addColon(element) {
    var input = document.getElementById(element);
    var value = input.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    // Add colon after first two characters if they exist
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2);
    }

    // Update the input value
    input.value = value;
}


document.getElementById('clock-display').textContent = "00:00"; // Initial clock display

updateDisplay("left");
updateDisplay("right");
