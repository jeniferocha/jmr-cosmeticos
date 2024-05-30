import mostrarMensagem from "./alerts.js";

document.addEventListener("DOMContentLoaded", () => {
  const comprarButtons = document.querySelectorAll(".botao-produtos");
  const carrinhoLista = document.getElementById("carrinho-lista");

  const renderCarrinho = () => {
    carrinhoLista.innerHTML = "";
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.forEach((produto) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px;">
        ${produto.nome} - ${produto.preco}
      `;
      carrinhoLista.appendChild(listItem);
    });
  };

  comprarButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const slide = button.closest(".swiper-slide");
      const nomeProduto = slide.querySelector(".texto-produtos").textContent;
      const precoProduto = slide.querySelector(".preco-produtos").textContent;
      const productImage = slide.querySelector("img").src;

      const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        imagem: productImage,
      };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      mostrarMensagem("info", "Produto adicionado no carrinho!!");
      renderCarrinho();
    });
  });

  renderCarrinho();
});
