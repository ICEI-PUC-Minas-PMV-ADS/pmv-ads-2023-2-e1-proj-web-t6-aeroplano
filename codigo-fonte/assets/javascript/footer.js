function includeFooter() {
  var footerPlaceholder = document.getElementById("footer");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "footer.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      footerPlaceholder.innerHTML = xhr.responseText;
    }
  };
  console.log(xhr);
  xhr.send();
}

// Chame a função para incluir o footer
includeFooter();
