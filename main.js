const questionForm = document.querySelector("#question-form");
const questionInput = document.querySelector("#commercial-question");
const questionError = document.querySelector("#question-error");
const commercialPhone = "5511933711956";
const contactMessages = {
  intro: "Olá! Gostaria de conhecer as soluções da GCASPP.",
  demo: "Olá! Gostaria de agendar uma demonstração das soluções da GCASPP.",
};

function whatsappUrl(message) {
  const url = new URL(`https://wa.me/${commercialPhone}`);
  url.searchParams.set("text", message);
  return url.toString();
}

function clearQuestionError() {
  questionError.textContent = "";
  questionInput.removeAttribute("aria-invalid");
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl(contactMessages[link.dataset.whatsapp]);
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();

  if (!question) {
    questionError.textContent = "Escreva uma pergunta para continuar.";
    questionInput.setAttribute("aria-invalid", "true");
    questionInput.focus();
    return;
  }

  clearQuestionError();
  window.open(whatsappUrl(question), "_blank", "noopener,noreferrer");
});

questionInput.addEventListener("input", () => {
  if (questionError.textContent && questionInput.value.trim()) {
    clearQuestionError();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
