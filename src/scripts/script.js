// Captura os elementos do HTML
const display = document.querySelector('.display'); // Captura o Display do HTML
const keys = document.querySelectorAll('.keys'); // Captura as Teclas do HTML 
const numbers = document.querySelectorAll('.numbers'); // Captura todos os números do HTML
const operators = document.querySelectorAll('.operators'); // Captura todos os operadores do HTML
const equalBtn = document.querySelector('.equal'); // Captura o botão de igual
const clearAll = document.querySelector('.clear-all'); // Captura o C do HTML
const clearNumber = document.querySelector('.clear-number'); // Captura o CE do HTML
let operatorValue = null; // Variável para armazenar o último operador

// Função para adicionar valor ao display
function addToDisplay(value) {
    display.textContent += value; // Adiciona valor ao display
}

function clearDisplay() {
    display.textContent = '';
}

// Função para avaliar a expressão e exibir o resultado
function calculate() {
    try {
        const expression = display.textContent;
        const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, ''); // Sanitiza a expressão permitindo apenas caracteres válidos
        const evaluate = new Function('return ' + sanitizedExpression); // Cria uma função a partir da expressão sanitizada
        const result = evaluate(); // Avalia a expressão
        display.textContent = result; // Exibe o resultado na tela
    } catch (error) {
        display.textContent = 'Erro'; // Exibe uma mensagem de erro genérica
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

// Limpa apenas o último número ou operador
clearNumber.addEventListener('click', () => {
    let displayValue = display.textContent.trim(); // Obtém o valor do display sem espaços em branco no início e no fim
    const lastChar = displayValue.slice(-1); // Obtém o último caractere da expressão
    if (operators.includes(lastChar)) {
        operatorValue = null; // Limpa o valor do último operador
    }
    display.textContent = displayValue.slice(0, -1); // Remove o último caractere da expressão
});

// Evento ao botão de igual
equalBtn.addEventListener("click", () => {
    calculate(); // Calcular
});

// Evento keydown para capturar as teclas pressionadas
document.addEventListener('keydown', event => {
    const { key } = event;
    const validKeys = /^[0-9+\-*/().]$/; // Expressão regular para validar as teclas permitidas
    if (validKeys.test(key)) {
        addToDisplay(key); // Adiciona ao display se a tecla pressionada for válida
    } else if (key === 'Enter') {
        calculate(); // Calcula se a tecla pressionada for Enter
    } else if (key === 'Backspace') {
        clearNumber.click(); // Aciona o evento de limpar apenas o último número ou operador se a tecla pressionada for Backspace
    }
});
