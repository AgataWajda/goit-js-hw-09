import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';
import "flatpickr/dist/flatpickr.min.css";
import "../css/02-timer.css" ;

const datePicker = document.querySelector("#datetime-picker") ;
const startBtn = document.querySelector("button[data-start]") ;

const timerDays = document.querySelector("span[data-days]") ;
const timerHours = document.querySelector("span[data-hours]") ;
const timerMinutes = document.querySelector("span[data-minutes]") ;
const timerSeconds = document.querySelector("span[data-seconds]") ;
let timer = null ;

startBtn.setAttribute("disabled", "") ;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(selectedDates[0].getTime() < options.defaultDate.getTime()) {
        Report.failure(
          'Date from past',
          'Please choose a date in the future',
          'Okay',
          );
      } 
      else {
        startBtn.removeAttribute("disabled") ;
        startBtn.addEventListener("click" ,() => {
          clearInterval(timer) ;
           timer = setInterval (() => {
            const currentDate = new Date() ;
            let equal = selectedDates[0].getTime() - currentDate.getTime() ;
            if(equal < 1000) {
              clearInterval(timer) ;
              timerDays.textContent = "00" ;
              timerHours.textContent = "00" ;
              timerMinutes.textContent = "00" ;
              timerSeconds.textContent = "00" ;
            } else {
              const dataObj = convertMs(equal) ;
              let {days, hours, minutes, seconds} = dataObj ;
              timerDays.textContent = days.toString().padStart(2 , '0') ;
              timerHours.textContent = hours.toString().padStart(2 , '0') ;
              timerMinutes.textContent = minutes.toString().padStart(2 , '0') ;
              timerSeconds.textContent = seconds.toString().padStart(2 , '0') ;}
          } , 1000)  
          
        })
      }
    },
  };

flatpickr(datePicker , options) ;

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
  // Remaining days
    const days = Math.floor(ms / day);
  // Remaining hours
    const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

