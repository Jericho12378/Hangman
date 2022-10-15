const word = document.querySelector(".word__wrapper");
const image = document.querySelector(".image__wrapper")
let letters = {};
let correctGuesses = []
let imageState = 1;
async function getWords() {
  const words = await fetch(`https://random-word-api.herokuapp.com/word`);
  const wordsData = await words.json();

  let hangmanWord = wordsData[0];
  image.innerHTML = changeImage(1)
  console.log(hangmanWord);
  letters = hangmanWord.split("");
  console.log(letters);
  correctGuesses = new Array(letters.length).fill("")
  word.innerHTML = letters.map(() => postDash()).join("");
}

getWords();

function postDash() {
  return ` <div class="dash"></div>`;
}
function postLetter(letter) {
  return `<div class="letter">${letter} </div>`;
}
function showUserGuess(){
  word.innerHTML = correctGuesses.map((element) => postLetter(element)).join("")
}
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
  } else {
    imageState++
    image.innerHTML = changeImage(imageState)
  }
  //console.log(correctGuesses)
  showUserGuess()
}
function changeImage(state){
  return ` <img src="./states/${state}.PNG" class="hangman__image" alt="">`
}
