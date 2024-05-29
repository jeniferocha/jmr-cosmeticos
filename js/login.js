import mostrarMensagem from "./alerts.js";

const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const formulario = document.getElementById("data-formulario");
const recuperacaoSenha = document.getElementById("recuperar_senha");

recuperacaoSenha.addEventListener("click", (event) => {
  event.preventDefault();
  mostrarMensagem("alerta", "Recuperação de senha enviado para o e-mail.");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2500);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  let usuarioEncontrado = false;
  let userLogado;

  for (let i = 0; i < cadastros.length; i++) {
    if (emailLogin.value === cadastros[i].email && senhaLogin.value === cadastros[i].senha) {
      userLogado = cadastros[i];
      console.log("Usuário logado:", userLogado);
      localStorage.setItem("userLogado", JSON.stringify(userLogado));
      usuarioEncontrado = true;
      break;
    }
  }

  if (!usuarioEncontrado) {
    mostrarMensagem("erro", "E-mail ou senha incorreto.");
    setTimeout(() => {
      window.location.href = "./pages/login.html";
    }, 2500);
  } else {
    mostrarMensagem("sucesso", "Login realizado com sucesso.");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2500);
  }
});
