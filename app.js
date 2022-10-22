const word = document.querySelector(".word__wrapper");
const image = document.querySelector(".image__wrapper");
const livesLeft = document.querySelector(".livesLeft");
const modal__wrapper = document.querySelector(".modal__wrapper");
const overlay = document.querySelector(".answer__wrapper");
let letters = [];
let correctGuesses = []
let imageState = 1;
let life = 4
let hangmanWord
async function start() {
  const words = await fetch(`https://random-words-api.vercel.app/word/verb`);
  const wordsData = await words.json();
  hangmanWord = wordsData[0].word;
  let forceLowerCase_word =hangmanWord.toString().toLowerCase()
  image.innerHTML = changeImage(1);
  livesLeft.innerHTML = decreaseLife(life);
  console.log( forceLowerCase_word);
  letters =  forceLowerCase_word.split("");
  console.log(letters);
  correctGuesses = new Array(letters.length).fill("")
  word.innerHTML = letters.map(() => postDash()).join("");
}

start();


function buttonClicked() {
  let userGuess = document.getElementById("userInput").value;
  let forceLowerCase = userGuess.toString().toLowerCase()
  let x;
  
  console.log(forceLowerCase);
  if (letters.includes(forceLowerCase)) {
  
    for (x = 0; x < letters.length; x++) {
      if (letters[x] == forceLowerCase) {
        correctGuesses[x] = forceLowerCase
      }
    }
    if(JSON.stringify(letters) == JSON.stringify(correctGuesses)){
      image.innerHTML = wordComplete(6);
      setTimeout(() => {modal__wrapper.innerHTML = showModal_purple(),
        document.getElementById("cont").style.backgroundColor = "grey",
        document.getElementById("userInput").style.backgroundColor = "grey",
        document.getElementById("butt").style.backgroundColor = "grey",
        image.innerHTML = wordComplete(6.1);
        document.getElementById("butt").disabled = "true"}, 2500) 
    }
  } else {
    imageState++
    life--;
    image.innerHTML = changeImage(imageState)
    if(life == 1){
      setTimeout(() => { alert("Why are you so DUMB! I'm about to die")}, 1200)
      
    }
    if(life == 0){
      setTimeout(() => {image.innerHTML = gameOver()}, 2000) 
       //setTimeout(() => {overlay.innerHTML = showOverlay()}, 2500)
       setTimeout(() => {modal__wrapper.innerHTML = showModal(),
      document.getElementById("cont").style.backgroundColor = "grey",
      document.getElementById("userInput").style.backgroundColor = "grey",
      document.getElementById("butt").style.backgroundColor = "grey",
      document.getElementById("butt").disabled = "true"
    }, 3500)
  
    }
   
    livesLeft.innerHTML = decreaseLife(life) 
  }
  document.getElementById("userInput").value = ""
  showUserGuess()
}
function changeImage(state){
  return ` <img src="./states/${state}.PNG" class="hangman__image" alt="">`
}
function decreaseLife(life){
  return `<h2>Lives left: ${life}</h2>`
}
function gameOver(){
  return `<h1 class = "gameOver">Game Over</h1>
  <p class ="hangmanWord">The word is: ${hangmanWord}</p>`
}
function wordComplete(state){
  return ` <img src="./states/${state}.PNG" class="hangman__image" id ="state6__image"alt="">
  <h1 class = "complete">CONGRATULATIONS! you made it</h1>`
}

function postDash() {
  return ` <div class="dash"></div>`;
}
function postLetter(letter) {
  return `<div class="letter">${letter} </div>`;
}
function showUserGuess(){
  word.innerHTML = correctGuesses.map((element) => postLetter(element)).join("")
}
function refresh(){
  location.reload();
  return false
}
function showModal(){
  return `
  <div class="modal">
  <button id="modalID" class="playAgain" onclick="refresh()">Play again</button>
  </div> `
}
function showModal_purple(){
  return `
  <div class="modal">
  <button id="modalID" class="playAgain_purple" onclick="refresh()">Play again</button>
  </div> `
}
function showOverlay(){
  return ` 
  <div class="overlay"></div>
  `
}