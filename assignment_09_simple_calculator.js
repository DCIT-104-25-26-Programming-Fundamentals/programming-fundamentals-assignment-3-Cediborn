// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

// =============================================================================
// ARITHMETIC OPERATION FUNCTIONS
// =============================================================================

/**
 * Adds two numbers.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} Sum of a and b.
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} Difference of a and b.
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} Product of a and b.
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides the first number by the second.
 * @param {number} a 
 * @param {number} b 
 * @returns {number|null} Quotient or null if dividing by zero.
 */
function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

/**
 * Calculates the remainder of dividing the first number by the second.
 * @param {number} a 
 * @param {number} b 
 * @returns {number|null} Remainder or null if dividing by zero.
 */
function modulus(a, b) {
    if (b === 0) {
        return null;
    }
    return a % b;
}

/**
 * Calculates base raised to the power of exponent.
 * @param {number} base 
 * @param {number} exp 
 * @returns {number} Result of base ** exp.
 */
function power(base, exp) {
    return base ** exp;
}

// =============================================================================
// HELPER & MAIN FUNCTIONS
// =============================================================================

/**
 * Displays the main menu options to the console.
 */
function showMenu() {
    console.log('\n============================');
    console.log('       SIMPLE CALCULATOR');
    console.log('============================');
    console.log('1. Addition');
    console.log('2. Subtraction');
    console.log('3. Multiplication');
    console.log('4. Division');
    console.log('5. Modulus');
    console.log('6. Exponentiation');
    console.log('7. Quit');
}

/**
 * Prompts the user for two valid numbers.
 * @returns {{num1: number, num2: number}|null} Object containing parsed numbers or null if invalid.
 */
function getTwoNumbers() {
    const input1 = readline.question('Enter first number : ');
    const num1 = parseFloat(input1);

    const input2 = readline.question('Enter second number: ');
    const num2 = parseFloat(input2);

    if (isNaN(num1) || isNaN(num2)) {
        console.log('Error: Invalid number input.');
        return null;
    }

    return { num1, num2 };
}

/**
 * Formats results to 2 decimal places if it is a float, or keeps it standard if integer.
 * @param {number} num 
 * @returns {string} Formatted number string.
 */
function formatResult(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

/**
 * Main function controlling program flow.
 */
function main() {
    let running = true;

    while (running) {
        showMenu();
        const choice = readline.question('Select an operation (1-7): ').trim();

        if (choice === '7') {
            console.log('Goodbye!');
            running = false;
            break;
        }

        if (!['1', '2', '3', '4', '5', '6'].includes(choice)) {
            console.log('Error: Invalid choice. Please select an option between 1 and 7.');
            continue;
        }

        const numbers = getTwoNumbers();
        if (!numbers) continue;

        const { num1, num2 } = numbers;

        switch (choice) {
            case '1': {
                const res = add(num1, num2);
                console.log(`Result: ${num1} + ${num2} = ${formatResult(res)}`);
                break;
            }
            case '2': {
                const res = subtract(num1, num2);
                console.log(`Result: ${num1} - ${num2} = ${formatResult(res)}`);
                break;
            }
            case '3': {
                const res = multiply(num1, num2);
                console.log(`Result: ${num1} * ${num2} = ${formatResult(res)}`);
                break;
            }
            case '4': {
                const res = divide(num1, num2);
                if (res === null) {
                    console.log('Error: Cannot divide by zero.');
                } else {
                    console.log(`Result: ${num1} / ${num2} = ${formatResult(res)}`);
                }
                break;
            }
            case '5': {
                const res = modulus(num1, num2);
                if (res === null) {
                    console.log('Error: Cannot perform modulus by zero.');
                } else {
                    console.log(`Result: ${num1} % ${num2} = ${formatResult(res)}`);
                }
                break;
            }
            case '6': {
                const res = power(num1, num2);
                console.log(`Result: ${num1} ** ${num2} = ${formatResult(res)}`);
                break;
            }
        }
    }
}

// Run the application
main();
