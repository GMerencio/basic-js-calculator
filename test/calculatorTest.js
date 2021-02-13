const OPERATIONS = require("../src/js/calculator").OPERATIONS;
const Calculator = require("../src/js/calculator").Calculator;
const expect = require("chai").expect;

let calc = new Calculator();

describe("Calculator", function() {
  it("should display 0 when first initiated", function() {
    calc = new Calculator();
    expect(calc.currentNumber).to.equal("0");
  });
  it("should be able to add any two numbers", function() {
    calc.processInput(OPERATIONS.ALL_CLEAR);
    calc.processInput(1);
    calc.processInput(5);
    calc.processInput(OPERATIONS.ADD);
    calc.processInput(5);
    calc.processInput(6);
    calc.processInput(".");
    calc.processInput(8);
    calc.processInput(OPERATIONS.EQUAL);
    expect(calc.currentNumber).to.equal((15 + 56.8).toString());
  });
  it("should continue the calculation when it reaches another operation",
     function() {
    calc.processInput(OPERATIONS.ALL_CLEAR);
    calc.processInput(1);
    calc.processInput(OPERATIONS.ADD);
    calc.processInput(2);
    calc.processInput(OPERATIONS.MUL);
    expect(calc.currentExpression).to.equal("3 " + OPERATIONS.MUL);
  });
});