document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");
  const clear = document.getElementById("clear");
  const backspace = document.getElementById("backspace");
  const sign = document.getElementById("sign");
  const decimal = document.getElementById("decimal");

  let currentNumber = "";
  let previousNumber = "";
  let operatorValue = "";
  let resultValue = "";

  const MAX_LENGTH = 27; // Maximum number of characters to display
  const PLACEHOLDER = "0"; // Placeholder for an empty display

  const updateResult = (value) => {
    result.textContent = value.length > MAX_LENGTH ? value.slice(0, MAX_LENGTH) + '...' : value;
    if (value === "") {
      result.textContent = PLACEHOLDER;
    }
  };

  const removeActiveClassFromOperators = () => {
    operators.forEach(operator => {
      operator.classList.remove('active');
    });
  };

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (resultValue) {
        resultValue = "";
        currentNumber = "";
      }
      if (currentNumber.length < MAX_LENGTH) {
        currentNumber += number.textContent;
        updateResult(currentNumber);
        removeActiveClassFromOperators(); // Remove active class when a number is entered
      }
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (currentNumber === "") return;
      if (previousNumber && currentNumber && operatorValue) {
        resultValue = calculate(previousNumber, currentNumber, operatorValue).toString();
        updateResult(resultValue);
        previousNumber = resultValue;
        currentNumber = "";
      } else {
        previousNumber = currentNumber;
        currentNumber = "";
      }
      operatorValue = operator.textContent;
      updateResult(previousNumber + " " + operatorValue);
      removeActiveClassFromOperators();
      operator.classList.add('active'); // Add active class to the clicked operator
    });
  });

  equals.addEventListener("click", () => {
    if (previousNumber && currentNumber && operatorValue) {
      resultValue = calculate(previousNumber, currentNumber, operatorValue).toString();
      updateResult(resultValue);
      previousNumber = "";
      currentNumber = "";
      operatorValue = "";
      removeActiveClassFromOperators(); // Remove active class after calculation
    }
  });

  clear.addEventListener("click", () => {
    resultValue = "";
    previousNumber = "";
    currentNumber = "";
    operatorValue = "";
    updateResult("");
    removeActiveClassFromOperators(); // Remove active class when cleared
  });

  backspace.addEventListener("click", () => {
    if (currentNumber) {
      currentNumber = currentNumber.slice(0, -1);
      updateResult(currentNumber);
    } else {
      updateResult("");
    }
  });

  sign.addEventListener("click", () => {
    if (currentNumber) {
      currentNumber = (parseFloat(currentNumber) * -1).toString();
      updateResult(currentNumber);
    }
  });

  decimal.addEventListener("click", () => {
    if (currentNumber.includes('.')) return;
    if (currentNumber === "") {
      currentNumber = "0.";
    } else {
      currentNumber += ".";
    }
    updateResult(currentNumber);
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
      case "×":
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case "÷":
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
