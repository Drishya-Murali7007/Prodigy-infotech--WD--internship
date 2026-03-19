let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameState = "IDLE"; // IDLE, ONGOING, WIN, DRAW
let mode = ""; // PVP or AI

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function startGame(selectedMode) {
    mode = selectedMode;
    resetGame();
    gameState = "ONGOING";
    statusDisplay.innerText = `Mode: ${mode} | Player X's Turn`;
}

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || gameState !== "ONGOING") return;

    makeMove(index, currentPlayer);

    if (mode === "AI" && gameState === "ONGOING" && currentPlayer === "O") {
        setTimeout(aiMove, 400); // slight delay for realism
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].innerText = player;

    updateGameState();
}

function updateGameState() {
    let winningCombo = null;

    for (let combo of winningConditions) {
        const [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningCombo = combo;
            break;
        }
    }

    if (winningCombo) {
        gameState = "WIN";
        statusDisplay.innerText = `Player ${currentPlayer} Wins!`;

        winningCombo.forEach(i => cells[i].classList.add("win"));
        return;
    }

    if (!board.includes("")) {
        gameState = "DRAW";
        statusDisplay.innerText = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Mode: ${mode} | Player ${currentPlayer}'s Turn`;
}

function aiMove() {
    let bestMove = getBestMove();
    makeMove(bestMove, "O");
}

// Basic AI logic (win > block > random)
function getBestMove() {

    // 1. Try to WIN
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (checkWin("O")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 2. BLOCK player
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "X";
            if (checkWin("X")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 3. Random move
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

function checkWin(player) {
    return winningConditions.some(([a,b,c]) =>
        board[a] === player && board[b] === player && board[c] === player
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameState = "IDLE";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });

    statusDisplay.innerText = "Choose a mode to start";
}