class Aluno {
  constructor() {
    this.nome = document.getElementById("nomeAluno");
    this.btn = document.getElementById("calcularBtn");
    this.resultado = document.getElementById("resultado");

    this.mostrar();
  }

  checkInputs(nome, n1, n2) {
    if (!nome || isNaN(n1) || isNaN(n2)) {
      alert("Ops, preencha todos os campos");
      return false;
    }

    if (n1 < 0 || n2 < 0) {
      this.resultado.innerText = "Ops, não aceitamos notas negativas.";
      this.resultado.classList.add("error");
      return false;
    }

    if (n1 > 10 || n2 > 10) {
      this.resultado.innerText = "Ops, não aceitamos notas maiores que 10";
      this.resultado.classList.add("error");
      return false;
    }
    return true;
  }

  adicionarNota() {
    return {
      nome: this.nome.value.trim(),
      n1: parseFloat(document.getElementById("nota1").value),
      n2: parseFloat(document.getElementById("nota2").value),
    };
  }

  calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
  }

  verificarAprovacao(nome, media) {
    let mensagem = `Olá, ${nome}! Sua média é ${media.toFixed(1)}`;

    this.resultado.className = "resultado-nota";

    if (media >= 7) {
      this.resultado.innerText = `${mensagem} (Aprovado 👏)`;
      this.resultado.classList.add("aprovado");
    } else {
      this.resultado.innerText = `${mensagem} (Reprovado 😢)`;
      this.resultado.classList.add("reprovado");
    }
  }

  mostrar() {
    this.btn.addEventListener("click", () => {
      let { nome, n1, n2 } = this.adicionarNota();

      if (!this.checkInputs(nome, n1, n2)) return;

      let media = this.calcularMedia(n1, n2);
      this.verificarAprovacao(nome, media);
    });
  }
}

const aluno = new Aluno();
