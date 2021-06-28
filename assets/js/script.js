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

// HTML elements refrenced more than once
const guessLetterEl = $('#guess-letter');      // Form Input (future delete)
const submitLetterEl = $('#submit-letter');    // Form Submit Button (future delete)
const displayWordCont = $('#display-word-container');
const resultsCont = $('#results-container');
const resetCont = $('#reset-game-container');
const showButtonEl = $('#show-button');
const contentCont = $('#content-container');
const drawingCont = $('#hanging-man');

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
    renderRemaining(guessCount);
}

// Function 'renderWord' will diplay selected converted word to the page
const renderWord = arr => {
    $('#display-word').html(`
        <p class="title is-size-1">${arr.join(' ')}</p>
    `);
}

// Function 'renderGuesses' will display guessed characters to the page
const renderGuesses = arr => {
    $('#guessed-letters').html(`
    <h2 class="subtitle">${arr.join(' ')}</h2>
`);
}

// Function 'renderRemaining' will display number of remaining guesses to the page
const renderRemaining = num => {
    $('#remaining-guesses').html(`
        <h2 class="subtitle">${num}</h2>
    `)
}

// Function 'guessLetter' takes a letter input from the form, searches word array
const guessLetter = event => {

    // Stop page reload
    event.preventDefault();

    // Get and reset userinput
    let letter = guessLetterEl.val().toUpperCase();
    guessLetterEl.val('');

    let correctGuess = false;

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
    checkGameStatus(guessCount, displayArray, selectedWord, correctGuess);
}

// Function 'checkGameStatus' will determine if the user has reached the end of the game & draw hanging man
const checkGameStatus = (count, display, word, guess) => {

    // Determine if out of guesses
    if (display.join('') === word.join('')) {
        endGame(true);
    } else if (count === 0) {
        endGame(false);
        drawingCont.append(`
            <div class="right-eye-one"></div>
            <div class="right-eye-two"></div>
        `)

        $('#arm-right').removeClass('right-arm')
        $('#arm-right').addClass('right-arm-stop')

        $('#arm-left').removeClass('left-arm')
        $('#arm-left').addClass('left-arm-stop')

    } else if (count === 1 && !guess) {
        drawingCont.append(`
            <div class="left-eye-one"></div>
            <div class="left-eye-two"></div>
        `)
    } else if (count === 2 && !guess) {
        drawingCont.append(`
            <div class="right-foot"></div>
        `)
    } else if (count === 3 && !guess) {
        drawingCont.append(`
            <div class="right-leg"></div>
        `)
    } else if (count === 4 && !guess) {
        drawingCont.append(`
            <div class="left-foot"></div>
        `)
    } else if (count === 5 && !guess) {
        drawingCont.append(`
            <div class="left-leg"></div>
        `)
    } else if (count === 6 && !guess) {
        drawingCont.append(`
            <div id="arm-right" class="right-arm"></div>
        `)
    } else if (count === 7 && !guess) {
        drawingCont.append(`
            <div id="arm-left" class="left-arm"></div>
        `)
    } else if (count === 8 && !guess) {
        drawingCont.append(`
            <div class="torso"></div>
        `)
    } else if (count === 9 && !guess) {
        drawingCont.append(`
            <div class="head"></div>
        `)
    }
}

// Function 'endGame' handles all end game activities
const endGame = status => {

    // Toggle required containers
    toggleVisibility(contentCont)
    toggleVisibility(resultsCont);
    toggleVisibility(resetCont);

    // Display result to page
    if (status) {
        resultsCont.html(`
        <h1 class="title">You Win!</h1>
        `);
    } else {
        resultsCont.html(`
        <h1 class="title">You Lose!</h1>
        `);
        toggleVisibility(showButtonEl)
    }
}

// Function 'toggleVisibility' will flip elements from hidden to visible and vice versa
const toggleVisibility = element => {

    if (element.attr('data-vis') == 'visible') {
        element.removeClass('visible');
        element.addClass('hidden');
        element.attr('data-vis', 'hidden')
    } else {
        element.removeClass('hidden');
        element.addClass('visible');
        element.attr('data-vis', 'visible');
    }
}

// Function 'startGame' clears the welcome screen and starts the game
const startGame = () => {
    
    // Show & hide correct containers
    toggleVisibility($('#welcome-container'));
    toggleVisibility(displayWordCont);
    toggleVisibility(contentCont);

    // Start Game
    getWord(wordPool);
}

// Function 'resetGame' restarts the game
const resetGame = () => {
    // Reset Variables
    guessCount = 10;
    displayArray.length = 0;
    selectedWord.length = 0;
    guessedLetterArray.length = 0;
    
    // Toggle correct containers
    toggleVisibility(contentCont);
    toggleVisibility(resetCont);
    toggleVisibility(resultsCont);

    // Reset HTML
    renderGuesses(guessedLetterArray);
    renderRemaining(guessCount)
    drawingCont.html(`
        <!-- Render on Load -->
        <div class="left-frame"></div>
        <div class="top-frame"></div>
        <div class="cross-frame"></div>
        <div class="bottom-frame"></div>
        <div class="rope"></div>
        <div class="lash-one"></div>
        <div class="lash-two"></div>
        <div class="knot-one"></div>
        <div class="knot-two"></div>
        <div class="knot-three"></div>
    `)

    showButtonEl.attr('data-vis', 'hidden');
    showButtonEl.removeClass('visible');
    showButtonEl.addClass('hidden');

    // Start Game
    getWord(wordPool);
}

// Function 'revealWord' will show the selected word 
const revealWorld = () => {
    renderWord(selectedWord);
}

// --------------------------------- Run Game --------------------------------- //

// Listener
$('#start-button').click(startGame);
submitLetterEl.click(guessLetter);
$('#play-again').click(resetGame);
showButtonEl.click(revealWorld);

