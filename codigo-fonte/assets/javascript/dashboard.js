var lsUser = localStorage["user"];
parseUser(lsUser);

function parseUser(lsUser) {
  if (lsUser) {
    // Se "user" existe no local storage, iniciar parse. Se não, carregar login
    var user = JSON.parse(localStorage["user"]);
    document.getElementById("ribbonUserName").innerText = user.name;
    document.getElementById("ribbonUserEmail").innerText = user.email;
    if (user.metadata && user.metadata.avatar) {
      document.getElementById("userAvatar").src = user.metadata.avatar;
    }
  } else {
    window.location.href = "./login.html";
  }
}

// Event listener - Botão "Logout"
document.getElementById("menuLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  window.location.href = "./login.html";
});

const menuButtons = document.querySelectorAll(".menu-option");
menuButtons.forEach((element) => {
  element.addEventListener("click", () => {
    menuButtons.forEach((element) => {
      element.classList.remove("activeTab");
    });
    element.classList.add("activeTab");
    clearMainArea();
    if (element.id == "menuDisponibilidade") {
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
