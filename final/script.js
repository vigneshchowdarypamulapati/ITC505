document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 5;
    const board = document.getElementById("game-board");
    let moveCount = 0;

    const moveCounter = document.createElement("p");
    moveCounter.textContent = `Moves: ${moveCount}`;
    moveCounter.style.fontSize = "18px";
    moveCounter.style.margin = "10px";
    document.body.insertBefore(moveCounter, board);

    let cells = [];
    for (let i = 0; i < boardSize; i++) {
        cells[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => {
                toggleLights(i, j);
                incrementMoveCount();
            });
            board.appendChild(cell);
            cells[i][j] = cell;
        }
    }

    function toggleLights(row, col) {
        const positions = [
            [row, col],
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];

        positions.forEach(([r, c]) => {
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                cells[r][c].classList.toggle("is-off");
            }
        });

        if (checkWin()) {
            setTimeout(() => {
                alert(`YOU WIN! Total moves: ${moveCount}`);
            }, 100);
        }
    }

    function incrementMoveCount() {
        moveCount++;
        moveCounter.textContent = `Moves: ${moveCount}`;
    }

    function checkWin() {
        return cells.flat().every(cell => !cell.classList.contains("is-off"));
    }

    function randomizeBoard() {
        const moves = Math.floor(Math.random() * 15) + 10;
        for (let i = 0; i < moves; i++) {
            const randomRow = Math.floor(Math.random() * boardSize);
            const randomCol = Math.floor(Math.random() * boardSize);
            toggleLights(randomRow, randomCol);
        }
        moveCount = 0;
        moveCounter.textContent = `Moves: ${moveCount}`;
    }

    randomizeBoard();

});
