// ===== MODEL =====
class Venda {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
  }
}

class VendaModel {
  constructor() {
    this.vendas = [];
  }

  adicionarVenda(venda) {
    this.vendas.push(venda);
  }

  listarVendas() {
    return this.vendas;
  }
}

// ===== VIEW =====
class VendaView {
  constructor() {
    this.tabela = document.getElementById('tabelaVendas');
    this.inputProduto = document.getElementById('produto');
    this.inputQuantidade = document.getElementById('quantidade');
  }

  limparCampos() {
    this.inputProduto.value = '';
    this.inputQuantidade.value = '';
    this.inputProduto.focus();
  }

  mostrarVendas(vendas) {
    this.tabela.innerHTML = ''; // limpa tabela
    vendas.forEach(venda => {
      const row = document.createElement('tr');
      row.classList.add('hover:bg-gray-700', 'transition-colors');

      row.innerHTML = `
        <td class="px-4 py-2 border border-gray-600">${venda.produto}</td>
        <td class="px-4 py-2 border border-gray-600">${venda.quantidade}</td>
      `;
      this.tabela.appendChild(row);
    });
  }

  getProduto() {
    return this.inputProduto.value.trim();
  }

  getQuantidade() {
    return parseInt(this.inputQuantidade.value);
  }
}

// ===== CONTROLLER =====
class VendaController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Eventos
    document.getElementById('registrarBtn').addEventListener('click', () => this.adicionarVenda());
    document.getElementById('listarBtn').addEventListener('click', () => this.listarVendas());
  }

  adicionarVenda() {
    const produto = this.view.getProduto();
    const quantidade = this.view.getQuantidade();

    if (!produto || isNaN(quantidade) || quantidade <= 0) {
      alert('Preencha corretamente os campos!');
      return;
    }

    const venda = new Venda(produto, quantidade);
    this.model.adicionarVenda(venda);
    this.view.limparCampos();
    this.listarVendas();
  }

  listarVendas() {
    const vendas = this.model.listarVendas();
    this.view.mostrarVendas(vendas);
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  const model = new VendaModel();
  const view = new VendaView();
  const controller = new VendaController(model, view);
});
