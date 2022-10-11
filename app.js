const word = document.querySelector(".word__wrapper")
let letters = {}
async function getWords(){
    let x = Math.floor(Math.random() * 5);
    const words = await fetch(`https://random-word-api.herokuapp.com/word`)
    const wordsData = await words.json();

    let hangmanWord = wordsData[0]
  
    console.log(hangmanWord)
    letters = hangmanWord.split('')
    console.log(letters)
    
   // word.innerHTML = letters
    
        word.innerHTML = letters.map((element) => postDash(element)).join("")
      
}

getWords()

function postDash(){
    return ` <div class="dash"></div>`
}   
function postLetter(letter){
    return`<div class="letter">${letter} </div>`
}

function buttonClicked(){
    let userGuess = document.getElementById("userInput").value;
    console.log(userGuess)
    if(letters.includes(userGuess)){
        const indexes = []
        for (let index = 0; index < letters.length; index++) {
            if (letters[index] === userGuess) {
              indexes.push(index);
            }
          }
          console.log(indexes)
    }else{
        console.log(false)
    }
    
}