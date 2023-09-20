const body = document.querySelector("body") ;
const startBtn = document.querySelector("button[data-start]") ;
const stopBtn = document.querySelector("button[data-stop]") ;
let intervalColors  = null ;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } ;

  stopBtn.setAttribute("disabled" , "") ;

  startBtn.addEventListener ("click" , () => {
    intervalColors = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor() ; 
  } , 1000) ;
  startBtn.setAttribute("disabled" , "") ;
  stopBtn.removeAttribute("disabled") ;
  }) ;

  stopBtn.addEventListener ("click" , () => {
    clearInterval(intervalColors) ;
    startBtn.removeAttribute("disabled") ;
    stopBtn.setAttribute("disabled" , "") ;
  })

