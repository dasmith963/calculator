const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const keypad = document.querySelector('.keypad');
let previousNum = '';
let currentNum = '';
let operator = '';

keypad.addEventListener('click', handleButtons);

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

function appendNumber(number) {
  currentNum === '0'
    ? currentNum = number
    : currentNum += number;
  mainDisplay.textContent = currentNum;
}

function appendDecimal() {
  if (currentNum === '') currentNum = '0';
  if (currentNum.includes('.')) return;
  currentNum += '.';
  mainDisplay.textContent = currentNum;
}

function invertNumber() {
  if (currentNum !== '') {
    currentNum = -currentNum
    mainDisplay.textContent = currentNum.toString();
  }
}

function getPercentage() {
  if (currentNum !== '') {
    currentNum = (parseFloat(currentNum) / 100).toFixed(3);
    mainDisplay.textContent = currentNum.toString();
  }
}

function checkNumbers() {
  if (previousNum === 'Error') return;
  if (currentNum !== '' && previousNum !== '') displayResult();
}

function handleOperator(currentOperator) {
  if (previousNum === '') {
    previousNum = currentNum;
    currentNum = '';
  } else if (operator) {
    checkNumbers();
  }
  operator = currentOperator;
  subDisplay.textContent = `${previousNum} ${operator}`;
}

function roundNumber(number) {
  if (isNaN(number)) return 'Error';
  return Math.round(number * 100000) / 100000;
}

function displayResult() {
  const result = operate(previousNum, currentNum, operator);
  subDisplay.textContent = `${previousNum} ${operator} ${currentNum} =`;
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

function handleButtons(event) {
  let currentBtn = event.target

  if (currentBtn.classList.contains('number')) {
    appendNumber(currentBtn.textContent);
  }
  if (currentBtn.classList.contains('decimal')) {
    appendDecimal();
  }
  if (currentBtn.classList.contains('inverse')) {
    invertNumber();
  }
  if (currentBtn.classList.contains('operator')) {
    handleOperator(currentBtn.textContent);
  }
  if (currentBtn.classList.contains('percent')) {
    getPercentage();
  }
  if (currentBtn.classList.contains('equals')) {
    checkNumbers();
  }
  if (currentBtn.classList.contains('backspace')) {
    deleteInput();
  }
  if (currentBtn.classList.contains('clear')) {
    clearDisplay();
  }
}

// * Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. 
// Read the MDN documentation for event.preventDefault to help solve this problem
// 0-9
// + - * /
// %
// .
// 'enter' || = 
// 'backspace'
document.addEventListener('keydown', (event) => {
  let key = event.key

  if (key >= 0 && key <= 9) {
    appendNumber(key);
  }

  if (key === '+' || key === '-' || key === '*' || key === '/') {
    console.log(`this is operator: ${key}`)
  }

  if (key === '%') {
    console.log(`this is percent: ${key}`)
  }

  if (key === '.') {
    console.log(`this is decimal: ${key}`)
  }

  if (key === 'Enter' || key === '=') {
    console.log(`this is equals: ${key}`)
  }

  if (key === 'c') {
    console.log(`this is clear: ${key}`)
  }

  if (key === 'Backspace') {
    console.log(`this is backspace: ${key}`)
  }

  if (key === 'p') {
    console.log(`this is inverse: ${key}`)
  }
})

  // numbers with commas