// Captura os elementos do HTML
let display = document.querySelector('.display')
const keys = document.querySelectorAll('.keys')
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const equalBtn = document.querySelector('.equal')
const clearAll = document.querySelector('.clear-all')
const clearNumber = document.querySelector('.clear-number')
let result = null; // Declara o Resultado

// Variáveis
let operatorValue = null;

// Adiciona ao display o que foi digitado
numbers.forEach(number => {
    number.addEventListener("click", () => {
        display.textContent += number.textContent
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        display.textContent +=  operator.textContent
        operatorValue = operator.textContent;
    });
});

clearAll.addEventListener('click', () => {
    display.textContent = ''
})

clearNumber.addEventListener('click', () => {
    let displayValue = display.textContent;
    let lastIndexOperator = displayValue.lastIndexOf(operatorValue);
    display.textContent = displayValue.slice(0, lastIndexOperator);
});

equalBtn.addEventListener("click", () => {
    try {
        result = eval(display.textContent);
        display.textContent = result;
    } catch (error) {
        // Se ocorrer um erro ao avaliar a expressão, exiba uma mensagem de erro
        alert('Erro na expressão!');
    }
});
