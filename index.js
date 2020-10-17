const message = document.getElementById("game-message");
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");
const player1DiceRoll = document.getElementById("player1-dice-roll");
const player2DiceRoll = document.getElementById("player2-dice-roll");
const rollDiceBtn = document.getElementById("roll-dice-button");
const resetGameBtn = document.getElementById("reset-game-button");
const doubleNothingBtn = document.getElementById("double-nothing-button");

const pickAplayer = () => {
    let playerAnswer = prompt("Pick Heads or Tales", "Heads").toLowerCase();
    let random = Math.round(Math.random());
    console.log(random);
    if (playerAnswer === "heads" && random === 0 || playerAnswer === "tales" && random === 1) {
        player1Turn = true;
        player2DiceRoll.classList.remove("current");
        player1DiceRoll.classList.add("current");
    } else {
        player1Turn = false
        message.textContent = "Player 2 Turn";
        player2DiceRoll.classList.add("current");
        player1DiceRoll.classList.remove("current");
    }
}

const randomNum = () => {
    return Math.floor(Math.random() * (6 - 1 +1) +1)
}

const checkWinner = () => {
    if (player1Score  >= 20|| player2Score >= 20) {
        rollDiceBtn.classList.remove("active");
        rollDiceBtn.classList.add("inactive");
        resetGameBtn.classList.remove("inactive");
        resetGameBtn.classList.add("active");
        doubleNothingBtn.classList.add("inactive");
        if (player1Score >= 20) {
            message.textContent = "Player 1 is your winner! 🎉";
        } else if (player2Score >= 20){
            message.textContent = "Player 2 is your winner! 🎉";
        }
    }
}

const resetGame = () => {
    player1Score = 0;
    player2Score = 0;
    player1ScoreDisplay.textContent = 0;
    player2ScoreDisplay.textContent = 0;
    player1DiceRoll.textContent = "-";
    player2DiceRoll.textContent = "-";
    message.textContent = "Player 1 Turn"
    rollDiceBtn.classList.remove("inactive");
    rollDiceBtn.classList.add("active");
    resetGameBtn.classList.remove("active");
    resetGameBtn.classList.add("inactive");
    doubleNothingBtn.classList.remove("inactive");
    pickAplayer();
}

const addScore = () => {
    if (player1Turn) {
        player1ScoreDisplay.textContent = player1Score;
        player1DiceRoll.classList.remove("current");
        player2DiceRoll.classList.add("current");
        message.textContent = "Player 2 Turn";
        player1Turn = false;
    } else {
        player2ScoreDisplay.textContent = player2Score;
        player2DiceRoll.classList.remove("current");
        player1DiceRoll.classList.add("current");
        message.textContent = "Player 1 Turn";
        player1Turn = true;
    }
}

rollDiceBtn.addEventListener("click", function() {
    let currentNum = 0;
    if(player1Turn) {
        currentNum = randomNum()
        player1Score += currentNum;
        player1DiceRoll.textContent = currentNum;
    } else {
        currentNum = randomNum();
        player2Score += currentNum;
        player2DiceRoll.textContent = currentNum;
    }
    addScore();
    checkWinner();
})

resetGameBtn.addEventListener("click", resetGame);

doubleNothingBtn.addEventListener("click", function() {
    const doubleNum = Math.floor(Math.random() * (7 - 1 +1));
    if (doubleNum > 0) {
        if(player1Turn) {
            player1Score *= doubleNum;
            player1DiceRoll.textContent = doubleNum;
        } else {
            player2Score *= doubleNum;
            player2DiceRoll.textContent = doubleNum;
        }
        addScore();
        checkWinner();
    } else {
        if (player1Turn) {
            player1Score = 0;
            player1DiceRoll.textContent = doubleNum;
        } else {
            player2Score = 0;
            player2DiceRoll.textContent = doubleNum;
        }
        addScore();
    }
})