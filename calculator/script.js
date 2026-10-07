// Arithmetic functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) { return "Error: cannot divide by zero"; }
  return a / b;
}

// Chooses the right function using switch
function calculate(a, b, operator) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default:  return "Error: invalid operator";
  }
}

// Reads the inputs and shows the result
function showResult() {
  var a = parseFloat(document.getElementById("num1").value);
  var b = parseFloat(document.getElementById("num2").value);
  var op = document.getElementById("op").value;
  var out = document.getElementById("result");

  if (isNaN(a) || isNaN(b)) {
    out.className = "error";
    out.textContent = "Error: enter both numbers";
    return;
  }

  var result = calculate(a, b, op);
  if (typeof result === "string") {
    out.className = "error";
    out.textContent = result;
  } else {
    out.className = "";
    out.textContent = a + " " + op + " " + b + " = " + result;
  }
}

document.getElementById("calc").addEventListener("click", showResult);
showResult();