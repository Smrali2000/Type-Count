// Function to execute when window loads
window.addEventListener('load', init());

// DOM variables
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
var bodyColor = document.querySelector('#level-body');
function levelEasy(){
    bodyColor.style.backgroundColor = '#9A0A13';
    bodyColor.style.color = 'white';
    seconds.style.color = '#FEDE00';
    const title_div = document.createElement('div');
    const title = document.createElement('h1');
    title_div.appendChild(title);
    title.innerText = 'Level Easy';
    title.style.fontSize = '60px';
    title_div.style.position = "absolute";
    title_div.style.top = "100px";
    title_div.style.width = '100%';
    title.style.textAlign = "center";
    const lead = document.querySelector('#content');
    content.insertBefore(title, lead.children[0]);
    let easy = 7;   
    return easy;
}
function levelMedium(){
    bodyColor.style.backgroundColor = '#FEDE00';
    seconds.style.color = '#007500';
    const title_div = document.createElement('div');
    const title = document.createElement('h1');
    title_div.appendChild(title);
    title.innerText = 'Level Medium';
    title.style.fontSize = '60px';
    title_div.style.position = "absolute";
    title_div.style.top = "100px";
    title_div.style.width = '100%';
    title.style.textAlign = "center";
    const lead = document.querySelector('#content');
    content.insertBefore(title, lead.children[0]);
    let medium = 5;
    return medium;
}
function levelHard(){
    bodyColor.style.backgroundColor = '#007500';
    bodyColor.style.color = 'white';
    seconds.style.color = '#FEDE00';
    const title_div = document.createElement('div');
    const title = document.createElement('h1');
    title_div.appendChild(title);
    title.innerText = 'Level Difficult';
    title.style.fontSize = '60px';
    title_div.style.position = "absolute";
    title_div.style.top = "100px";
    title_div.style.width = '100%';
    title.style.textAlign = "center";
    const lead = document.querySelector('#content');
    content.insertBefore(title, lead.children[0]);
    // document.body.appendChild(title);
    let hard = 3;
    return hard;
}
let currentLevel = levelEasy();
let time = currentLevel;
let score = 0;
let isPlaying;
// Set time span of the current level
seconds.innerText = currentLevel;

// Get random words using fetch API 
const wordAPI = 'https://random-word-api.herokuapp.com/word?number=500'
function randomWord() {
    return fetch(wordAPI)
        .then(response => response.json())
        .then(data => data[0])
        .catch(error => {
            console.log(error)
        })
}
async function nextWord() {
    const word = await randomWord()
    currentWord.innerText = word
    wordInput.value = null
}
nextWord()
// Function to get random words ends here

//function to check spelling and set condition in case it matches
wordInput.addEventListener('input', match);

function match(){
    if(spellCheck()){
        isPlaying = true;
        time = currentLevel + 1;
        nextWord();
        wordInput.value = '';
        score++;
    }
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }
    else scoreDisplay.innerHTML = score;
}
function spellCheck(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Success!!! you did well...';
        return true;
    }
    else{
        message.innerHTML = '';
        return false;
    }
}
//Function to timer and game status
function init(){
    setInterval (countdown, 1000);
    setInterval (checkStatus, 50);
}

function countdown(){
    if(time > 0){
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Oops! Game over...';
        score = -1;
    }
}