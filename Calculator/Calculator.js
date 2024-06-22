document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");
  const clear = document.getElementById("clear");
  const backspace = document.getElementById("backspace");
  const sign = document.getElementById("sign");
  let currentNumber = "";
  let previousNumber = "";
  let operator = "";
  let resultValue = "";
  numbers

  for (const operator of operators) {
    operator.addEventListener("click", () => {
      previousNumber = currentNumber;
      currentNumber = "";
      operatorValue = operator.textContent;
      result.textContent = previousNumber + " " + operatorValue;
    });
  }
  equals.addEventListener("click", () => {
    if (previousNumber && currentNumber && operatorValue) {
      resultValue = calculate(previousNumber, currentNumber, operatorValue);
      result.textContent = resultValue;
      previousNumber = "";
      currentNumber = "";
      operatorValue = "";
    }
  });
  clear.addEventListener("click", () => {
    resultValue = "";
    previousNumber = "";
    currentNumber = "";
    operatorValue = "";
    result.textContent = "";
  });
  backspace.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    result.textContent = currentNumber;
  });
  sign.addEventListener("click", () => {
    currentNumber = -currentNumber;
    result.textContent = currentNumber;
  });
  function calculate(previousNumber, currentNumber, operatorValue) {
    let result = 0;
    switch (operatorValue) {
      case "+":
        result = parseFloat(previousNumber) + parseFloat(currentNumber);
        break;
      case "-":
        result = parseFloat(previousNumber) - parseFloat(currentNumber);
        break;
      case "*":
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case "/":
        result = parseFloat(previousNumber) / parseFloat(currentNumber);
        break;
      case "%":
        result = parseFloat(previousNumber) % parseFloat(currentNumber);
        break;
      default:
        break;
    }
    return result;
  }
});
