const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector(".directories");

openMenu.addEventListener("click", () => {
  menu.classList.add("activeMenu");
});
closeMenu.addEventListener("click", () => {
  menu.classList.remove("activeMenu");
});
