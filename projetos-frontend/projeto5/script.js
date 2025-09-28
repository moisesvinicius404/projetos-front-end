class Carrinho {
    constructor() {
        this.nome = document.getElementById('nomeProduto');
        this.preco = document.getElementById('precoProduto');
        this.listaCarrinho = document.getElementById('listaCarrinho');
        this.total = document.getElementById('total');
        this.mensagemError = document.getElementById('error');
        this.precoTotal = 0;

        // Recuperar itens já salvos
        this.produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
        this.renderizar();
    }

    salvar() {
        localStorage.setItem("carrinho", JSON.stringify(this.produtos));
    }

    checkInput() {
        const nome = this.nome.value.trim();
        const preco = parseFloat(this.preco.value.trim());
        
        if (!nome || isNaN(preco)) {
            this.mensagemError.innerText = 'Ops, preencha todos os campos';
            this.mensagemError.classList.add('error');
            return false;
        }

        if (preco < 0 || preco === 0) {
            this.mensagemError.innerText = 'Insira um preço maior que 0';
            this.mensagemError.classList.add('error');
            return false;
        }

        

        this.mensagemError.innerText = '';
        this.mensagemError.classList.remove('error');
        return true;
    }

    adicionarProduto() {
        const nome = this.nome.value.trim();
        const preco = parseFloat(this.preco.value.trim());

        // adiciona no array
        this.produtos.push({ nome, preco });

        // salva no localStorage
        this.salvar();

        // re-renderiza a lista
        this.renderizar();

        
        this.nome.value = "";
        this.preco.value = "";
    }

    removerProduto(index) {
        if (confirm("Tem certeza que deseja excluir este produto do carrinho?")) {
            this.produtos.splice(index, 1);
            this.salvar();
            this.renderizar();
        }
    }

    renderizar() {
        this.listaCarrinho.innerHTML = "";
        this.precoTotal = 0;

        this.produtos.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("produto");
            li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

            // botão excluir
            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "❌";
            btnExcluir.classList.add("excluir");
            btnExcluir.addEventListener("click", () => this.removerProduto(index));

            li.appendChild(btnExcluir);
            this.listaCarrinho.appendChild(li);

            this.precoTotal += item.preco;
        });

        this.total.innerText = this.precoTotal.toFixed(2);
    }
}

const carrinho = new Carrinho();

document.getElementById('adicionarBtn').addEventListener('click', () => {
    if (carrinho.checkInput()) {
        carrinho.adicionarProduto();
    }
});
