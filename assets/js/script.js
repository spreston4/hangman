// Array 'wordPool' to pull word from
const wordPool = ['abruptly', 'length', 'subway', 'absurd', 'lucky', 'swivel', 'abyss', 'luxury', 'syndrome', 'funny', 'matrix', 'topaz', 'microwave', 'awkward', 'gnarly', 'beekeeper', 'blizzard', 'oxygen', 'bookworm', 'icebox', 'injury', 'puppy', 'wizard', 'vodka', 'wave', 'flapjack', 'knapsack', 'joyful', 'disavow', 'espionage'];

// Array 'letterPool' for input validation
const letterPool = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Empty arrays
let selectedWord =[];
let displayArray = [];
let guessedLetterArray = [];

// HTML elements
const displayWordEl = $('#display-word');
const guessLetterEl = $('#guess-letter');
const submitLetterEl = $('#submit-letter');
const guessedLettersEl = $('#guessed-letters');

// Function 'getWord' selects a random word from the 'wordPool'
const getWord = arr => {

    // Get random word from 'wordPool'
    selectedWord = arr[Math.floor(Math.random() * arr.length)].toUpperCase().split('');

    // Convert selected word to a hidden display
    for (let i = 0; i < selectedWord.length; i++) {
        displayArray[i] = '_'
    }

    // Send display to page
    renderWord(displayArray);

    
    // convertWord(selectedWord);
}

// Function 'convertWord' takes input from 'getWord' and outputs an array to display to the page
// const convertWord = word => {

//     for (let i = 0; i < word.length; i++) {
//         displayArray[i] = '_'
//     }
//     renderWord(displayArray);
// }

// Function 'renderWord' will diplay selected converted word to the page
const renderWord = arr => {
    displayWordEl.html(`
        <p>${arr.join(' ')}</p>
    `)
}

// Function 'guessLetter' takes a letter input from the form, searches word array
const guessLetter = event => {

    // Stop page reload
    event.preventDefault();

    // Get and reset userinput
    let letter = guessLetterEl.val().toUpperCase();
    guessLetterEl.val('');

    // Check for valid character input
    if (letterPool.includes(letter) === false) {
        console.log('Please select a valid character(A-Z)')
        return;
    }

    // Check for duplicates
    if (guessedLetterArray.includes(letter) === true) {
        console.log('Duplicate Detected');
        return;
    }

    // Check if correct guess
    for (let i = 0; i < selectedWord.length; i++) {
        if (letter === selectedWord[i]) {
            displayArray[i] = letter;
        }
    }

    // Render to page
    renderWord(displayArray);
    guessedLetterArray.push(letter);
    guessedLettersEl.html(`
        <p>${guessedLetterArray.join(' ')}</p>
    `);
}





// --------------------------------- Run Game --------------------------------- //

// Function init to load the page
getWord(wordPool);

// Listener
submitLetterEl.click(guessLetter);

