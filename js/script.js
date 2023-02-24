const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const keypad = document.querySelector('.keypad');
let previousNum = '';
let currentNum = '';
let operator = '';

document.addEventListener('keydown', handleKeyboard);
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

function checkOp(operator){
  if (operator === '*') return 'x'
  if (operator === '/') return '÷'
}

function handleKeyboard(event){
  event.preventDefault();
  let key = event.key

  if (key >= 0 && key <= 9) appendNumber(key);
  if (key === '+' || key === '-') handleOperator(key);
  if (key === '*' || key === '/') handleOperator(checkOp(key));
  if (key === '%') getPercentage();
  if (key === '.') appendDecimal();
  if (key === 'Enter' || key === '=') checkNumbers();
  if (key === 'c') clearDisplay();
  if (key === 'Backspace') deleteInput();
  if (key === 'p') invertNumber();
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

