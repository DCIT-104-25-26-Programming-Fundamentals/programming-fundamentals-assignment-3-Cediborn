// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 1
// =============================================================================
//
// TASK: Prime Number Checker
//
// Write a JavaScript program that checks whether a given number is prime.
//
// A prime number is a whole number greater than 1 that has no divisors
// other than 1 and itself (e.g., 2, 3, 5, 7, 11, 13 ...).
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_01_prime_checker.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLES
// -----------------------------------------------------------------------------
//
//   Enter a number: 7
//   7 is a prime number.
//
//   Enter a number: 10
//   10 is NOT a prime number.
//
//   Enter a number: 1
//   1 is NOT a prime number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement the logic inside a function (see scaffold below).
// - Numbers less than 2 are NOT prime — handle this inside the function.
// - The main() function must call isPrime() and print the result.
// - Use readlineSync.questionInt() to read integer input from the user.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

// This line lets us ask the user questions in the terminal.
const readlineSync = require('readline-sync');

// This function answers one question: is the number prime or not?
// It gives back true (yes) or false (no).
function isPrime(number) {
  // Rule: 0, 1 and negative numbers are never prime.
  if (number < 2) {
    return false;
  }

  // Try dividing the number by 2, 3, 4 ... up to number - 1.
  for (let i = 2; i < number; i++) {
    // The % sign gives the remainder. A remainder of 0 means i divides evenly.
    if (number % i === 0) {
      // We found a divisor, so it is NOT prime. Stop here.
      return false;
    }
  }

  // We never found a divisor, so the number is prime.
  return true;
}

// This function runs the program: ask, check, print.
function main() {
  let number = readlineSync.questionInt('Enter a number: ');

  if (isPrime(number)) {
    console.log(number + ' is a prime number.');
  } else {
    console.log(number + ' is NOT a prime number.');
  }
}

// Start the program.
main();

