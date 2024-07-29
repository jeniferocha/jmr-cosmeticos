document.addEventListener("DOMContentLoaded", () => {
  const carrinhoLista = document.getElementById("carrinho-lista");
  const limparCarrinhoButton = document.getElementById("limpar-carrinho");
  const totalPrecoElement = document.getElementById("total-preco");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let totalPreco = 0;

  let userLogado = JSON.parse(localStorage.getItem("userLogado"));
  if (userLogado) {
    carrinho = carrinho.map((produto) => {
      if (!produto.clienteId || !produto.clienteNome) {
        return {
          ...produto,
          clienteId: userLogado._id,
          clienteNome: userLogado.name,
        };
      }
      return produto;
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  carrinho.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      ${item.nome} - ${item.preco}
    
    `;
    carrinhoLista.appendChild(listItem);
    const preco = parseFloat(item.preco.replace("R$", "").replace(",", "."));
    totalPreco += preco;
  });
  totalPrecoElement.textContent = `Total: R$ ${totalPreco.toFixed(2).replace(".", ",")}`;

  limparCarrinhoButton.addEventListener("click", () => {
    localStorage.removeItem("carrinho");
    totalPrecoElement.textContent = "Total: R$ 0,00";
    while (carrinhoLista.firstChild) {
      carrinhoLista.removeChild(carrinhoLista.firstChild);
    }
  });
});

function usuarioLogado() {
  let userLogado = JSON.parse(localStorage.getItem("userLogado"));
  if (userLogado) {
    const usuarioLogado = document.querySelector(".user_logado");
    usuarioLogado.innerHTML = ` 
              <label class="user_logado">Olá, ${userLogado.name}</label>        
          `;
  }
}

usuarioLogado();
