function montarTitulo(tipo) {
  switch (tipo) {
    case "erro":
      return "<b>Erro!</b> <br />";
    case "sucesso":
      return "<b>Sucesso!</b> <br />";
    case "alerta":
      return "<b>Alerta!</b> <br />";
    case "info":
      return "<b>Mensagem!</b> <br />";
    default:
      "";
  }
}

function mostrarMensagem(tipo, mensagem) {
  const elementoMensagem = document.getElementById("mensagem_conteudo");
  elementoMensagem.classList.add("mensagem", tipo);
  elementoMensagem.innerHTML = montarTitulo(tipo) + mensagem;
  elementoMensagem.style.display = "block";

  setTimeout(() => {
    elementoMensagem.style.display = "none";
  }, 4000);
}

async function carregarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/produtos");
    const data = await response.json();

    const carrosselIds = ["produtos-swiper-2", "produtos-swiper-3"];
    carrosselIds.forEach((carrosselId) => {
      const produtosContainer = document.getElementById(carrosselId);

      produtosContainer.innerHTML = "";

      data.forEach((produto) => {
        const cardProduto = document.createElement("div");
        cardProduto.classList.add("swiper-slide");
        cardProduto.innerHTML = `
          <div class="card-produto">
            <h1 class="texto-produtos">${produto.name}</h1>
            <img src="data:image/jpeg;base64,${produto.imageURL}" alt="${produto.name}" class="imagem-produtos"/>
            <h3 class="preco-produtos">R$ ${produto.price.toFixed(2)}</h3>
            <a href="#" class="botao-produtos">COMPRAR</a>
          </div>
        `;
        produtosContainer.appendChild(cardProduto);
      });
    });
    swiper2.update();
    swiper3.update();

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
        mostrarMensagem("sucesso", "Produto adicionado no carrinho!!");
        renderCarrinho();
      });
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

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

document.addEventListener("DOMContentLoaded", carregarProdutos);
