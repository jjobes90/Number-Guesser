
// Game variables
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI variables
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max numbers
minNum.textContent = min;
maxNum.textContent = max;

// Add event listener for play again
guessBtn.addEventListener('click', function (e) {

    if (e.target.textContent === 'Play Again?') {
        window.location.reload();
    }
});

// Listen for Guess
guessBtn.addEventListener('click', function () {

    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`);
    }

    // Check if guess is correct
    if (guess === winningNum) {

        guessInput.style.borderColor = 'green';
        gameOver(true, `${winningNum} is correct! You win!`)

    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {

            gameOver(false, `Game over. The correct number was ${winningNum}.`)
        } else {
            // Clear input
            guessInput.value = '';
            guessInput.style.borderColor = 'red';

            // Add higher hint
            if (guess < winningNum) {
                setMessage(`Guess higher. You have ${guessesLeft} remaining.`);
            }

            // Add lower hint
            if (guess > winningNum) {
                setMessage(`Guess lower. You have ${guessesLeft} remaining.`);
            }
        }
    }
});

function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;

    // Set border style and output message
    guessInput.style.borderColor = color;
    setMessage(msg);

    // Set guess button to 'play again'?
    guessBtn.textContent = "Play Again?";
}

// Get winning number

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg) {

    message.textContent = msg;
}
