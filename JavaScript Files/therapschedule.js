const countDay = document.getElementById('countDay');
const countHour = document.getElementById('countHour');
const countMin = document.getElementById('countMin');
const countSec = document.getElementById('countSec');

const countDay2 = document.getElementById('countDay2');
const countHour2 = document.getElementById('countHour2');
const countMin2 = document.getElementById('countMin2');
const countSec2 = document.getElementById('countSec2');


window.addEventListener('DOMContentLoaded', () => {
    // show preloader.html page
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hidden');
    // show main page
    const main = document.querySelector('main'); 
    main.classList.remove('hidden');
})


var countDownDate = new Date("Aug 14, 2022 10:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  countDay.innerText = days;
  countHour.innerText = hours;
  countMin.innerHTML = minutes;
  countSec.innerHTML = seconds;
  // For Large Screen
  countDay2.innerText = days;
  countHour2.innerText = hours;
  countMin2.innerHTML = minutes;
  countSec2.innerHTML = seconds;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    console.log("EXPIRED");
  }
}, 1000);


