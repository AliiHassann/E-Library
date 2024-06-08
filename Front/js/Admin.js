document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("user_token");
  e.preventDefault();
  window.location.href = "index.html";
});
