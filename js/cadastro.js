import mostrarMensagem from "./alerts.js";
import ehUmCPF from "./valida-cpf.js";

const formulario = document.getElementById("data-formulario");
const camposDoFormulario = document.querySelectorAll("[required]");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const campoCPF = e.target.elements["cpf"];
  if (!ehUmCPF(campoCPF)) {
    mostrarMensagem("erro", "Por favor, preencha um CPF válido.");
    return;
  }

  const dadosUsuario = {
    name: e.target.elements["nome"].value,
    cpf: e.target.elements["cpf"].value,
    email: e.target.elements["email"].value,
    password: e.target.elements["senha"].value,
  };

  console.log("Dados do usuário:", dadosUsuario);

  // let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  // cadastros.push(dadosUsuario);

  // localStorage.setItem("cadastros", JSON.stringify(cadastros));
  try {
    const response = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosUsuario),
    });

    if (response.ok) {
      mostrarMensagem("sucesso", "Cadastro realizado, aguarde você será redirecionado.");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2500);
    } else {
      const errorData = await response.json();
      mostrarMensagem("erro", `Erro ao cadastrar: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    mostrarMensagem("erro", "Erro ao cadastrar. Tente novamente mais tarde.");
  }
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
