// import "./main.js";
// import "./header.js";
// import "./footer.js";

var lsUser = localStorage["user"];
parseUser(lsUser);

function parseUser(lsUser) {
  if (lsUser) {
    // Se "user" existe no local storage, iniciar parse. Se não, carregar login
    var user = JSON.parse(localStorage["user"]);
    console.log(user);
    console.log(user.metadata.avatar);
    document.getElementById("ribbonUserName").innerText = user.name;
    document.getElementById("ribbonUserEmail").innerText = user.email;
    document.getElementById("userAvatar").src = user.metadata.avatar;
  } else {
    window.location.href = "./login.html";
  }
}

// Event listener - Botão "Meus Voos"
document.getElementById("menuMeusVoos").addEventListener("click", () => {
  var activeTab = document.getElementsByClassName("activeTab");
  if (activeTab[0]) {
    activeTab.classList.add("menu-option");
    activeTab.classList.removeItem("activeTab");
  }
  activeTab = document.getElementById("menuMeusVoos");
  activeTab.classList.removeItem("menu-option");
  activeTab.classList.add("activeTab");
});

// Event listener - Botão "Logout"
document.getElementById("menuLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
});
