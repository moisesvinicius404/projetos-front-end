class Produto {
  constructor(nomeInput, precoInput) {
    this.nomeInput = nomeInput;
    this.precoInput = precoInput;
    this.lista = document.getElementById("listaProdutos");
  }

  adicionarProduto() {
    const nome = this.nomeInput.value.trim();
    const preco = parseFloat(this.precoInput.value);
    const mensagens = document.getElementById("mensagens");
    mensagens.innerHTML = ""; 

    // Validações
    if (!nome || isNaN(preco)) {
      const mensagemError = document.createElement("p");
      mensagemError.innerText = "Ops, preencha todos os campos.";
      mensagemError.classList.add("error");
      mensagens.appendChild(mensagemError);
      return;
    }

    if (preco < 0) {
      const mensagemError = document.createElement("p");
      mensagemError.innerText = "Não aceitamos preços negativos.";
      mensagemError.classList.add("error");
      mensagens.appendChild(mensagemError);
      return;
    }

    const li = document.createElement("li");
    li.classList.add("produto");
    li.innerHTML = `<span>${nome}</span> R$ ${preco.toFixed(2)}`;

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "❌";
    btnExcluir.classList.add("excluir");

    btnExcluir.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja excluir este produto?")) {
        this.lista.removeChild(li);
      }
    });

    li.appendChild(btnExcluir);
    this.lista.appendChild(li);

    this.nomeInput.value = "";
    this.precoInput.value = "";
  }
}

const nomeInput = document.getElementById("nomeProduto");
const precoInput = document.getElementById("precoProduto");

// instância
const produto = new Produto(nomeInput, precoInput);

document.getElementById("adicionarProdutoBtn").addEventListener("click", () => {
  produto.adicionarProduto();
});
