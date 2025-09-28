class Tarefa {
    constructor() {
        this.nome = document.getElementById('tarefaInput')
        this.botao = document.getElementById('adicionarBtn')
        this.container = document.getElementById('listaTarefas')

        this.inicializar()
    }

    inicializar() {
        this.botao.addEventListener('click', () => {
            const nome = this.nome.value.trim()
            if (nome === '') {
                alert('Digite uma tarefa.')
                return
            }

            const li = document.createElement('li')
            li.classList.add('tarefa')

            // texto da tarefa
            const span = document.createElement('span')
            span.textContent = nome
            li.appendChild(span)

            // botão concluir
            const btnConcluir = document.createElement('button')
            btnConcluir.textContent = '✔️'
            btnConcluir.classList.add('concluir')
            btnConcluir.addEventListener('click', () => {
                span.classList.toggle('concluida')
            })

            // botão excluir
            const btnExcluir = document.createElement('button')
            btnExcluir.textContent = '❌'
            btnExcluir.classList.add('excluir')
            btnExcluir.addEventListener('click', () => {
                if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
                    this.container.removeChild(li)
                }
            })

            // área de botões
            const botoes = document.createElement('div')
            botoes.classList.add('botoes')
            botoes.appendChild(btnConcluir)
            botoes.appendChild(btnExcluir)

            li.appendChild(botoes)
            this.container.appendChild(li)

            this.nome.value = ''
        })
    }
}

const tarefa = new Tarefa()
