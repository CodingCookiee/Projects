//Javascript for the App
const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

checkBtn.addEventListener("click", function () {
  const text = textInput.value.trim();

  if (!text) {
    alert("Please input a value");
    return;
  }

  const processedText = text.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const reversedText = processedText.split("").reverse().join("");

  const isPalindrome = processedText === reversedText;

  resultDiv.textContent = `${text} ${
    isPalindrome ? "is" : "is not"
  } a palindrome`;
});
