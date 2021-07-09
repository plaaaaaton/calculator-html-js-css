class Calculator{
    constructor(prevOpTextElement, currOpTextElement){
        this.prevOpTextElement = prevOpTextElement
        this.currOpTextElement = currOpTextElement
        this.clear()
    }

    clear(){
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined
    }

    delete(){
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number !== '.' || !this.currOp.includes('.')){
            this.currOp += number
        }
    } 
    
    chooseOp(operation){
        if (this.currOp === '') return
        if(this.prevOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
        

    }

    compute(){
        let res
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                res = prev + curr
                break
            case '-':
                res = prev - curr
                break
            case '*':
                res = prev * curr
                break
            case '÷':
                res = prev / curr
                break
            default: 
                return
        }
        this.currOp = res
        this.operation = undefined
        this.prevOp = ''
    }

    updateDisplay(){
        this.currOpTextElement.innerText = this.currOp
        this.prevOpTextElement.innerText = this.prevOp
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-all-clear]')
const currOpTextElement = document.querySelector('[data-curr-operand]')
const prevOpTextElement = document.querySelector('[data-prev-operand]')
const delButton = document.querySelector('[data-delete]')

const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numberButtons.forEach(button =>{ 
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText), 
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

delButton.addEventListener('click', () => {calculator.delete(), calculator.updateDisplay()})

equalsButton.addEventListener('click', () => {calculator.compute(), calculator.updateDisplay()})

acButton.addEventListener('click', () => {calculator.clear(), calculator.updateDisplay()})