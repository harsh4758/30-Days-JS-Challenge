const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");



dobInput.addEventListener("focus", () => {
  if (typeof dobInput.showPicker === "function") {
    dobInput.showPicker();
  }
});


const todayDate = new Date().toISOString().split("T")[0];
dobInput.max = todayDate;

calculateBtn.addEventListener("click", () => {
  const dobValue = dobInput.value;

  if (!dobValue) {
    result.textContent = "Please enter your Date of Birth";
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  let year = today.getFullYear() - dob.getFullYear();
  let month = today.getMonth() - dob.getMonth();
  let day = today.getDate() - dob.getDate();


  if (day < 0) {
    month--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    day += prevMonth.getDate();
  }


  if (month < 0) {
    year--;
    month += 12;
  }


  result.textContent = `Your Age is ${year} Years, ${month} Months, and ${day} Days.`;
});
