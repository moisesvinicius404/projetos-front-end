class Usuario {
    constructor() {
        // Inputs (se existir na página)
        this.nome = document.getElementById('nome')
        this.email = document.getElementById('email')
        this.senha = document.getElementById('senha')

        // Botões (se existir na página)
        this.btnCadastro = document.getElementById('cadastrarBtn')
        this.btnLogin = document.getElementById('logaBtn')
        this.btnLogout = document.getElementById('logoutBtn')

        this.logado = false

        if (this.btnCadastro) {
            this.btnCadastro.addEventListener('click', () => this.cadastro())
        }

        if (this.btnLogin) {
            this.btnLogin.addEventListener('click', () => this.login())
        }

        if (this.btnLogout) {
            this.btnLogout.addEventListener('click', () => this.logout())
        }
    }

    cadastro() {
        if (!this.nome.value.trim() || !this.email.value.trim() || !this.senha.value.trim()) {
            alert('Ops, preencha todos os campos')
            return 
        } else if (this.senha.value.length < 8) {
            alert('Sua senha deve ter 8 caracteres')
            return
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

        let existe = usuarios.find(u => u.email === this.email.value)
        if (existe) {
            alert("Esse email já está cadastrado!")
            return
        }

        const novoUsuario = {
            nome: this.nome.value,
            email: this.email.value,
            senha: this.senha.value
        }
        usuarios.push(novoUsuario)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        alert(`Usuário ${this.nome.value} cadastrado com sucesso!`)
        window.location.href = 'login.html'
    }

    login() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

        let encontrado = usuarios.find(
            u => u.email === this.email.value && u.senha === this.senha.value
        )

        if (encontrado) {
            this.logado = true 
            alert(`${encontrado.nome} logou com sucesso!`)
        } else {
            alert("Email ou senha incorretos.")
        }
    }

    logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            this.logado = false
            window.location.href = 'cadastro.html'
        }
    }
}

const usuario = new Usuario()
