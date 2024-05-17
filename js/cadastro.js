import mostrarMensagem from "./alerts.js";

const formulario = document.getElementById("data-formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const dadosUsuario = {
    nome: e.target.elements["nome"].value,
    cpf: e.target.elements["cpf"].value,
    email: e.target.elements["email"].value,
    senha: e.target.elements["senha"].value,
  };

  console.log("Dados do usuário:", dadosUsuario);

  localStorage.setItem("cadastro", JSON.stringify(dadosUsuario));

  mostrarMensagem("sucesso", "Cadastro realizado, aguarde você será redirecionado.");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2500);
});
