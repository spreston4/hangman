// Declare array 'wordPool' of words tp pull from
const wordPool = ['abruptly', 'length', 'subway', 'absurd', 'lucky', 'swivel', 'abyss', 'luxury', 'syndrome', 'funny', 'matrix', 'topaz', 'microwave', 'awkward', 'gnarly', 'beekeeper', 'blizzard', 'oxygen', 'bookworm', 'icebox', 'injury', 'puppy', 'wizard', 'vodka', 'wave', 'flapjack', 'knapsack', 'joyful', 'disavow', 'espionage'];

// Function 'getWord' selects a random word from the 'wordPool'
const getWord = arr => {
    let word = arr[Math.floor(Math.random() * arr.length)];
    console.log(word);
}









// Function init to load the page
getWord(wordPool);


