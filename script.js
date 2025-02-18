document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let currentOperation = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                result.value = currentInput;
            } else if (value === 'clear') {
                currentInput = '';
                previousInput = '';
                currentOperation = null;
                result.value = '';
            } else if (value === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                result.value = currentInput;
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    currentOperation = value;
                }
            } else if (value === '=') {
                calculate();
            }
        });
    });

    function calculate() {
        if (currentInput === '' || previousInput === '') return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        document.getElementById('result').value = currentInput;
        previousInput = '';
        currentOperation = null;
    }
});