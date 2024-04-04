'use strict';

const wordOutput = document.querySelector('h2');
const input = document.querySelector('.input');

const border = document.getElementById('border');
const counterText = document.getElementById('counter');
const button = document.getElementById('start-count');

const game = document.querySelector('.game');
const finished = document.querySelector('.finished');
const hits = document.querySelector('.hits');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const score = document.querySelector('.score');


const gameSound = new Audio('./assets/audio/game-music.mp3')
gameSound.type = 'audio/mp3'
gameSound.volume = 0.5;

const correctSound = new Audio('./assets/audio/correct.mp3')
correctSound.type = 'audio/mp3'

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let currentWordIndex = 0;
let completedWords = 0;

function shuffleArray(words) {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
}
const shuffledWords = shuffleArray([...words]);

function displayNextWord() {
  wordOutput.textContent = shuffledWords[currentWordIndex].toUpperCase();
}


// INPUT - SHUFFLE - HITS
input.addEventListener('input', function() {
  const inputValue = this.value.trim().toLowerCase();
  const correctValue = shuffledWords[currentWordIndex];

  if (inputValue === correctValue) {
    this.value = ''; // Clear the input field
    currentWordIndex++;
    completedWords++
    hits.innerText = `Hits: ${completedWords}`

    if (currentWordIndex < shuffledWords.length) {
      correctSound.play()
      displayNextWord();
    } else {
      game.classList.add("done")
    }
  }
});

// TIMER/ANIMATION
let counter = 99;
const duration = 99000;
const increment = duration / counter;

function startCountdown(timestamp) {
  let startTime = timestamp;
  let elapsedTime = 0;

  function animate(timestamp) {
    elapsedTime = timestamp - startTime;

    if (elapsedTime < duration) {                 // counter animation
      const progress = elapsedTime / duration;
      const dashArray = (1 - progress) * 579.73;
      border.style.strokeDasharray = `${dashArray} 579.73`;
      counterText.textContent = Math.ceil(counter - (counter * progress));
      if (counterText.textContent <= 20) {
        border.classList.add("visible")
      }
      requestAnimationFrame(animate);
    } else {                                      // Reset counter
      border.style.strokeDasharray = '0 579.73';
      counterText.textContent = '0';
      counter = 99; 
      finished.classList.add("visible");
      game.classList.remove("visible");
      gameSound.pause();
    }
  }
  requestAnimationFrame(animate);
}
// PLAY
button.addEventListener('click', function() {
  start.classList.add("visible")
  game.classList.add("visible")
  requestAnimationFrame(startCountdown);
  displayNextWord();
  input.focus();
  gameSound.play();
});
// RESET
function restartGame() {
  input.value = ''

  requestAnimationFrame(startCountdown);
  border.style.strokeDasharray = '579.73';
  counterText.textContent = 99;
  counter = 99; 
  
  finished.classList.remove("visible");
  game.classList.add("visible");
  
  gameSound.currentTime = 0;
  gameSound.play();
  
  hits.innerText = 'Hits: 0';
  completedWords = 0

  currentWordIndex = 0;
  displayNextWord();

  input.focus();
}
restart.addEventListener('click', restartGame)