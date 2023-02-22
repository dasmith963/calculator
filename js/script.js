const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('.decimal');
const equalsBtn = document.querySelector('.equals');
const deleteBtn = document.querySelector('.backspace');
const clearBtn = document.querySelector('.clear');
let previousNum = '';
let currentNum = '';
let operator = '';

operatorBtns.forEach(button => button.addEventListener('click', handleOperator));
numberBtns.forEach(button => button.addEventListener('click', appendNumber));
decimalBtn.addEventListener('click', appendDecimal);
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
    currentNum = currentNum.substring(0, currentNum.length - 1);
    mainDisplay.textContent = currentNum;
  }
  if (currentNum === '') mainDisplay.textContent = '0';
}

function clearDisplay() {
  currentNum = '';
  previousNum = '';
  operator = '';
  mainDisplay.textContent = '0';
  subDisplay.textContent = '';
}