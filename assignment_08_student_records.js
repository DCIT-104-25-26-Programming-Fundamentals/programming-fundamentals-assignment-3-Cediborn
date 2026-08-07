// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

// Global array to store student objects
const students = [];

/**
 * Calculates the average score for a student object.
 * @param {Object} student - The student object.
 * @returns {number} The average score.
 */
function calculateAverage(student) {
    if (!student.scores || student.scores.length === 0) {
        return 0;
    }
    let total = 0;
    for (let i = 0; i < student.scores.length; i++) {
        total += student.scores[i];
    }
    return total / student.scores.length;
}

/**
 * Displays the main menu options to the user.
 */
function showMenu() {
    console.log('\n================================');
    console.log('    STUDENT RECORD SYSTEM MENU');
    console.log('================================');
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');
}

/**
 * Prompts the user to input student details and adds them to the records.
 */
function addStudent() {
    console.log('\n--- Add Student ---');
    const name = readline.question('Student name: ').trim();

    if (name === '') {
        console.log('Error: Student name cannot be empty.');
        return;
    }

    const idInput = readline.question('Student ID: ').trim();
    const id = parseInt(idInput, 10);

    if (isNaN(id) || id <= 0) {
        console.log('Error: Please enter a valid positive student ID.');
        return;
    }

    // Check if student ID already exists
    const existingStudent = students.find(s => s.id === id);
    if (existingStudent) {
        console.log(`Error: A student with ID ${id} already exists.`);
        return;
    }

    const countInput = readline.question('How many scores? ').trim();
    const scoreCount = parseInt(countInput, 10);

    if (isNaN(scoreCount) || scoreCount <= 0) {
        console.log('Error: Number of scores must be a positive integer.');
        return;
    }

    const scores = [];
    for (let i = 0; i < scoreCount; i++) {
        const scoreInput = readline.question(`Enter score ${i + 1}: `).trim();
        const score = parseFloat(scoreInput);

        if (isNaN(score) || score < 0 || score > 100) {
            console.log('Error: Score must be a number between 0 and 100.');
            i--; // Retry entry for current score index
            continue;
        }

        scores.push(score);
    }

    // Create and save student object
    const newStudent = {
        name: name,
        id: id,
        scores: scores
    };

    students.push(newStudent);
    console.log(`Student "${name}" added successfully.`);
}

/**
 * Displays a formatted summary list of all students and their scores.
 */
function displayAllStudents() {
    console.log('\n--- Student Records ---');

    if (students.length === 0) {
        console.log('No student records found.');
        return;
    }

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const avg = calculateAverage(student).toFixed(2);
        const scoresStr = student.scores.join(', ');

        console.log(`\nID: ${student.id}`);
        console.log(`Name: ${student.name}`);
        console.log(`Scores: [${scoresStr}]`);
        console.log(`Average: ${avg}`);
        console.log('----------------------------');
    }
}

/**
 * Finds a student by ID and prints their calculated score average.
 */
function calculateStudentAverage() {
    console.log('\n--- Calculate Average ---');

    if (students.length === 0) {
        console.log('No student records available.');
        return;
    }

    const idInput = readline.question('Enter student ID: ').trim();
    const id = parseInt(idInput, 10);

    if (isNaN(id)) {
        console.log('Error: Invalid student ID format.');
        return;
    }

    let foundStudent = null;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            foundStudent = students[i];
            break;
        }
    }

    if (foundStudent) {
        const avg = calculateAverage(foundStudent).toFixed(2);
        console.log(`${foundStudent.name}'s average score: ${avg}`);
    } else {
        console.log(`Error: Student with ID ${id} not found.`);
    }
}

/**
 * Main application loop controlling execution flow.
 */
function main() {
    let running = true;

    while (running) {
        showMenu();
        const choice = readline.question('Enter your choice (1-4): ').trim();

        switch (choice) {
            case '1':
                addStudent();
                break;
            case '2':
                displayAllStudents();
                break;
            case '3':
                calculateStudentAverage();
                break;
            case '4':
                console.log('\nGoodbye!');
                running = false;
                break;
            default:
                console.log('Error: Invalid choice. Please enter a number between 1 and
