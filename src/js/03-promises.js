import Notiflix from 'notiflix'; 

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

const form = document.querySelector('.form');


form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(form.elements.delay.value); 
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  let position = 1;                   
  let currentDelay = delay;

              
     for(let i = 1 ; i <= amount ; i++) {
      createPromise(position, currentDelay)
        
        .then(({ position, delay }) => {       
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${delay}ms`
          );
        }) 
        
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
        position++;                        
          currentDelay += step;
    }})

