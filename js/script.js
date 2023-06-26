const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");
console.log(buttons);



class Calculator{

    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    

    // Adiciona Dígitos a Calculadora

    addDigit(digit){


        // Melhora o controle de erros

        if (digit === "." && this.currentOperation === "") {
            this.currentOperation = "0";
        } else if (digit === "." && this.currentOperation.includes(".")) {
            return;
        }
        

        // Checar se tem o Current Operation tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Processar todos os Dados da Calculadora

    processOperation(operation){


        // Resolve conflitos entre operações

        if (
            ["+", "-", "*", "/"].includes(operation) &&
            ["+", "-", "*", "/"].includes(this.currentOperationText.innerText.slice(-1))
        ) {
            this.currentOperationText.innerText = this.currentOperationText.innerText.slice(
                0,
                -1
            );
        }
        

        // Checar se current está vazio
        if(currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !== ""){
                // Mudança de Operação
                this.changeOperation(operation);

            }
            
            return;

        } 
    
        
        // Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
           
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
    // Mudando valores da tela da Calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {

        console.log(operationValue, operation, current, previous)
        
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }

        else{
            
            // Checar se o valor é zero, se for, apenas adicione currentValue

            if(previous === 0){
                operationValue = current
            }

            // Adicione currentValue para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
            


        }
    }
    
  // Mudando operaçoes matematicas
  
    changeOperation(operation){
    const mathOperations = ["*", "/", "+", "-"]

    if(!mathOperations.includes(operation)){
        return
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    
  }  

  // Apagar o ultimo digito

  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  processClearOperation(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Resultado

  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]
    this.processOperation(operation)

  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn)=> {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >=0 || value === "."){
            calc.addDigit(value)
        }

        else{
            calc.processOperation(value)
        }

    } )
})


// Adiciona teclas de atalhos ao teclado

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (+key >= 0 || key === ".") {
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
