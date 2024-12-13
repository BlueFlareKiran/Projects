let balance = 0;

const depositInput = document.getElementById("deposit");
const depositButton = document.getElementById("depositButton");
const balanceDisplay = document.getElementById("balance");

const linesInput = document.getElementById("lines");
const betInput = document.getElementById("bet");
const spinButton = document.getElementById("spinButton");
const resultDisplay = document.getElementById("result");

const gameSection = document.getElementById("game-section");
const slotMachine = document.getElementById("slot-machine");
const reels = document.querySelectorAll(".reel");

const spinSound = document.getElementById("spin-sound");
const winSound = document.getElementById("win-sound");

// Deposit money
depositButton.addEventListener("click", () => {
    const depositAmount = parseFloat(depositInput.value);
    if (!isNaN(depositAmount) && depositAmount > 0) {
        balance += depositAmount;
        updateBalance();
        depositInput.value = "";
        gameSection.style.display = "block";
    } else {
        alert("Enter a valid deposit amount!");
    }
});

// Spin the slot machine
spinButton.addEventListener("click", () => {
    const lines = parseInt(linesInput.value);
    const bet = parseFloat(betInput.value);

    if (isNaN(lines) || lines < 1 || lines > 3 || isNaN(bet) || bet <= 0 || bet * lines > balance) {
        alert("Invalid bet or number of lines!");
        return;
    }

    balance -= bet * lines;
    updateBalance();

    spinSound.play();

    const results = spin();
    animateReels(results);
    const winnings = calculateWinnings(results, lines, bet);
    balance += winnings;
    updateBalance();

    if (winnings > 0) {
        winSound.play();
    }

    resultDisplay.textContent = winnings > 0 ? `You won $${winnings}!` : "No win this time!";
});

// Update the balance display
function updateBalance() {
    balanceDisplay.textContent = `Coins: $${balance}`;
}

// Spin the reels
function spin() {
    const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];
    const results = [];

    for (let i = 0; i < 3; i++) {
        const reelResults = [];
        for (let j = 0; j < 3; j++) {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reelResults.push(randomSymbol);
        }
        results.push(reelResults);
    }
    return results;
}

// Animate the reels
function animateReels(results) {
    reels.forEach((reel, i) => {
        const reelContent = results[i]
            .map((symbol) => `<div>${symbol}</div>`)
            .join("");
        reel.innerHTML = reelContent;

        const symbols = reel.querySelectorAll("div");
        symbols.forEach((symbol) => {
            symbol.style.top = `${Math.random() * -150}px`;
            symbol.style.animation = "spin 1s ease-in-out";
        });
    });
}

// Calculate winnings
function calculateWinnings(results, lines, bet) {
    const symbolValues = { "🍒": 5, "🍋": 4, "🍊": 3, "🍉": 2, "🍇": 1 };
    let winnings = 0;

    for (let i = 0; i < lines; i++) {
        if (results[0][i] === results[1][i] && results[1][i] === results[2][i]) {
            winnings += bet * symbolValues[results[0][i]];
        }
    }
    return winnings;
}