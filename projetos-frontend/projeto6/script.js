class Conta {
    #saldo
    constructor(saldoInicial = 0) {
        this.#saldo = saldoInicial
    }

    checkValor(valor) {
        const numero = parseFloat(valor)
        if (isNaN(numero) || numero <= 0) {
            alert('Valor inválido')
            return null
        }
        return numero
    }

    depositar(valor) {
        this.#saldo += valor
        this.atualizarSaldo()
    }

    sacar(valor) {
        if (valor > this.#saldo) {
            alert('Ops, saldo insuficiente')
            return
        }
        this.#saldo -= valor
        this.atualizarSaldo()
    }

    getSaldo() {
        return this.#saldo
    }

    atualizarSaldo() {
        const saldoSpan = document.getElementById('saldo')
        saldoSpan.innerText = this.#saldo.toFixed(2)
    }
}

// Instancia a conta com saldo inicial 0
const conta = new Conta(0)

// Eventos dos botões
document.getElementById('depositarBtn').addEventListener('click', () => {
    const valorInput = document.getElementById('valor').value
    const valor = conta.checkValor(valorInput)
    if (valor) conta.depositar(valor)
})

document.getElementById('sacarBtn').addEventListener('click', () => {
    const valorInput = document.getElementById('valor').value
    const valor = conta.checkValor(valorInput)
    if (valor) conta.sacar(valor)
})
