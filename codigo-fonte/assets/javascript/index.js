import "./main.js";
import "./header.js";

document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;

      if (answer.style.display === "block") {
        this.classList.remove('open')
        answer.style.display = "none";
      } else {
        this.classList.add('open')
        answer.style.display = "block";
      }
    });
  });
});
/*
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

*/
