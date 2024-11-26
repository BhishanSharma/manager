let start = document.querySelector(".submit");

start.addEventListener("click", () => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
  errorMessage.innerHTML = "";

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (username.trim() === "") {
    showErrorMessage("Username is required.");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    showErrorMessage("Please enter a valid email address.");
    return;
  }

  if (password.length === 0) {
    showErrorMessage("Please enter a password.");
    return;
  }
  window.location.href = "Home.html";
});

function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  errorMessage.innerHTML = `<span class="error-icon">&#x26A0;</span> ${message}`; // Add a warning icon

  errorMessage.classList.add("error-visible");

  setTimeout(() => {
    errorMessage.classList.remove("error-visible");
    errorMessage.style.display = "none";
  }, 5000);
}

document.getElementById("username").addEventListener("input", () => {
  document.getElementById("username").setCustomValidity("");
});

document.getElementById("email").addEventListener("input", () => {
  document.getElementById("email").setCustomValidity("");
});

document.getElementById("password").addEventListener("input", () => {
  document.getElementById("password").setCustomValidity("");
});
