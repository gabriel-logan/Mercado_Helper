const produto = document.querySelector('input');

const btnSalva = document.querySelector('#salvar');

const btnClean = document.querySelector('#btn_clean');

const erro = document.querySelector('#erro');

const divPai = document.querySelector('#add_h3');

class List {
    init() {
        this.pegaLocalStorage()
        produto.addEventListener('keypress', event => {
            if (produto.value === '') return
            if (event.keyCode === 13) {
                this.criaLista()
                this.updateLocalStorage()
                produto.value = ''
                produto.focus();
            }
        })
        document.addEventListener('click', event => {
            const element = event.target

            if (element === btnSalva) {
                if (produto.value === '') {
                    erro.innerText = 'Campo não pode ser vasio'
                    setTimeout(() => {
                        erro.innerText = ''
                    }, 1200)
                    return
                }
                this.criaLista()
                this.updateLocalStorage()
                produto.value = ''
                produto.focus();
            }

            if (element.classList.contains('apagar')) {
                element.parentElement.remove();
                this.updateLocalStorage()
            }

            if (element === btnClean) {
                const erroClean = document.querySelector('#erroClean');
                console.log(divPai.hasChildNodes())
                if (divPai.hasChildNodes() === true) {
                    erroClean.innerText = 'Lista limpa !!!';
                    setTimeout(() => {
                        erroClean.innerText = ''
                    }, 1100)
                }
                if (divPai.hasChildNodes() === false) {
                    erroClean.innerText = 'Não é possivel limpar uma lista limpa !!!';
                    setTimeout(() => {
                        erroClean.innerText = ''
                    }, 1100)
                }
                this.apagaTudo()
                this.updateLocalStorage()
            }

        })
    }

    apagaTudo() {
        while (divPai.firstChild) {
            divPai.firstChild.remove()
        }
    }

    pegaLocalStorage() {
        const produtos = localStorage.getItem('Produtos')
        this.produtosParseado = JSON.parse(produtos);

        for (let key in this.produtosParseado) {
            console.log(this.produtosParseado[key])
            this.criaLista()
            this.h3.innerText = this.produtosParseado[key]
            this.h3.append(this.span)
            this.span.innerText = 'X'
        }
    }

    updateLocalStorage() {
        const produtos = divPai.querySelectorAll('h3')
        this.listaProdutos = []

        for (let produto of produtos) {
            let produtoText = produto.innerText
            produtoText = produtoText.replace('X', '').trim();
            this.listaProdutos.push(produtoText)
        }

        const produtoJson = JSON.stringify(this.listaProdutos)

        localStorage.setItem('Produtos', produtoJson)
    }

    criaLista() {
        this.addElementos()
    }

    addElementos() {
        this.criaValores()
        divPai.append(this.h3);
        this.h3.append(this.span);
    }

    criaValores() {
        this.criaElementos()
        this.h3.innerText = produto.value
        this.span.innerText = 'X'
    }

    criaElementos() {
        this.h3 = document.createElement('h3');

        this.span = document.createElement('span');

        this.span.setAttribute('class', 'apagar')
        this.span.setAttribute('title', 'Apagar este elemento')
        this.span.style.color = 'red';

    }
}

const iniciaClass = new List()

iniciaClass.init()