// signup.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Now log in.");
  window.location.href = "login.html";
});

