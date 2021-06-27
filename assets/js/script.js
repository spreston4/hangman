// Declare array 'wordPool' of words tp pull from
const wordPool = ['abruptly', 'length', 'subway', 'absurd', 'lucky', 'swivel', 'abyss', 'luxury', 'syndrome', 'funny', 'matrix', 'topaz', 'microwave', 'awkward', 'gnarly', 'beekeeper', 'blizzard', 'oxygen', 'bookworm', 'icebox', 'injury', 'puppy', 'wizard', 'vodka', 'wave', 'flapjack', 'knapsack', 'joyful', 'disavow', 'espionage'];

let displayArray = [];

const displayWordEl = $('#display-word');

// Function 'getWord' selects a random word from the 'wordPool'
const getWord = arr => {
    let selectedWord = arr[Math.floor(Math.random() * arr.length)].toUpperCase().split('');
    convertWord(selectedWord);

    console.log('Selected word:');
    console.log(selectedWord);
}

// Function 'convertWord' takes input from 'getWord' and outputs an array to display to the page
const convertWord = word => {

    for (let i = 0; i < word.length; i++) {
        displayArray[i] = '_'
    }
    renderWord(displayArray);

    console.log('Display array: ');
    console.log(displayArray);
}

// Function 'renderWord' will diplay selected converted word to the page
const renderWord = arr => {
    displayWordEl.html(`
        <p>${arr.join(' ')}</p>
    `)

}









// Function init to load the page
getWord(wordPool);


