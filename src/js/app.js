/* Main script of the application, translating user input into logical
operations and updating the GUI according to the output from the Calculator
object. */

const OPERATIONS = require("./calculator.js").OPERATIONS;
const Calculator = require("./calculator.js").Calculator;

function buttonClicked(event) {
  let operation = event.target.value;
  let operationNum = parseFloat(operation);
  if(isNaN(operationNum))
    calculator.processInput(operation);
  else
    calculator.processInput(operationNum);
  updateDisplay();
}

function updateDisplay() {
  let numDisplay = document.querySelector(".calculator__display__txt-main");
  let expDisplay = document.querySelector(".calculator__display__txt-sub");
  
  numDisplay.innerHTML = calculator.currentNumber;
  expDisplay.innerHTML = calculator.currentExpression;
}

let calculator = new Calculator();
let buttons = document.querySelector(".calculator__buttons").children;
for(let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonClicked);
}