const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");
console.log(buttons);

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    if (digit === "." && this.currentOperation === "") {
      this.currentOperation = "0";
    } else if (digit === "." && this.currentOperation.includes(".")) {
      return;
    }

    // Checar se o Current Operation tem um ponto ou vírgula
    if (
      (digit === "." || digit === ",") &&
      this.currentOperationText.innerText.includes(".") &&
      this.currentOperationText.innerText.includes(",")
    ) {
      return;
    }

    if (digit === ",") {
      digit = ".";
    }

    this.currentOperation += digit;
    this.updateScreen();
  }

  processOperation(operation) {
    // Resolve conflitos entre operações
    if (
      ["+", "-", "*", "/"].includes(operation) &&
      ["+", "-", "*", "/"].includes(
        this.currentOperationText.innerText.slice(-1)
      )
    ) {
      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(
        0,
        -1
      );
    }

    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        // Mudança de Operação
        this.changeOperation(operation);
      }

      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText.replace(",", ".");

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.currentOperation = "";
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.currentOperation = "";
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.currentOperation = "";
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.currentOperation = "";
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "=":
        this.processEqualOperator();
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(
      0,
      -1
    );
  }

  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  processClearOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === "." || value === ",") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (+key >= 0 || key === "." || key === ",") {
    calc.addDigit(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    calc.processOperation(key);
  } else if (key === "=") {
    calc.processEqualOperator();
  } else if (key === "Backspace") {
    calc.processDelOperator();
  } else if (key === "Escape") {
    calc.processClearOperation();
  }
});
