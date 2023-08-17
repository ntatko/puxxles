// Sudoku puzzle generator
export const generateSudokuPuzzle = () => {
    const size = 9;
    const puzzle = new Array(size).fill(null).map(() => new Array(size).fill(0));

    const isValid = (row, col, num) => {
        // Check row and column
        for (let i = 0; i < size; i++) {
            if (puzzle[row][i] === num || puzzle[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (puzzle[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    };

    const solveSudoku = () => {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (puzzle[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (isValid(row, col, num)) {
                            puzzle[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            }
                            puzzle[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    // Start the puzzle generation
    solveSudoku();

    return puzzle;
};


const clonePuzzle = (puzzle) => puzzle.map(row => [...row]);

const isUniqueSolution = (puzzle) => {
    const size = 9;

    const isValid = (row, col, num) => {
        // Check row and column
        for (let i = 0; i < size; i++) {
            if (puzzle[row][i] === num || puzzle[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (puzzle[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    };

    const solveSudoku = () => {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (puzzle[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (isValid(row, col, num)) {
                            puzzle[row][col] = num;
                            if (!solveSudoku()) {
                                return false; // Multiple solutions found
                            }
                            puzzle[row][col] = 0;
                        }
                    }
                    return true;
                }
            }
        }
        return true;
    };

    // Clone the puzzle to avoid modifying the original
    const clonedPuzzle = puzzle.map(row => [...row]);

    // Attempt to solve the cloned puzzle
    return solveSudoku();
};


export const trimPuzzle = (puzzle, numToRemove) => {
    const trimmedPuzzle = clonePuzzle(puzzle);

    for (let i = 0; i < numToRemove; i++) {
        let row, col;

        // Choose a random cell to remove a number from
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (trimmedPuzzle[row][col] === 0);

        const removedNumber = trimmedPuzzle[row][col];
        trimmedPuzzle[row][col] = 0;

        if (!isUniqueSolution(trimmedPuzzle)) {
            // Restoring the removed number if the puzzle is not solvable or has multiple solutions
            trimmedPuzzle[row][col] = removedNumber;
        }
    }

    return trimmedPuzzle;
};
