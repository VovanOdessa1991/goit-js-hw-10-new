import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// datetime - picker;
let userDate;
// let novDate;
let timerInterval;
const refs = {
  picker: document.querySelector('#datetime-picker'),
  dataStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //  console.log(selectedDates[0]);

    //  novDate = new Date();
    //  console.log(novDate - userDate);
    //  timer();
    userSet(selectedDates[0]);
  },
});
function timer() {
  // console.log('sjadkasuhduh');
  refs.dataStart.setAttribute('disabled', '');
  refs.picker.setAttribute('disabled', '');
  const novDate = new Date();

  // console.log(refs.dataStart);
  let intervalId;
  let timerInterval = userDate - novDate;

  // //   console.log('timerStart');
  // setTimeout(() => {
  //   clearInterval(intervalId);
  // }, (timerInterval += 1000));

  intervalId = setInterval(() => {
    // timerInterval
    // console.log(timerInterval);

    timerWriter(convertMs(timerInterval));
    timerInterval -= 1000;
    if (timerInterval <= 0) {
      clearInterval(intervalId);
      stop();
    }
    console.log(timerInterval);
  }, 1000);
}

function userSet(userData) {
  const novDate = new Date();

  // console.log('даат время! ', convertMs(userData - novDate));

  if (novDate > userData) {
    console.log('Время должно быть больше настоящего!');
    // window.alert('Время должно быть больше настоящего!');
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
    });
    stop();
    return;
  }
  start(userData);
  // novDate = null;
}
function start(userData) {
  refs.dataStart.removeAttribute('disabled');
  refs.dataStart.addEventListener('click', timer);
  userDate = userData;
}

function stop() {
  refs.dataStart.removeEventListener('click', timer);
  refs.dataStart.setAttribute('disabled', '');
  refs.picker.removeAttribute('disabled');
  userDate = null;
}

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

function timerWriter(time) {
  console.log(time);
  console.log(time.seconds);
  let days = time.days;
  let hours = time.hours;
  let minutes = time.minutes;
  let seconds = time.seconds;
  // console.log('Тестовое время', timeTest.toString().padStart(2, '0'));

  refs.days.textContent = days.toString().padStart(2, '0');
  refs.hours.textContent = hours.toString().padStart(2, '0');
  refs.minutes.textContent = minutes.toString().padStart(2, '0');
  refs.seconds.textContent = seconds.toString().padStart(2, '0');
}
