document.addEventListener("DOMContentLoaded", () => {
  const carrinhoLista = document.getElementById("carrinho-lista");
  const limparCarrinhoButton = document.getElementById("limpar-carrinho");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.forEach((produto) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px;">
      ${produto.nome} - ${produto.preco}
    `;
    carrinhoLista.appendChild(listItem);
  });

  limparCarrinhoButton.addEventListener("click", () => {
    localStorage.removeItem("carrinho");
    while (carrinhoLista.firstChild) {
      carrinhoLista.removeChild(carrinhoLista.firstChild);
    }
  });
});
