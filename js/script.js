// Função para adicionar um listener de clique em um elemento
function addClickListener(element, callback) {
  element.addEventListener('click', callback);
}

// Função para atualizar a operação atual na calculadora
function updateCurrentOperation(value) {
  const currentOperations = document.getElementById('current-operations');
  currentOperations.innerText += value;
}

// Função para limpar a operação atual na calculadora
function clearCurrentOperation() {
  const currentOperations = document.getElementById('current-operations');
  currentOperations.innerText = '';
}

// Função para calcular o resultado da operação
function calculate() {
  const currentOperations = document.getElementById('current-operations');
  const previousOperations = document.getElementById('previous-operations');
  
  try {
    const result = eval(currentOperations.innerText.replace(',', '.'));
    previousOperations.innerText = currentOperations.innerText + ' =';
    currentOperations.innerText = result.toString().replace('.', ',');
  } catch (error) {
    currentOperations.innerText = 'Erro';
    console.error(error);
  }
}

// Função para inicializar a calculadora
function initializeCalculator() {
  const numberButtons = document.getElementsByClassName('number');
  const equalButton = document.getElementById('equal-btn');
  const clearButton = document.getElementById('C');
  const deleteButton = document.getElementById('DEL');

  for (let i = 0; i < numberButtons.length; i++) {
    addClickListener(numberButtons[i], function () {
      updateCurrentOperation(numberButtons[i].innerText);
    });
  }

  addClickListener(equalButton, calculate);
  addClickListener(clearButton, clearCurrentOperation);
  addClickListener(deleteButton, function () {
    const currentOperations = document.getElementById('current-operations');
    currentOperations.innerText = currentOperations.innerText.slice(0, -1);
  });
}

// Inicializar a calculadora quando a página estiver carregada
document.addEventListener('DOMContentLoaded', function () {
  initializeCalculator();
});
