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
  let waitingForSecondNumber = false;

  const MAX_LENGTH = 10; // Maximum number of characters to display
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

  const calculate = (prev, curr, operator) => {
    let result = 0;
    switch (operator) {
      case "+":
        result = parseFloat(prev) + parseFloat(curr);
        break;
      case "-":
        result = parseFloat(prev) - parseFloat(curr);
        break;
      case "×":
        result = parseFloat(prev) * parseFloat(curr);
        break;
      case "÷":
        result = parseFloat(prev) / parseFloat(curr);
        break;
      case "%":
        result = parseFloat(prev) % parseFloat(curr);
        break;
      default:
        break;
    }
    return result.toString();
  };

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (waitingForSecondNumber) {
        currentNumber = "";
        waitingForSecondNumber = false;
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
        previousNumber = calculate(previousNumber, currentNumber, operatorValue);
        updateResult(previousNumber);
      } else {
        previousNumber = currentNumber;
      }

      operatorValue = operator.textContent;
      currentNumber = "";
      waitingForSecondNumber = true;
      updateResult(previousNumber + " " + operatorValue);
      removeActiveClassFromOperators();
      operator.classList.add('active'); // Add active class to the clicked operator
    });
  });

  equals.addEventListener("click", () => {
    if (previousNumber && currentNumber && operatorValue) {
      resultValue = calculate(previousNumber, currentNumber, operatorValue);
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
});
