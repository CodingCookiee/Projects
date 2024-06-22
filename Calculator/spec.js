describe("Calculator", () => {
    let result, numbers, operators, equals, clear, backspace, sign;
  
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="result"></div>
        <button class="number">1</button>
        <button class="number">2</button>
        <button class="operator">+</button>
        <button class="operator">-</button>
        <button id="equals">=</button>
        <button id="clear">C</button>
        <button id="backspace">←</button>
        <button id="sign">±</button>
      `;
  
      result = document.getElementById("result");
      numbers = document.querySelectorAll(".number");
      operators = document.querySelectorAll(".operator");
      equals = document.getElementById("equals");
      clear = document.getElementById("clear");
      backspace = document.getElementById("backspace");
      sign = document.getElementById("sign");
  
      // Initialize the calculator
      require('./calculator');
    });
  
    it("should display the number when a number button is clicked", () => {
      numbers[0].click();
      expect(result.textContent).toBe("1");
   
      numbers[1].click();
      expect(result.textContent).toBe("12");
    });
  
    it("should display the operator when an operator button is clicked", () => {
      numbers[0].click();
      operators[0].click();
      expect(result.textContent).toBe("1 +");
    });
  
    it("should calculate the result when equals button is clicked", () => {
      numbers[0].click();
      operators[0].click();
      numbers[1].click();
      equals.click();
      expect(result.textContent).toBe("3");
    });
  
    it("should clear the result when clear button is clicked", () => {
      numbers[0].click();
      clear.click();
      expect(result.textContent).toBe("");
    });
  
    it("should backspace the current number when backspace button is clicked", () => {
      numbers[0].click();
      numbers[1].click();
      backspace.click();
      expect(result.textContent).toBe("1");
    });
  
    it("should change the sign of the current number when sign button is clicked", () => {
      numbers[0].click();
      sign.click();
      expect(result.textContent).toBe("-1");
    });
  });
  