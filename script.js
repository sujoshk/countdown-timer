

const inputContainer = document.getElementById('input-container');

const countdownForm = document.getElementById('countdownForm');

const dateEl = document.getElementById('date-picker');


const countdownEl = document.getElementById('countdown');

const countdownElTitle = document.getElementById('countdown-title');

const countdownBtn = document.getElementById('countdown-button');

// Returns an array of all html elements span
const timeElements = document.querySelectorAll('span');




let countdownTitle = '';
let countdownDate = '';

let countdownValue = Date;





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

    const now = new Date().getTime();
    const distance  = countdownValue - now;
    console.log('distance', distance);


    // floor returns the largest whole no
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);


}





// Take Values from Form Input
function updateCountdown(e) {


    // by default the form on being submitted usually sends data to a database of some sort. This is why when there is no place to send data to, the page reloads immediately. This is why we are unable to see a console.log. In order to stop this, we use the preventDefault() in built method.
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownDate, countdownTitle);

    // Get the number version of current date, update DOM

    countdownValue = new Date(countdownDate).getTime();

    console.log('countdown value: ',countdownValue)

    updateDOM();

}






// Event Listeners

countdownForm.addEventListener('submit', updateCountdown);
