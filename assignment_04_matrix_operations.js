// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

/**
 * Helper function to prompt for and read an M x N matrix from user input.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @param {string} matrixName - Optional name prefix for prompt display.
 * @returns {number[][]} The constructed 2D array matrix.
 */
function readMatrix(rows, cols, matrixName = '') {
    const matrix = [];
    const namePrefix = matrixName ? `${matrixName} - ` : '';
    console.log(`\nEntering ${rows}x${cols} matrix${matrixName ? ' (' + matrixName + ')' : ''}:`);

    for (let i = 0; i < rows; i++) {
        const input = readlineSync.question(`${namePrefix}Enter row ${i + 1}: `);
        const rowValues = input.trim().split(/\s+/).map(Number);

        if (rowValues.length !== cols || rowValues.some(isNaN)) {
            console.log(`Error: Please enter exactly ${cols} valid numbers separated by spaces.`);
            i--; // Retry current row
            continue;
        }

        matrix.push(rowValues);
    }

    return matrix;
}

/**
 * Helper function to print a matrix in a neatly formatted grid.
 * @param {number[][]} matrix - Matrix to display.
 */
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const formattedRow = matrix[i].map(num => String(num).padStart(5)).join(' ');
        console.log(formattedRow);
    }
}

// =============================================================================
// PART A — Transpose a Matrix
// =============================================================================

/**
 * Computes the transpose of an M x N matrix.
 * @param {number[][]} matrix - Input M x N matrix.
 * @returns {number[][]} Transposed N x M matrix.
 */
function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        result.push(newRow);
    }

    return result;
}

// =============================================================================
// PART B — Add Two Matrices
// =============================================================================

/**
 * Adds two M x N matrices element-wise.
 * @param {number[][]} matrixA - First matrix.
 * @param {number[][]} matrixB - Second matrix.
 * @returns {number[][]} Sum matrix.
 */
function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(row);
    }

    return result;
}

// =============================================================================
// PART C — Multiply Two Matrices
// =============================================================================

/**
 * Multiplies an M x N matrix A by an N x P matrix B.
 * @param {number[][]} matrixA - M x N matrix.
 * @param {number[][]} matrixB - N x P matrix.
 * @returns {number[][]} Resulting M x P product matrix.
 */
function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const result = [];

    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;
}

// =============================================================================
// MAIN PROGRAM EXECUTION
// =============================================================================

function main() {
    console.log('=== MATRIX OPERATIONS CALCULATOR ===');

    // -------------------------------------------------------------------------
    // Executing Part A: Transpose
    // -------------------------------------------------------------------------
    console.log('\n--- PART A: Transpose Matrix ---');
    const rowsA = parseInt(readlineSync.question('Enter number of rows: '), 10);
    const colsA = parseInt(readlineSync.question('Enter number of columns: '), 10);

    if (isNaN(rowsA) || rowsA <= 0 || isNaN(colsA) || colsA <= 0) {
        console.log('Error: Row and column dimensions must be positive integers.');
        return;
    }

    const matrixA = readMatrix(rowsA, colsA, 'Matrix A');

    console.log('\nOriginal Matrix:');
    printMatrix(matrixA);

    const transposed = transposeMatrix(matrixA);
    console.log('\nTransposed Matrix:');
    printMatrix(transposed);

    // -------------------------------------------------------------------------
    // Executing Part B: Matrix Addition
    // -------------------------------------------------------------------------
    console.log('\n--- PART B: Add Two Matrices ---');
    console.log(`Entering Matrix B with dimensions ${rowsA}x${colsA}...`);
    const matrixB = readMatrix(rowsA, colsA, 'Matrix B');

    const sumMatrix = addMatrices(matrixA, matrixB);
    console.log('\nMatrix A + Matrix B:');
    printMatrix(sumMatrix);

    // -------------------------------------------------------------------------
    // Executing Part C: Matrix Multiplication
    // -------------------------------------------------------------------------
    console.log('\n--- PART C: Multiply Two Matrices ---');
    console.log(`For Matrix A x C, Matrix C must have ${colsA} rows.`);
    const colsC = parseInt(readlineSync.question('Enter number of columns for Matrix C: '), 10);

    if (isNaN(colsC) || colsC <= 0) {
        console.log('Error: Column dimension must be a positive integer.');
        return;
    }

    const matrixC = readMatrix(colsA, colsC, 'Matrix C');

    const productMatrix = multiplyMatrices(matrixA, matrixC);
    console.log('\nMatrix A x Matrix C:');
    printMatrix(productMatrix);
}

// Run the main program
main();
