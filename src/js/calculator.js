// Defined operations for the calculator.
const OPERATIONS = {
  ADD: "+",
  SUB: "-",
  MUL: "×",
  DIV: "÷",
  DOT: ".",
  EQUAL: "=",
  ALL_CLEAR: "AC",
  CLEAR_ENTRY: "CE"
};

/* Class for representing the current state of the calculator. After each
operation (new digit, new operator, clear all, etc.), it updates the
current number and current expression being processed. */
class Calculator {

  /* Evaluates a single mathematical operation. It takes an array with
  3 items, consisting of the numbers and operator, such as [1, "+", 2], which
  returns 3. */
  static _evaluateOperation(expression) {
    switch(expression[1]) {
      case OPERATIONS.ADD:
        return expression[0] + expression[2];
      case OPERATIONS.SUB:
        return expression[0] - expression[2];
      case OPERATIONS.DIV:
        return expression[0] / expression[2];
      case OPERATIONS.MUL:
        return expression[0] * expression[2];
      default:
        return NaN;
    }
  }

  constructor() {
    this._allClear();
  }
  
  // Returns a string representation of the current number.
  get currentNumber() {
    return this._currentNumber;
  }
  
  // Returns a string representation of the current expression.
  get currentExpression() {
    return this._currentExpression.join(" ");
  }
  
  // Processes the next input.
  processInput(input) {
    // If we have an undefined result, first clear everything.
    if(isNaN(parseFloat(this._currentNumber)))
      this._allClear();
    
    if(Number.isInteger(input) && input >= 0 && input < 10)
      this._addDigit(input);
    else if(input === OPERATIONS.DOT)
      this._addDecimalPoint();
    else if(input === OPERATIONS.ALL_CLEAR)
      this._allClear();
    else if(input === OPERATIONS.CLEAR_ENTRY)
      this._clearEntry();
    else if(input === OPERATIONS.EQUAL)
      this._calculateExpression();
    else if(input === OPERATIONS.ADD || input === OPERATIONS.SUB
       || input === OPERATIONS.MUL || input === OPERATIONS.DIV) {
      this._processOperation(input);
    }
  }

  // Resets the state of the calculator.
  _allClear() {
    this._currentNumber = "0";
    this._currentExpression = [];
  }

  // Clears the current number.
  _clearEntry() {
    this._currentNumber = "0";
  }

  /* Pushes the most recently entered digit to the end of the current
  number. */
  _addDigit(digit) {
    // If we have just calculated something, first clear everything.
    if(this._currentExpression.length === 3)
      this._allClear();
    
    if(this._currentNumber === "0" || isNaN(parseFloat(this._currentNumber)))
      this._currentNumber = digit.toString();
    else
      this._currentNumber += digit.toString();
  }

  // Adds a decimal point to the current number, if it doesn't already have one.
  _addDecimalPoint() {
    if(!this._currentNumber.includes("."))
      this._currentNumber += ".";
  }
  
  /* Calculates the current expression, if valid. If an undefined operation
  occurs (e.g., division by zero), it puts an error message into the current
  number. */
  _calculateExpression() {
    if(this._currentExpression.length === 2) {
      this._currentExpression.push(parseFloat(this._currentNumber));
      let result = Calculator._evaluateOperation(this._currentExpression);
      if(isNaN(result) || !isFinite(result))
        result = "Undefined";
      this._currentNumber = result.toString();
    }
  }
  
  // Adds the operation to the current expression, if possible.
  _processOperation(operation) {
    // Current expression is empty, so we add the current number and operation.
    if(this._currentExpression.length === 0) {
      this._currentExpression.push(parseFloat(this._currentNumber));
      this._currentExpression.push(operation);
      this._clearEntry();
    }
    /* Current expression is almost full, so we calculate, clear the
    current expression and add the operation as a new input. */
    else if(this._currentExpression.length === 2) {
      this._calculateExpression();
      this._currentExpression = [];
      this.processInput(operation);
    }
  }
}

module.exports = {OPERATIONS, Calculator};