document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const setupForm = document.getElementById('setup-form');

    setupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const playerXName = document.getElementById('player-x-name').value || 'Player X';
        const playerOName = document.getElementById('player-o-name').value || 'Player O';
        const rounds = parseInt(document.getElementById('rounds').value);

        localStorage.setItem('playerXName', playerXName);
        localStorage.setItem('playerOName', playerOName);
        localStorage.setItem('rounds', rounds);

        window.location.href = 'game.html';
    });
});
