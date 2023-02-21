const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
}

function operate(num1, num2, operator) {
  if (operator === '+') return operations.add(num1, num2);
  if (operator === '-') return operations.subtract(num1, num2);
  if (operator === 'x') return operations.multiply(num1, num2);
  if (operator === '÷') return operations.divide(num1, num2);
}