import mostrarMensagem from "./alerts.js";

const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const formulario = document.getElementById("data-formulario");
const recuperacaoSenha = document.getElementById("recuperar_senha");

recuperacaoSenha.addEventListener("click", (event) => {
  event.preventDefault();
  mostrarMensagem("alerta", "Recuperação de senha enviada para o e-mail.");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2500);
});

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailLogin.value;
  const password = senhaLogin.value;
  console.log(email, password);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);

    if (response.ok) {
      const userLogado = await response.json();
      console.log("Usuário logado:", userLogado); 
      localStorage.setItem("userLogado", JSON.stringify(userLogado));
      mostrarMensagem("sucesso", "Login realizado com sucesso.");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2500);
    } else {
      const errorData = await response.json();
      console.error("Erro ao realizar login:", errorData.message); 
      mostrarMensagem("erro", "E-mail ou senha incorreto.");
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    mostrarMensagem("erro", "Erro ao realizar login. Tente novamente mais tarde.");
  }
});
