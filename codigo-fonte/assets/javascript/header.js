function includeHeader() {
  var headerPlaceholder = document.getElementById("header");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "header.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      headerPlaceholder.innerHTML = xhr.responseText;
    }
  };
  console.log(xhr);
  xhr.send();
}

// Chame a função para incluir o header
includeHeader();

const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector(".directories");

// openMenu.addEventListener("click", () => {
//   menu.classList.add("activeMenu");
// });
// closeMenu.addEventListener("click", () => {
//   menu.classList.remove("activeMenu");
// });
