import mostrarMensagem from "./alerts.js";
import ehUmCPF from "./valida-cpf.js";

const formulario = document.getElementById("data-formulario");
const camposDoFormulario = document.querySelectorAll("[required]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const campoCPF = e.target.elements["cpf"];
  if (!ehUmCPF(campoCPF)) {
    mostrarMensagem("erro", "Por favor, preencha um CPF válido.");
    return;
  }

  const dadosUsuario = {
    nome: e.target.elements["nome"].value,
    cpf: e.target.elements["cpf"].value,
    email: e.target.elements["email"].value,
    senha: e.target.elements["senha"].value,
  };

  console.log("Dados do usuário:", dadosUsuario);

  let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.push(dadosUsuario);

  localStorage.setItem("cadastros", JSON.stringify(cadastros));

  mostrarMensagem("sucesso", "Cadastro realizado, aguarde você será redirecionado.");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2500);
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificaCampo(campo) {
  campo.setCustomValidity("");
  if (campo.name === "cpf") {
    if (!ehUmCPF(campo)) {
      campo.setCustomValidity("CPF inválido");
      mostrarMensagem("erro", "Por favor, preencha um CPF válido.");
    }
  }
}
