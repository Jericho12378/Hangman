const word = document.querySelector(".word__wrapper");
const image = document.querySelector(".image__wrapper");
const livesLeft = document.querySelector(".livesLeft")
let letters = [];
let correctGuesses = []
let imageState = 1;
let life = 4
let hangmanWord
async function getWords() {
  const words = await fetch(`https://random-word-api.herokuapp.com/word`);
  const wordsData = await words.json();

  hangmanWord = wordsData[0];
  image.innerHTML = changeImage(1);
  livesLeft.innerHTML = decreaseLife(life);
  console.log(hangmanWord);
  letters = hangmanWord.split("");
  console.log(letters);
  correctGuesses = new Array(letters.length).fill("")
  word.innerHTML = letters.map(() => postDash()).join("");
}

getWords();


function buttonClicked() {
  let userGuess = document.getElementById("userInput").value;
  let x;
  
  console.log(userGuess);
  if (letters.includes(userGuess)) {
  
    for (x = 0; x < letters.length; x++) {
      if (letters[x] == userGuess) {
        correctGuesses[x] = userGuess
      }
    }
    if(JSON.stringify(letters) == JSON.stringify(correctGuesses)){
      image.innerHTML = wordComplete();
    }
  } else {
    imageState++
    life--;
    image.innerHTML = changeImage(imageState)
    if(life == 0){
      image.innerHTML = gameOver()
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
function wordComplete(){
  return ` <img src="./states/6.PNG" class="hangman__image" alt="">
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