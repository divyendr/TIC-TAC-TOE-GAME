document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    // Create the board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', cellClick);
        board.appendChild(cell);
    }

    // Handle cell click
    function cellClick(event) {
        const index = event.target.dataset.index;
        if (gameEnded || boardState[index] !== '') return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        moves++;

        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            gameEnded = true;
        } else if (moves === 9) {
            status.textContent = 'It\'s a draw!';
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s turn`;
        }
    }

    // Reset game
    resetButton.addEventListener('click', function() {
        currentPlayer = 'X';
        moves = 0;
        gameEnded = false;
        boardState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    });

    // Check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let condition of winConditions) {
            if (boardState[condition[0]] !== '' &&
                boardState[condition[0]] === boardState[condition[1]] &&
                boardState[condition[1]] === boardState[condition[2]]) {
                return true;
            }
        }

        return false;
    }
});
