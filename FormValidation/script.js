var form = document.getElementById("regForm");

// Show or clear an error for a field
function setError(id, message) {
  var input = document.getElementById(id);
  var error = document.getElementById(id + "Error");
  error.textContent = message;
  input.className = message === "" ? "valid" : "invalid";
}

// Each validator returns true if valid, false if not
function validateName() {
  var value = document.getElementById("name").value.trim();
  if (value === "") {
    setError("name", "Name is required.");
    return false;
  }
  if (value.length < 3) {
    setError("name", "Name must be at least 3 characters.");
    return false;
  }
  if (!/^[A-Za-z ]+$/.test(value)) {
    setError("name", "Name can contain only letters and spaces.");
    return false;
  }
  setError("name", "");
  return true;
}

function validateEmail() {
  var value = document.getElementById("email").value.trim();
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === "") {
    setError("email", "Email is required.");
    return false;
  }
  if (!pattern.test(value)) {
    setError("email", "Enter a valid email, like name@example.com.");
    return false;
  }
  setError("email", "");
  return true;
}

function validatePhone() {
  var value = document.getElementById("phone").value.trim();
  if (value === "") {
    setError("phone", "Phone number is required.");
    return false;
  }
  if (!/^[0-9]{10}$/.test(value)) {
    setError("phone", "Phone number must be exactly 10 digits.");
    return false;
  }
  setError("phone", "");
  return true;
}

function validatePassword() {
  var value = document.getElementById("password").value;
  if (value === "") {
    setError("password", "Password is required.");
    return false;
  }
  if (value.length < 8) {
    setError("password", "Password must be at least 8 characters.");
    return false;
  }
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
    setError("password", "Use an uppercase letter, a lowercase letter and a number.");
    return false;
  }
  setError("password", "");
  return true;
}

function validateConfirm() {
  var password = document.getElementById("password").value;
  var value = document.getElementById("confirm").value;
  if (value === "") {
    setError("confirm", "Please confirm your password.");
    return false;
  }
  if (value !== password) {
    setError("confirm", "Passwords do not match.");
    return false;
  }
  setError("confirm", "");
  return true;
}

// Validate each field when the user leaves it
document.getElementById("name").addEventListener("blur", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirm").addEventListener("blur", validateConfirm);

// Validate everything on submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var results = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
    validateConfirm()
  ];
  var allValid = results.every(function (r) { return r; });

  var success = document.getElementById("success");
  if (allValid) {
    success.textContent = "Registration successful!";
    form.reset();
    var inputs = form.querySelectorAll("input");
    inputs.forEach(function (input) { input.className = ""; });
  } else {
    success.textContent = "";
  }
});