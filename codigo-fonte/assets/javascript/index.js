import "./main.js";

// Adicionar animações
AOS.init();

const body = document.querySelector("body");


//Abrir e fechar (Perguntas Frequentes)
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;

      if (answer.style.display === "block") {
        this.classList.remove("open");
        answer.style.display = "none";
      } else {
        this.classList.add("open");
        answer.style.display = "block";
      }
    });
  });
});


//Ações para o modal, parte do banner onde está escrito "O que fazemos"
const btnOpenOqueFazemos = document.getElementById("click_oquefazemos");
const modalOqueFazemos = document.getElementById("oquefazemos");
const btnCloseBgOqueFazemos = document.getElementById("oquefazemos_closebg");
const btnCloseOqueFazemos = document.getElementById("oquefazemos_close");
const videoOqueFazemos = document.getElementById("oquefazemos_video");

function openModalOquefazemos(){
  modalOqueFazemos.classList.add("active");
  body.classList.add("overflowHidden");
}

function closeModalOquefazemos(){
  modalOqueFazemos.classList.remove("active");
  body.classList.remove("overflowHidden");
  //Pausar o video
  videoOqueFazemos.setAttribute('src', videoOqueFazemos.getAttribute('src'));
}

btnOpenOqueFazemos.addEventListener("click", openModalOquefazemos);
btnCloseBgOqueFazemos.addEventListener("click", closeModalOquefazemos);
btnCloseOqueFazemos.addEventListener("click", closeModalOquefazemos);

