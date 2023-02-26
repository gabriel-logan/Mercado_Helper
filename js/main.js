const inputProduto = document.querySelector('#input_prod');
const inputPreco = document.querySelector('#input_preco');
const inputQnt = document.querySelector('#input_qnt');
const btnAdd = document.querySelector('#btn');
const spanResult = document.querySelector('#span_result');

const divListas = document.querySelector('#div-listas');

const btnClean = document.querySelector('#btn-clean');

const erro = document.querySelector('#erro');

class Main {
    constructor() {
        this.totalValorProduto = []
    }

    init() {
        document.addEventListener('click', event => {
            const element = event.target
            if (element === btnAdd) {
                if (inputProduto.value === '' || inputPreco.value === '' || inputQnt.value === '') {
                    erro.innerText = 'Nenhum campo pode ser vasio'
                    setTimeout(() => {
                        erro.innerText = ''
                    }, 1200)
                    return
                }
                if (inputProduto.value.length > 50 || inputPreco.value.length > 50 || inputQnt.value.length > 50) {
                    erro.innerText = 'Valores não podem ter mais que 50 caracteres'
                    setTimeout(() => {
                        erro.innerText = ''
                    }, 1200)
                    return
                }
                this.criaLista()
                this.updateLocalStorage()
                location.reload()
            }

            if (element.classList.contains('itens-apagar')) {
                element.parentElement.remove();
                this.updateLocalStorage()
                location.reload()
            }

            if (element === btnClean) {
                this.apagaTudo()
                this.updateLocalStorage()
                location.reload()
            }
        })
        this.pegaLocalStorage()
    }

    apagaTudo() {
        while (divListas.childElementCount > 1) {
            divListas.lastChild.remove()
        }
        console.log()
    }

    pegaLocalStorage() {
        const produtos = localStorage.getItem('Lista-produto')
        const precos = localStorage.getItem('Lista-preco')
        const quantias = localStorage.getItem('Lista-quantia')
        const totals = localStorage.getItem('Lista-total')

        this.produtosParseado = JSON.parse(produtos);
        this.precosParseado = JSON.parse(precos);
        this.quantiasParseado = JSON.parse(quantias);
        this.totalsParseado = JSON.parse(totals);

        console.log(this.produtosParseado, this.precosParseado, this.quantiasParseado, this.totalsParseado)

        for (const key in this.produtosParseado) {
            this.criaLista()
            this.produto.innerText = this.produtosParseado[key]
            this.preco.innerText = (`${Number(this.precosParseado[key]).toFixed(2)} R$`)
            this.quantia.innerText = (`x ${this.quantiasParseado[key]}`)
            this.valorTotal.innerText = (`${Number(this.totalsParseado[key]).toFixed(2)} R$`)
        }

        if (this.totalsParseado.length > 0) {
            const valor_totalSomado = this.totalsParseado.reduce((total, numero) => {
                return Number(total) + Number(numero)
            })

            spanResult.innerText = Number(valor_totalSomado).toFixed(2)
        }
    }

    updateLocalStorage() {
        const produtos = divListas.querySelectorAll('.valores_produto')
        const precos = divListas.querySelectorAll('.valores_preco')
        const quantias = divListas.querySelectorAll('.valores_quantia')
        const totals = divListas.querySelectorAll('.valores_total')

        this.listaProdutos = []
        this.listaPreco = []
        this.listaQuantia = []
        this.listaTotal = []

        for (let produto of produtos) {
            let produtoText = produto.innerText
            this.listaProdutos.push(produtoText)
        }
        for (let produto of precos) {
            let precoText = produto.innerText
            precoText = precoText.replace('R$', '').trim()
            this.listaPreco.push(precoText)
        }
        for (let produto of quantias) {
            let quantiaText = produto.innerText
            quantiaText = quantiaText.replace('x', '').trim()
            this.listaQuantia.push(quantiaText)
        }
        for (let produto of totals) {
            let totalText = produto.innerText
            totalText = totalText.replace('R$', '').trim()
            this.listaTotal.push(totalText)
        }

        const produtoJson = JSON.stringify(this.listaProdutos)
        const precoJson = JSON.stringify(this.listaPreco)
        const quantiaJson = JSON.stringify(this.listaQuantia)
        const totalJson = JSON.stringify(this.listaTotal)

        localStorage.setItem('Lista-produto', produtoJson)
        localStorage.setItem('Lista-preco', precoJson)
        localStorage.setItem('Lista-quantia', quantiaJson)
        localStorage.setItem('Lista-total', totalJson)

    }

    criaLista() {
        this.adcValoresNaLista()
    }

    adcValoresNaLista() {
        this.criaValores()
        this.listas.append(this.produto, this.preco, this.quantia, this.valorTotal, this.apagaListaUnd)
        divListas.append(this.listas)
    }

    criaValores() {
        this.criaElementos()
        this.produto.innerText = inputProduto.value
        this.preco.innerText = (`${inputPreco.value} R$`)
        this.quantia.innerText = (`x ${inputQnt.value}`)
        const valorTotalUnd = inputPreco.value * inputQnt.value
        this.valorTotal.innerText = (`${valorTotalUnd} R$`)
        this.apagaListaUnd.innerText = 'Apagar'
        this.apagaListaUnd.style.color = 'red';
    }

    criaElementos() {
        this.listas = document.createElement('div');
        this.listas.classList.add('lista');
        this.listas.classList.add('listas-itens');

        this.produto = document.createElement('h3')
        this.produto.classList.add('itens')
        this.produto.classList.add('valores_produto')

        this.preco = document.createElement('h3')
        this.preco.classList.add('itens')
        this.preco.classList.add('valores_preco')

        this.quantia = document.createElement('h3')
        this.quantia.classList.add('itens')
        this.quantia.classList.add('valores_quantia')

        this.valorTotal = document.createElement('h3')
        this.valorTotal.classList.add('valor_total')
        this.valorTotal.classList.add('itens')
        this.valorTotal.classList.add('valores_total')

        this.apagaListaUnd = document.createElement('h3')
        this.apagaListaUnd.classList.add('itens')
        this.apagaListaUnd.classList.add('itens-apagar')
    }
}

const main = new Main();

main.init()