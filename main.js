
let currentPlayer = 'X'; 
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];
let gameActive = true;


const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset-button');


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) return;

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Turno: ${currentPlayer}`;
}

function checkResult() {
    let roundWon = false;

    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultDisplay.textContent = `¡Jugador ${currentPlayer} gana!`;
        resultDisplay.style.color = '#27ae60'; // Verde
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        resultDisplay.textContent = '¡Empate!';
        resultDisplay.style.color = '#e67e22';
        gameActive = false;
        return;
    }

    changePlayer();
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.textContent = '';
    turnDisplay.textContent = `Turno: ${currentPlayer}`;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

resetGame();
