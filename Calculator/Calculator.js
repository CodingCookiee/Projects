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
  let operatorValue = "";
  let resultValue = "";

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (resultValue) {
        resultValue = "";
        result.textContent = "";
      }
      currentNumber += number.textContent;
      result.textContent = currentNumber;
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (currentNumber === "") return; // Prevents setting operator if currentNumber is empty
      previousNumber = currentNumber;
      currentNumber = "";
      operatorValue = operator.textContent;
      result.textContent = previousNumber + " " + operatorValue;
    });
  });

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
    if (currentNumber) {
      currentNumber = currentNumber.slice(0, -1);
      result.textContent = currentNumber;
    }
  });

  sign.addEventListener("click", () => {
    if (currentNumber) {
      currentNumber = (parseFloat(currentNumber) * -1).toString();
      result.textContent = currentNumber;
    }
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
