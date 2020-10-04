

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
// Returns an array of all html elements span
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';

// new Date returns an object with the current date and only Date returns a function

let countdownValue = new Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date

// split method returns an array of substrings
const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute('min', today);



// Populate Countdown / Complete UI
function updateDOM() {


    // this makes the function run every 1 second or 1000ms
   countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance  = countdownValue - now;

    // floor returns the largest whole no
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);


    // Hide input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if(distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    } else {
        // else, show countdown in progress
        
        // Populating countdown
        countdownElTitle.textContent = `${countdownTitle}`;

        // timeElements is an array
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }
   }, second);

}





// Take Values from Form Input
function updateCountdown(e) {


    // by default the form on being submitted usually sends data to a database of some sort. This is why when there is no place to send data to, the page reloads immediately. This is why we are unable to see a console.log. In order to stop this, we use the preventDefault() in built method.
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,        
    };
    console.log(savedCountdown);


    // Local storage can only store strings, which is why we must stringify the object
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));




    // Check for valid date

    if(countdownDate === '') {
        alert('PLEASE ENTER DATE')
    } else {
        // Get the number version of current date, update DOM

        countdownValue = new Date(countdownDate).getTime();
        updateDOM();

    }
}


// Reset all values
function reset() {
    // Hide countdowns and show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // Stop the countdown
    clearInterval(countdownActive);


    // Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
    

}

function restorePreviousCountdown() {
    // Get countdown from local storgae if available
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        // JSON.parse() turns a string into an object
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}



// Event Listeners

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check local storage
restorePreviousCountdown();

