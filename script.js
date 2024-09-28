const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {
    const index = this.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) {
        return;
    }
    updateBoard(this, index);
    checkResult();
}

function updateBoard(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}
