const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('.decimal');
const percentBtn = document.querySelector('.percent');
const equalsBtn = document.querySelector('.equals');
const deleteBtn = document.querySelector('.backspace');
const clearBtn = document.querySelector('.clear');
let previousNum = '';
let currentNum = '';
let operator = '';

operatorBtns.forEach(button => button.addEventListener('click', handleOperator));
numberBtns.forEach(button => button.addEventListener('click', appendNumber));
decimalBtn.addEventListener('click', appendDecimal);
percentBtn.addEventListener('click', getPercentage);
equalsBtn.addEventListener('click', checkNumbers);
deleteBtn.addEventListener('click', deleteInput);
clearBtn.addEventListener('click', clearDisplay);

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
}

function operate(num1, num2, operator) {
  a = parseFloat(num1);
  b = parseFloat(num2);
  if (isNaN(a) || isNaN(b)) return;
  if (operator === '+') return operations.add(a, b);
  if (operator === '-') return operations.subtract(a, b);
  if (operator === 'x') return operations.multiply(a, b);
  if (operator === '÷') return operations.divide(a, b);
}

function appendNumber(e) {
  currentNum === '0'
    ? currentNum = e.target.textContent
    : currentNum += e.target.textContent;
  mainDisplay.textContent = currentNum;
}

function appendDecimal() {
  if (currentNum === '') currentNum = '0';
  if (currentNum.includes('.')) return;
  currentNum += '.';
  mainDisplay.textContent = currentNum;
}

function getPercentage() {
  if (currentNum !== '') {
    currentNum = (parseFloat(currentNum) / 100).toFixed(3);
    console.log(currentNum);
    mainDisplay.textContent = currentNum.toString();
  }
}

function handleOperator(e) {
  if (previousNum === '') {
    previousNum = currentNum;
    currentNum = '';
  }
  operator = e.target.textContent;
  subDisplay.textContent = `${previousNum} ${operator}`;
}

function checkNumbers() {
  if (currentNum !== '' && previousNum !== '') displayResult();
}

function roundNumber(number) {
  return Math.round(number * 100000) / 100000;
}

function displayResult() {
  const result = operate(previousNum, currentNum, operator);
  subDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
  previousNum = roundNumber(result).toString();
  currentNum = '';
  mainDisplay.textContent = previousNum;
}

function deleteInput() {
  if (currentNum !== '') {
    currentNum = currentNum.slice(0, -1);
    mainDisplay.textContent = currentNum;
    if (currentNum === '') mainDisplay.textContent = '0';
  }
}

function clearDisplay() {
  currentNum = '';
  previousNum = '';
  operator = '';
  mainDisplay.textContent = '0';
  subDisplay.textContent = '';
}

// * Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.
// * Your calculator should not evaluate more than a single pair of numbers at a time. 
//    Example: you press a number button (12), 
//    followed by an operator button (+), 
//    a second number button (7), and 
//    finally a second operator button (-). 

// Your calculator should do the following: 
    // first, evaluate the first pair of numbers (12 + 7),
    // second, display the result of that calculation (19),
    // finally, use that result (19) as the first number in your new calculation, along with the next operator (-).

// * Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

// Inverse button

// numbers with commas

// Check delete input function after check operator function. 

// * Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.
