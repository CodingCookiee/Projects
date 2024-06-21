//javascript
const select = document.querySelector("select");
const list = document.querySelector("ul");
const h1 = document.querySelector("h1");

// Create an object to store the number of days for each month
const monthDays = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

select.addEventListener("change", () => {
  const choice = select.value;
  createCalendar(monthDays[choice], choice);
});

function createCalendar(days, month) {
  list.innerHTML = "";
  h1.textContent = month;
  for (let i = 1; i <= days; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = i;
    list.appendChild(listItem);
  }
}

// Initialize the calendar with January
createCalendar(monthDays.January, "January");
