// import "./main.js";
// import "./header.js";
// import "./footer.js";

var lsUser = localStorage["user"];
parseUser(lsUser);

function parseUser(lsUser) {
  if (lsUser) {
    // Se "user" existe no local storage, iniciar parse. Se não, carregar login
    var user = JSON.parse(localStorage["user"]);
    document.getElementById("ribbonUserName").innerText = user.name;
    document.getElementById("ribbonUserEmail").innerText = user.email;
    document.getElementById("userAvatar").src = user.metadata.avatar;
  } else {
    window.location.href = "./login.html";
  }
}
const menuButtons = document.querySelectorAll(".menu-option");

console.log(menuButtons);
menuButtons.forEach((elemento) => {
  elemento.addEventListener("click", (e) => {
    menuButtons.forEach((elemento) => {
      elemento.classList.remove("activeTab");
    });
    elemento.classList.add("activeTab");
  });
});

// Event listener - Botão "Logout"
document.getElementById("menuLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
});
