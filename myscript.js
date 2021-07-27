let buffer = "0";
let previousOperator;
let intBuffer = 0;
let runningTotal;
const screen = document.querySelector(".first-row");

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value) {
    switch(value) {
        case "C": 
            buffer = "0";
            break;
        case "←":
            if(buffer.lenght == 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "÷":
        case "x":
        case "-":
        case "+":
        case "=":
            previousOperator = value;
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    if(buffer === "0") {
        return;
    }
    else {
            previousOperator = value;
            intBuffer = parseInt(buffer);
            buffer = "0";
            flushOperation(intBuffer);
        }
    
}

function flushOperation(value) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    } else if(previousOperator ==="=") {
        buffer = runningTotal;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(value) {
    if(buffer == "0") {
        console.log("here");
        buffer = value;
    } else {
        buffer += value;
    }
}

function rerender() {
    screen.innerText = buffer;
}

init();