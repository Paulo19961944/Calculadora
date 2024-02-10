// Captura as Entradas HTML
const display = document.querySelector(".display");
const keys = document.querySelector(".keys");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators")
const equalBtn = document.getElementById("equal");
const cleanAll = document.getElementById("clean-all");
const cleanNumber = document.getElementById("clean-number");

// Variáveis
let firstNumber = null;
let secondNumber = null;
let operatorCurrent = null;
let result = 0;

// Aparece o numero do Display na Tela
numbers.forEach(numberValue => {
    numberValue.addEventListener("click", () => {
        display.textContent += numberValue.textContent;
    });
});

// Lógica dos Operadores
operators.forEach(numberValue => {
    numberValue.addEventListener("click", () => {
        operatorCurrent = numberValue.textContent;
        if (firstNumber === null) {
            firstNumber = parseFloat(display.textContent);
        } else if (secondNumber === null) {
            secondNumber = parseFloat(display.textContent);
            Calcular();
            console.log(result)
        }
        display.textContent = "";
    });
});

// Limpa toda a Tela
cleanAll.addEventListener("click", () => {
    display.textContent = "";
    firstNumber = null;
    secondNumber = null;
    operatorCurrent = null;
    result = 0;
});

// Limpa os Numeros
cleanNumber.addEventListener("click", () => {
    if(operatorCurrent !== null){
        let displayValue = display.textContent;
        let lastIndexOperator = displayValue.lastIndexOf(operatorCurrent);
        display.textContent = displayValue.substring(0, lastIndexOperator + 1);
        secondNumber = null;
    } else{
        cleanAll();
    }
});

// Botão de Igual
equalBtn.addEventListener("click", () => {
    secondNumber = parseFloat(display.textContent);
    Calcular();
    display.textContent = "";
    display.textContent += result;
});

// Função Calcular
function Calcular() {
    switch (operatorCurrent) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                alert("Impossivel dividir por Zero!")
            } else {
                result = firstNumber / secondNumber;
            } break;
    }
    firstNumber = result;
    secondNumber = null;
}