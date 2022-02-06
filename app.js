function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b != 0 ? a / b : "don't divide by 0";
}

function operate(operator, a, b) {
  return operator(a, b);
}
