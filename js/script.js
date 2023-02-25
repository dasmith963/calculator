const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const keypad = document.querySelector('.keypad');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');
let previousNum = '';
let currentNum = '';
let operator = '';

document.addEventListener('keydown', handleKeyboard);
keypad.addEventListener('click', handleButtons);
openModalBtn.addEventListener ('click', openModal);
closeModalBtn.addEventListener ('click', closeModal);
overlay.addEventListener('click', closeModal);

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
  if (currentNum.length <= 10) {
    currentNum === '0'
      ? currentNum = number
      : currentNum += number;
    mainDisplay.textContent = currentNum;
  }
}

function appendDecimal() {
  if (previousNum !== ''){
    previousNum = currentNum;
    currentNum = '';
  }
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

function handleOperator(currentOperator) {
  if (previousNum === '') {
    previousNum = currentNum;
    currentNum = '';
  }
  else if (operator) {
    checkNumbers();
  }
  operator = currentOperator;
  previousNum === ''
    ? subDisplay.textContent = ''
    : subDisplay.textContent = `${previousNum} ${operator}`;
}

function displayResult() {
  const result = operate(previousNum, currentNum, operator);
  subDisplay.textContent = `${previousNum} ${operator} ${currentNum} =`;
  previousNum = roundNumber(result).toString();
  currentNum = '';
  previousNum.length <= 10
    ? mainDisplay.textContent = previousNum
    : mainDisplay.textContent = previousNum.slice(0, 11);
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

function checkNumbers() {
  if (previousNum === 'Error') return;
  if (currentNum !== '' && previousNum !== '') displayResult();
}

function roundNumber(number) {
  if (isNaN(number)) return 'Error';
  return Math.round(number * 100000) / 100000;
}

function checkOp(operator) {
  if (operator === '*') return 'x'
  if (operator === '/') return '÷'
}

function handleKeyboard(event) {
  event.preventDefault();
  let key = event.key

  if (key >= 0 && key <= 9) appendNumber(key);
  if (key === '+' || key === '-') handleOperator(key);
  if (key === '*' || key === '/') handleOperator(checkOp(key));
  if (key === '%') getPercentage();
  if (key === '.') appendDecimal();
  if (key === 'Enter' || key === '=') checkNumbers();
  if (key === 'Escape' || key === 'c') clearDisplay();
  if (key === 'Backspace') deleteInput();
  if (key === 'Tab') invertNumber();
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

function openModal(){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal(){
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}