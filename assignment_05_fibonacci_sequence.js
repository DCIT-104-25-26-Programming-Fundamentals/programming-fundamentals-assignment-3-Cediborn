// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readline = require('readline-sync');

// =============================================================================
// PART A — Print the First N Terms
// =============================================================================

/**
 * Generates and displays the first N terms of the Fibonacci sequence.
 * @param {number} n - The number of terms to generate.
 */
function printFibonacciSequence(n) {
    if (n <= 0 || !Number.isInteger(n)) {
        console.log('Error: Please enter a positive integer greater than 0.');
        return;
    }

    const sequence = [];

    for (let i = 0; i < n; i++) {
        if (i === 0) {
            sequence.push(0);
        } else if (i === 1) {
            sequence.push(1);
        } else {
            const nextTerm = sequence[i - 1] + sequence[i - 2];
            sequence.push(nextTerm);
        }
    }

    console.log(`Fibonacci sequence: ${sequence.join(' ')}`);
}

// =============================================================================
// PART B — Check if a Number Belongs to the Sequence
// =============================================================================

/**
 * Checks whether a given target number belongs to the Fibonacci sequence.
 * @param {number} target - The number to check.
 * @returns {boolean} True if target is a Fibonacci number, otherwise false.
 */
function isFibonacciNumber(target) {
    if (target < 0 || isNaN(target)) {
        return false;
    }

    let a = 0;
    let b = 1;

    // Fast return for base terms
    if (target === a || target === b) {
        return true;
    }

    // Iteratively generate Fibonacci numbers until reaching or exceeding target
    while (b < target) {
        const temp = a + b;
        a = b;
        b = temp;
    }

    return b === target;
}

// =============================================================================
// MAIN PROGRAM EXECUTION
// =============================================================================

function main() {
    console.log('=== FIBONACCI SEQUENCE GENERATOR ===\n');

    // -------------------------------------------------------------------------
    // Part A: Print First N Terms
    // -------------------------------------------------------------------------
    console.log('--- PART A: Generate Sequence ---');
    const termsInput = readline.question('How many terms? ');
    const n = parseInt(termsInput, 10);

    printFibonacciSequence(n);

    // -------------------------------------------------------------------------
    // Part B: Check Membership
    // -------------------------------------------------------------------------
    console.log('\n--- PART B: Check Fibonacci Number ---');
    const checkInput = readline.question('Enter a number to check: ');
    const targetNum = parseInt(checkInput, 10);

    if (isNaN(targetNum) || targetNum < 0) {
        console.log('Error: Please enter a valid non-negative integer.');
        return;
    }

    if (isFibonacciNumber(targetNum)) {
        console.log(`${targetNum} is a Fibonacci number.`);
    } else {
        console.log(`${targetNum} is NOT a Fibonacci number.`);
    }
}

// Run the application
main();

