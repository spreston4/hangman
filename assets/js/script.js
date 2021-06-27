// Array 'wordPool' to pull word from
const wordPool = ['abruptly', 'length', 'subway', 'absurd', 'lucky', 'swivel', 'abyss', 'luxury', 'syndrome', 'funny', 'matrix', 'topaz', 'microwave', 'awkward', 'gnarly', 'beekeeper', 'blizzard', 'oxygen', 'bookworm', 'icebox', 'injury', 'puppy', 'wizard', 'vodka', 'wave', 'flapjack', 'knapsack', 'joyful', 'disavow', 'espionage'];

// Array 'letterPool' for input validation
const letterPool = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Game control variables
let guessCount = 10;

// Empty arrays
let selectedWord =[];
let displayArray = [];
let guessedLetterArray = [];

// HTML elements
const displayWordEl = $('#display-word');
const guessLetterEl = $('#guess-letter');      // Form Input (future delete)
const submitLetterEl = $('#submit-letter');    // Form Submit Button (future delete)
const guessedLettersEl = $('#guessed-letters');
const guessesRemainingEl = $('#remaining-guesses');

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

    console.log(selectedWord);
}

// Function 'renderWord' will diplay selected converted word to the page
const renderWord = arr => {
    displayWordEl.html(`
        <p>${arr.join(' ')}</p>
    `);
}

// Function 'renderGuesses' will display guessed characters to the page
const renderGuesses = arr => {
    guessedLettersEl.html(`
    <p>${arr.join(' ')}</p>
`);
}

// Function 'renderRemaining' will display number of remaining guesses to the page
const renderRemaining = num => {
    guessesRemainingEl.html(`
        <p>Remaining Guesses: ${num}</p>
    `)
}

// Function 'guessLetter' takes a letter input from the form, searches word array
const guessLetter = event => {

    // Stop page reload
    event.preventDefault();

    // Get and reset userinput
    let letter = guessLetterEl.val().toUpperCase();
    guessLetterEl.val('');

    let correctGuess = null;

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
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        guessCount--;
    }

    // Remember guessed letter
    guessedLetterArray.push(letter);

    // Render to page
    renderWord(displayArray);
    renderGuesses(guessedLetterArray);
    renderRemaining(guessCount)

    // Check on game status
    checkGameStatus(guessCount, displayArray, selectedWord);
}

// Function 'checkGameStatus' will determine if the user has reached the end of the game
const checkGameStatus = (count, display, word) => {

    // Determine if out of guesses
    if (display.join('') === word.join('')) {
        endGame(true);
    } else if (count === 0) {
        endGame(false);
    } else if (count === 1) {
        console.log('One Guess Remaining');
    }
}

// Function 'endGame' handles all end game activities
const endGame = status => {
    if (status) {
        console.log('You Win!')
    } else {
        console.log('You Lose!');
    }
}





// --------------------------------- Run Game --------------------------------- //

// Function init to load the page
getWord(wordPool);

// Listener
submitLetterEl.click(guessLetter);

