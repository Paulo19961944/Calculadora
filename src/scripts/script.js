// Captura os elementos do HTML
let display = document.querySelector('.display') // Captura o Display do HTML
const keys = document.querySelectorAll('.keys')  // Captura as Teclas do HTML 
const numbers = document.querySelectorAll('.numbers') // Captura todos os números do HTML
const operators = document.querySelectorAll('.operators') // Captura todos os operadores do HTML
const equalBtn = document.querySelector('.equal') // Captura o botão de igual
const clearAll = document.querySelector('.clear-all') // Captura o C do HTML
const clearNumber = document.querySelector('.clear-number') // Captura o CE do HTML
let result = null; // Declara o Resultado
let operatorValue = null; // Variável para armazenar o último operador

// Função para adicionar valor ao display
function addToDisplay(value) {
    display.textContent += value; // Adiciona valor ao display
}

function clearDisplay(){
    display.textContent = ''
}

// Função para avaliar a expressão e exibir o resultado
function calculate() {
    // Lança um Exceção e trata
    try {
        result = eval(display.textContent); // Importa a Biblioteca Eval
        display.textContent = result; // Exibe o resultado na tela
    } catch (error) {
        // Se ocorrer um erro ao avaliar a expressão, exiba uma mensagem de erro
        alert('Erro na expressão!');
    }
}

// Adiciona ao display o que foi digitado
numbers.forEach(number => {
    number.addEventListener("click", () => {
        addToDisplay(number.textContent); // Adiciona no display
    });
});

// Evento ao clicar nos operadores
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        addToDisplay(operator.textContent); // Adiciona ao Display
        operatorValue = operator.textContent; // Adiciona o valor a variável (operatorValue)
    });
});

// Limpa toda a tela
clearAll.addEventListener('click', () => {
    clearDisplay(); // Chama a função para limpar a tela
});

// Limpa apenas o número
clearNumber.addEventListener('click', () => {
    let displayValue = display.textContent; // Cria variável pra pegar o valor do display
    let lastIndexOperator = displayValue.lastIndexOf(operatorValue); // Retorna o ultimo indice do operador
    display.textContent = displayValue.slice(0, lastIndexOperator); // Apaga tudo que estiver até o ultimo indice do operador
});

// Evento ao botão de igual
equalBtn.addEventListener("click", () => {
    calculate(); // Calcular
});

// Evento keydown para capturar as teclas pressionadas
document.addEventListener('keydown', event => {
    const { key } = event;
    // Verifica se a tecla pressionada é um número, operador ou Enter (para calcular)
    if (!isNaN(parseInt(key)) || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '(' || key === ')') {
        addToDisplay(key); // Adiciona ao display
    } else if (key === 'Enter') {
        calculate(); // Calcula
    } else if (key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1) // Apaga o numero anterior
    }
});
