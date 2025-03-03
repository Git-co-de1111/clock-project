let secondsHand = document.querySelector(".seconds-hand");
let minutesHand = document.querySelector(".minutes-hand");
let hoursHand = document.querySelector(".hours-hand");
let loader = document.querySelector(".loader");
let analogClock = document.querySelector(".analog-clock");
let digitalClock = document.querySelector(".digital-clock");

function clockStart() {
    let data = new Date();
    let seconds = data.getSeconds() / 60;
    let minutes = (seconds + data.getMinutes()) / 60;
    let hours = (minutes + data.getHours()) / 12;
    
    rotateHands(secondsHand, seconds);
    rotateHands(minutesHand, minutes);
    rotateHands(hoursHand, hours);
}
function rotateHands(element, rotation) {
    element.style.setProperty("--rotate", rotation * 360)
}

clockStart();
setInterval(clockStart, 1000);


let icon = document.querySelector('#modeButton img');
let lightIcon = '/night-mode.png';
let darkIcon = '/dark-mode.png';

let modeBtn = document.querySelector('#modeButton');
let mode = localStorage.getItem('theme') || 'light';
let root = document.documentElement;

function setTheme(theme) {
    if (theme === 'dark') {
        root.style.setProperty('--background-color', '#102C52');
        root.style.setProperty('--clock-background', '#55596D');
        root.style.setProperty('--font-color', '#FFFFFF');
        root.style.setProperty('--default-hand-colors', '#C3C3C3')
        icon.style.transform = 'rotate(180deg)';
        modeBtn.style.color = "#fff";
        root.style.setProperty("--icon-color", "invert(1)")
        icon.src = lightIcon;
    } else {
        root.style.setProperty('--background-color', '#D3D3D3');
        root.style.setProperty('--clock-background', '#F4F4F4');
        root.style.setProperty('--font-color', '#414141');
        root.style.setProperty('--default-hand-colors', '#3D3D3D')
        icon.style.transform = 'rotate(-180deg)';
        modeBtn.style.color = "#000";
        root.style.setProperty("--icon-color", "invert(0)")
        icon.src = darkIcon;
    }
    localStorage.setItem('theme', theme);
    mode = theme;
}

setTheme(mode);

modeBtn.addEventListener('click', () => {
    if (mode === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

window.onload = () => {
    loader.style.display = "none";
};


const menuBtn = document.querySelector('.menuBtn');

menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    modeBtn.style.display = "flex";
    switchContainer.style.display = "flex";
    
});

document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !modeBtn.contains(event.target) && !switchContainer.contains(event.target)) {
        modeBtn.style.display = "none";
        switchContainer.style.display = "none";
    }
});


const switchContainer = document.querySelector('.custom-select');

function analogShow() {
    localStorage.setItem('clock', 'analog-clock');
    document.querySelector(".analog-clock").style.display = "flex";
    document.querySelector(".digital-clock").style.display = "none";
}

function digitalShow() {
    localStorage.setItem('clock', 'digital-clock');
    document.querySelector(".digital-clock").style.display = "flex";
    document.querySelector(".analog-clock").style.display = "none";
}


function loadClockPreference() {
    let clockType = localStorage.getItem('clock');
    
    if (clockType === 'analog-clock') {
        analogShow();
    } else {
        digitalShow();
    }
}


window.onload = loadClockPreference;


// digital clock

const hh = document.querySelector("#hh");
const mm = document.querySelector("#mm");
const ss = document.querySelector("#ss");
const amAndpm = document.querySelector("#amPm");


function digitalClockStart() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amPm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    hh.innerHTML = hours;
    mm.innerHTML = minutes;
    ss.innerHTML = seconds;
    amAndpm.innerHTML = amPm;
}

setInterval(digitalClockStart, 1000);
digitalClockStart();