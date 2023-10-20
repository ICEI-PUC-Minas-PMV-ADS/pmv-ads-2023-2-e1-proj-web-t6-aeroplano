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

// Event listener - Botão "Logout"
document.getElementById("menuLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
});

menuButtons.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    menuButtons.forEach((elemento) => {
      elemento.classList.remove("activeTab");
    });
    elemento.classList.add("activeTab");
    clearMainArea();
    if (elemento.id == "menuDisponibilidade") {
      loadMainArea("disponibilidade");
    }
  });
});

function loadMainArea(app) {
  const mainAreaApp = document.getElementById("main-area");

  fetch(`./${app}.html`)
    .then((resp) => resp.text())
    .then((dados) => {
      mainAreaApp.innerHTML = dados;

      if ((app = "disponibilidade")) {
        const event = new Event("disponibilidadeContentLoaded");
        document.dispatchEvent(event);
      }
    });
}

document.addEventListener("disponibilidadeContentLoaded", function () {
  const script = document.createElement("script");
  script.src = `./assets/javascript/disponibilidade.js`;
  document.body.appendChild(script);
});

function clearMainArea() {
  const mainAreaApp = document.getElementById("main-area");
  mainAreaApp.innerHTML = "";
}
