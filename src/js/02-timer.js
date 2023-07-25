import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const spanDay = document.querySelector("[data-days]");
const spanHour = document.querySelector("[data-hours]");
const spanMinute = document.querySelector("[data-minutes]");
const spanSecond = document.querySelector("[data-seconds]");
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        const date = new Date();
        if (selectedDates[0] > date) {
            startBtn.disabled = false;
        }
        else {
            Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        }
    },
};

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
};

const fp = flatpickr(input, options);
fp.clear();


const handleStart = () => {
    const finalDate = Date.parse(input.value);
    startBtn.disabled = true;
    input.disabled = true;

    if(finalDate - Date.now() <= 0){
        return
    }
    else {
        const timerId = setInterval(() => {
            const spanTime = finalDate - Date.now();
            const valueTime = convertMs(spanTime);
            spanDay.textContent = valueTime.days < 10 ? "0"+valueTime.days : valueTime.days;
            spanHour.textContent = valueTime.hours < 10 ? "0"+valueTime.hours : valueTime.hours;
            spanMinute.textContent = valueTime.minutes < 10 ? "0"+valueTime.minutes : valueTime.minutes;
            spanSecond.textContent = valueTime.seconds < 10 ? "0"+valueTime.seconds : valueTime.seconds;

            if(convertMs(spanTime).days == 0 && 
            convertMs(spanTime).hours == 0 &&
            convertMs(spanTime).minutes == 0 &&
            convertMs(spanTime).seconds == 0) {
                clearInterval(timerId);
                startBtn.disabled = false;
                input.disabled = false;
                fp.clear();

            }
        }, 1000);
    }
};

startBtn.addEventListener("click", handleStart);

