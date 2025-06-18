
  const dateInput = document.getElementById("date");
  const button = document.querySelector(".input-box button");

  // 🔒 Disable future dates
  dateInput.max = new Date().toISOString().split("T")[0];

  button.addEventListener("click", () => {
    const birthDate = new Date(dateInput.value);
    const today = new Date();

    if (dateInput.value === "") {
      alert("Please select your date of birth.");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const resultBox = document.createElement("p");
    resultBox.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
    resultBox.style.marginTop = "20px";
    resultBox.style.fontSize = "20px";
    resultBox.style.fontWeight = "500";

    const existing = document.querySelector(".calculator p");
    if (existing) existing.remove();

    document.querySelector(".calculator").appendChild(resultBox);
  });

