import "./main.js";

const loading = document.getElementById("loadingContent");
const image = document.getElementById("bgimage");

const apiKey = "mwq8fMA8XVjkukAZNIbg8Bx9Np99bC4zSTNkKgJEgbo";

const searchQuery = "aviao";

async function fetchImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${searchQuery}`
    );
    const data = await response.json();

    image.src = data.urls.regular;
    image.alt = data.alt_description;
    setTimeout(() => {
      loading.classList.add("hidden");
    }, 2000);
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    setTimeout(() => {
      loading.classList.add("hidden");
    }, 2000);
  }
}

window.addEventListener("load", fetchImages);