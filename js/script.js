import mostrarMensagem from "./alerts.js";

const comprarProdutos = document.querySelectorAll(".botao-produtos");

comprarProdutos.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      event.preventDefault();
      mostrarMensagem("info", "Produto adicionado no carrinho de compras.");
    });
  });

