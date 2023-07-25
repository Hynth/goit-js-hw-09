import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      };
    }, delay);
  });
}

const form = document.querySelector(".form");

const handleForm = (event) => {
  event.preventDefault();

  const {
    elements: {delay, step, amount}
  } = event.currentTarget;

  const nPromises = parseInt(amount.value);
  let nDelay = parseInt(delay.value);
  const nStep = parseInt(step.value);

  for (let i = 1; i <= nPromises; i++) {
    
    createPromise(i, nDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    nDelay += nStep;
  }
};

form.addEventListener("submit", handleForm);


