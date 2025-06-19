const form = document.getElementById("form");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  const username = userNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Username
  if (username === "" || username.length < 3) {
    showError(userNameInput, "Please enter at least 3 characters");
  } else {
    showSuccess(userNameInput);
  }

  // Email
  if (!isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email");
  } else {
    showSuccess(emailInput);
  }

  // Password
  if (password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
  } else {
    showSuccess(passwordInput);
  }

  // Confirm Password
  if (confirmPassword !== password || confirmPassword === "") {
    showError(confirmPasswordInput, "Passwords do not match");
  } else {
    showSuccess(confirmPasswordInput);
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
}

function showSuccess(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = "";
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
