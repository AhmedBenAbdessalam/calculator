function add(a, b) {
  return +a + +b;
}
function subtract(a, b) {
  return +a - +b;
}
function multiply(a, b) {
  return +a * +b;
}
function divide(a, b) {
  return +b !== 0 ? (+a / +b).toFixed(3) : "Error";
}

function addPoint() {
  if (currentValue.includes(".")) return;
  currentValue += ".";

  currentValueDiv.textContent = currentValue;
}

function operate(operator, a, b) {
  if (operator == null) return;
  currentValue = operator(a, b).toString();
  currentOperation = null;
  previousValue = "";
  currentValueDiv.textContent = currentValue;

  previousValueDiv.textContent = previousValue;
}
function clearDisplay() {
  currentValue = "";
  previousValue = "";
  currentOperation = null;
  currentValueDiv.textContent = currentValue;
  previousValueDiv.textContent = previousValue;
}

function backspace() {
  if (isNaN(currentValue)) return;
  currentValue = currentValue.slice(0, currentValue.length - 1);
  currentValueDiv.textContent = currentValue;
}

function operation(operator, symbol) {
  if (previousValue !== "") return;
  if (isNaN(currentValue)) return;
  if (symbol != "-" && currentValue === "") return;
  previousValue = currentValue + symbol;
  currentValue = "";
  currentValueDiv.textContent = currentValue;

  previousValueDiv.textContent = previousValue;
  console.log(`operator : ${operation.name}  ; value = ${currentValue}`);
  currentOperation = operator;
}
function handleKeyboardInput(e) {
  //if its a number
  if (!isNaN(+e.key)) {
    if (isNaN(currentValue)) return;
    if (currentValue.length >= 16) return;
    currentValue += e.key;
    currentValueDiv.textContent = currentValue;
    return;
  }
  if (e.key === "/") {
    operation(divide, "÷");
    return;
  }
  if (e.key === "*") {
    operation(multiply, "X");
    return;
  }
  if (e.key === "+") {
    operation(add, "+");
    return;
  }
  if (e.key === "-") {
    operation(subtract, "-");
    return;
  }
  if (e.key === "Backspace") {
    backspace();
    return;
  }
  if (e.key === "Enter") {
    previousValue = previousValue.slice(0, previousValue.length - 1);
    operate(currentOperation, previousValue, currentValue);
    return;
  }
  if (e.key === "%") {
    operate(divide, currentValue, 100);
    return;
  }
  if (e.key === ".") {
    addPoint();
    return;
  }
  if (e.key === "Escape") {
    clearDisplay();
  }
}
let previousValue = "";
let currentOperation = null;
let currentValue = "";
const currentValueDiv = document.querySelector("#current-value");
currentValueDiv.textContent = currentValue;
const previousValueDiv = document.querySelector("#previous-value");
previousValueDiv.textContent = previousValue;
const numberBtns = document.querySelectorAll(".numbers");
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isNaN(currentValue)) return;
    if (currentValue.length >= 16) return;
    currentValue += btn.textContent;
    currentValueDiv.textContent = currentValue;
  });
});
//backspace
const backspaceBtn = document.querySelector("#backspace");
backspaceBtn.addEventListener("click", backspace);
//clear all
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearDisplay);

//add events for all operation buttons

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
  operation(add, "+");
});
const subtractBtn = document.querySelector("#subtract");
subtractBtn.addEventListener("click", () => {
  operation(subtract, "-");
});
const multiplyBtn = document.querySelector("#multiply");
multiplyBtn.addEventListener("click", () => {
  operation(multiply, "X");
});
const divideBtn = document.querySelector("#division");
divideBtn.addEventListener("click", () => {
  operation(divide, "÷");
});

const percentBtn = document.querySelector("#percent");
percentBtn.addEventListener("click", () => {
  operate(divide, currentValue, 100);
});

const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", () => {
  previousValue = previousValue.slice(0, previousValue.length - 1);
  operate(currentOperation, previousValue, currentValue);
});

const dotBtn = document.querySelector("#dot");
dotBtn.addEventListener("click", addPoint);

window.addEventListener("keydown", handleKeyboardInput);
