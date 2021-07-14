const inputContainer = document.getElementById('input-container');
const countDownform = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date input min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', today);

//Populate CountDown/ Complete UI
function updateDOM() {
    countDownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        //Hidden input container
        inputContainer.hidden = true;
        //if the countdown ended
        if (distance < 0) {
            countDownEl.hidden = true;
            clearInterval(countDownActive)
            completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
            completeEl.hidden = false;

        } else {
            //count down in process

            // Populating countdown
            countDownElTitle.textContent = `${ countDownTitle }`;
            timeElements[0].textContent = `${ days }`;
            timeElements[1].textContent = `${ hours }`;
            timeElements[2].textContent = `${ minutes }`;
            timeElements[3].textContent = `${ seconds }`;
            //countdown container unhide
            completeEl.hidden = true;
            countDownEl.hidden = false;
        }

    }, second);

}

//Take values form Form Input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    savedCountDown = {

        title: countDownTitle,
        date: countDownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountDown));
    //check for valid date
    if (countDownDate == '') {
        alert('Please Select a date');
    } else {
        //Number version of current date
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
}

function reset() {
    countDownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countDownActive);
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountDown() {
    //get countdown from local storage
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountDown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = savedCountDown.title;
        countDownDate = savedCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
}
//Event listener
countDownform.addEventListener('submit', updateCountdown);
countDownBtn.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);
//on load
restorePreviousCountDown();