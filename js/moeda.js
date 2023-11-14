/* Função para converter as moedas */

/* Pegando os dados da API */
async function obtemTaxas(moedaOrigem, moedaDestino) {
    const alerta = document.getElementById('alerta')
    const msgAlerta = document.getElementById('msgAlerta')
    const url = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        let retorno = data[`${moedaOrigem}${moedaDestino}`].bid
        alerta.classList.add('d-none') //limpando o alerta
        msgAlerta.innerText = '' //limpando o campo
        return retorno
    } catch (error) {
        //console.error
        alerta.classList.remove('d-none')
        msgAlerta.innerText = 'Não foi possível fazer a conversão das moedas'
        return null
    }
}

/* Convertendo os valores */
async function calculaConversao(valor, moedaOrigem, moedaDestino) {
    const valorNumerico = parseFloat(valor)
    resultado.textContent = '' //limpando o campo
    
    if (valor > 0 && moedaOrigem && moedaDestino && moedaOrigem !== moedaDestino) {
        const taxaConversao = await obtemTaxas(moedaOrigem, moedaDestino)
        const valorConvertido = (valorNumerico * taxaConversao).toFixed(2)
        if (valorConvertido > 0) {
            resultado.textContent = `O valor convertido é ${moedaDestino} ${valorConvertido}`
        }
    } else {
        resultado.textContent = ''
    }

}

/**
 * Campos do Formulário
 * Exibindo as informações em tempo real
 */
const moedaOrigem = document.getElementById('moedaOrigem')
const moedaDestino = document.getElementById('moedaDestino')
const valor = document.getElementById('valor')
const resultado = document.getElementById('resultado')

moedaOrigem.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})

moedaDestino.addEventListener('change', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})

valor.addEventListener('input', () => {
    calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)
})            
