const footerTemplate = document.getElementById("footer");

fetch("./footer.html")
  .then((resp) => resp.text())
  .then((dados) => (footerTemplate.innerHTML = dados));
