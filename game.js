document.addEventListener('DOMContentLoaded', () => {
    const gameScreen = document.getElementById('game-screen');
    const cells = Array.from(gameScreen.getElementsByClassName('cell'));
    const status = document.getElementById('status');
    const roundHistory = document.getElementById('round-history');
    const winMessage = document.getElementById('win-message');
    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let rounds = parseInt(localStorage.getItem('rounds'));
    let playerXName = localStorage.getItem('playerXName') || 'Player X';
    let playerOName = localStorage.getItem('playerOName') || 'Player O';
    let roundCounter = 0;
    let gameResults = { X: 0, O: 0, Draw: 0 };

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function checkWinner() {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return cells[a].textContent;
            }
        }
        return cells.every(cell => cell.textContent) ? 'Draw' : null;
    }

    function handleClick(event) {
        if (!gameActive) return;

        const cell = event.target;
        if (cell.textContent) return;

        cell.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                status.innerHTML = "It's a draw! <span id='win-message'></span>";
                winMessage.textContent = '';
                winMessage.style.display = 'none';
                gameResults.Draw++;
            } else {
                status.innerHTML = `${winner === 'X' ? playerXName : playerOName} wins! <span id='win-message'>Victory!</span>`;
                winMessage.textContent = 'Victory!';
                winMessage.style.display = 'inline';
                gameResults[winner]++;
            }
            roundCounter++;
            updateRoundHistory();
            gameActive = false;
            if (roundCounter >= rounds) {
                setTimeout(showFinalResults, 100); // Llama a la función para mostrar los resultados finales
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerHTML = `Player ${currentPlayer}'s turn <span id='win-message'></span>`;
            winMessage.style.display = 'none';
        }
    }

    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        status.innerHTML = `Player ${currentPlayer}'s turn <span id='win-message'></span>`;
        winMessage.style.display = 'none';
        gameActive = true;
    }

    function updateRoundHistory() {
        roundHistory.innerHTML = `
            <li>${playerXName} wins: ${gameResults.X}</li>
            <li>${playerOName} wins: ${gameResults.O}</li>
            <li>Draws: ${gameResults.Draw}</li>
        `;
    }

    function showFinalResults() {
        let finalMessage = '';
        if (gameResults.X > gameResults.O) {
            finalMessage = `${playerXName} gana con ${gameResults.X} partidas ganadas!`;
        } else if (gameResults.O > gameResults.X) {
            finalMessage = `${playerOName} gana con ${gameResults.O} partidas ganadas!`;
        } else if (gameResults.X === gameResults.O) {
            finalMessage = 'El juego termina en empate!';
        }
        alert(finalMessage);
        window.location.href = 'index.html'; // Redirige de nuevo a la pantalla de inicio
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
});
