class Calculator {
    constructor() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.ledDigits = document.querySelectorAll('.led-digit');
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const btns = document.querySelectorAll('.btn');
        let handleClick;
        
        // 関数を事前に定義してメモリ効率化
        handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dataset = e.currentTarget.dataset;
            
            // 直接datasetを確認して処理を最適化
            if (dataset.value) {
                this.inputNumber(dataset.value);
            } else if (dataset.operator) {
                this.inputOperator(dataset.operator);
            } else if (dataset.clear) {
                this.clear();
            }
        };
        
        // イベントリスナーを一度だけ設定
        btns.forEach(btn => {
            btn.addEventListener('click', handleClick, { passive: false });
            btn.addEventListener('touchstart', handleClick, { passive: false });
        });
    }
    
    inputNumber(num) {
        if (this.waitingForSecondOperand) {
            this.displayValue = num;
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = this.displayValue === '0' ? num : this.displayValue + num;
        }
        this.updateDisplayFast();
    }
    
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.displayValue);
        
        if (this.firstOperand === null) {
            this.firstOperand = inputValue;
        } else if (this.operator) {
            const currentValue = this.firstOperand || 0;
            const newValue = this.performCalculation(this.operator, currentValue, inputValue);
            
            this.displayValue = String(newValue);
            this.updateDisplayFast();
            this.firstOperand = newValue;
        }
        
        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    }
    
    performCalculation(operator, first, second) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '=':
                return second;
            default:
                return second;
        }
    }
    
    clear() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplayFast();
    }
    
    updateDisplay() {
        requestAnimationFrame(() => this.updateDisplayFast());
    }
    
    updateDisplayFast() {
        const digits = this.getDigits();
        this.renderLED(digits);
    }
    
    getDigits() {
        const value = parseFloat(this.displayValue);
        const str = Math.abs(value).toFixed(0);
        const digits = str.split('').map(Number);
        
        // 最大12桁
        if (digits.length > 12) {
            return '999999999999'.split('').map(Number);
        }
        
        // 12桁にパディング
        while (digits.length < 12) {
            digits.unshift(0);
        }
        
        return digits.slice(-12);
    }
    
    renderLED(digits) {
        if (!this.patterns) {
            this.patterns = {
                0: [1, 1, 1, 1, 1, 1, 0],
                1: [0, 1, 1, 0, 0, 0, 0],
                2: [1, 1, 0, 1, 1, 0, 1],
                3: [1, 1, 1, 1, 0, 0, 1],
                4: [0, 1, 1, 0, 0, 1, 1],
                5: [1, 0, 1, 1, 0, 1, 1],
                6: [1, 0, 1, 1, 1, 1, 1],
                7: [1, 1, 1, 0, 0, 0, 0],
                8: [1, 1, 1, 1, 1, 1, 1],
                9: [1, 1, 1, 1, 0, 1, 1]
            };
        }
        
        if (!this.segmentsCache) {
            this.segmentsCache = Array.from(this.ledDigits).map(digitElement => 
                Array.from(digitElement.querySelectorAll('.segment'))
            );
        }
        
        // 最も高速な方法でDOM操作
        for (let i = 0; i < digits.length; i++) {
            const pattern = this.patterns[digits[i]];
            const segments = this.segmentsCache[i];
            
            for (let j = 0; j < 7; j++) {
                const segment = segments[j];
                const shouldBeActive = pattern[j] === 1;
                const isActive = segment.classList.contains('active');
                
                if (shouldBeActive && !isActive) {
                    segment.classList.add('active');
                } else if (!shouldBeActive && isActive) {
                    segment.classList.remove('active');
                }
            }
        }
    }
}

// 計算機の初期化
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

