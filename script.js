const textMangeMots = "Mange les mots!";
const textStop = "Stop!";

const textElement = document.getElementById("text");
const actionElement = document.getElementById("action");
const wordElement = document.getElementById("word_display");
const nbWordsPerMinutesElement = document.getElementById("nbWordsPerMinutes");
const nbLettersBonusElement = document.getElementById("nbLettersBonus");
const wordSizeElement = document.getElementById("wordSize");

actionElement.addEventListener("click", e => handleAction(e));

actionElement.textContent = textMangeMots;

let displayTimeInMs;
let nbLettersBonus;
let wordSize;

let current_index = 0;
let started = false;

updateParameters();

function updateParameters() {
  const nbWordsInMinutes = parseInt(nbWordsPerMinutesElement.value);
  displayTimeInMs = nbWordsInMinutes ? 60000 / nbWordsInMinutes : Number.MAX_SAFE_INTEGER;
  nbLettersBonus = parseInt(nbLettersBonusElement.value);
  wordSize = parseFloat(wordSizeElement.value);
}

function handleAction(event) {
  started = !started;
  if (started) {
    updateParameters();
    words = textElement.value.split(/(?:<br\s*\/?>|\s|&nbsp;)+/gi);
    textElement.style.display = "none";
    actionElement.textContent = textStop;
    current_index = 0;
    wordElement.style.fontSize = `${wordSize}rem`;
  }
  else
  {
    textElement.style.display = "block";
    actionElement.textContent = textMangeMots;
  }
  
  last_render = Date.now();
  gameLoop();
}

function gameLoop()
{
  const current_time = Date.now();
  const current_word = words[current_index];
  wordElement.textContent = current_word;
  if (current_time - last_render > getDisplayTimeInMs(current_word))
  {
    ++current_index;
    last_render = current_time;
  }
    
  if (started && current_index < words.length)
    window.requestAnimationFrame(gameLoop);

  function getDisplayTimeInMs(word) {
    const factor = Math.floor(word.length / nbLettersBonus) + 1;
    return factor * displayTimeInMs;
  }
}