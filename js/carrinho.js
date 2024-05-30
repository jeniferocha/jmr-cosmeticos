document.addEventListener("DOMContentLoaded", () => {
  const carrinhoLista = document.getElementById("carrinho-lista");
  const limparCarrinhoButton = document.getElementById("limpar-carrinho");
  const totalPrecoElement = document.getElementById("total-preco");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let totalPreco = 0;

  carrinho.forEach((produto) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}"">
      ${produto.nome} - ${produto.preco}
    `;
    carrinhoLista.appendChild(listItem);
    const preco = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
    totalPreco += preco;
  });
  totalPrecoElement.textContent = `Total: R$ ${totalPreco.toFixed(2).replace(".", ",")}`;

  limparCarrinhoButton.addEventListener("click", () => {
    localStorage.removeItem("carrinho");
    while (carrinhoLista.firstChild) {
      carrinhoLista.removeChild(carrinhoLista.firstChild);
    }
  });
});
