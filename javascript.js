const buttons = document.querySelectorAll(".button");
const displayNr = document.querySelector(".display-nr");
const displayOperator = document.querySelector(".display-operator");

let operator = "";
let nr1 = "";
let nr2 = "";

let commaTyped = false;
let operationClicked = false;
let operationFinished = false;

function add(num1, num2){
    return num1+num2;
}

function substract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    return num1/num2;
}

function operate(num1, operator, num2){
    switch (operator){
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return substract(num1, num2);
            break;      
        case "x":
            return multiply(num1, num2);
            break;   
        case "÷":
            return divide(num1, num2);
            break;                 
    }
}

for(let i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener("click", () => 
    {
        if(buttons[i].className == "button")
        {
            if(buttons[i].textContent != "." || buttons[i].textContent == "." && !commaTyped)
            {
                if(buttons[i].textContent == ".")
                {
                    commaTyped = true;
                }
                if(operationFinished )
                {
                    nr1 = "";
                    displayNr.textContent = "";
                    operationFinished = false;
                }
                
                displayNr.textContent += buttons[i].textContent;
                if(!operationClicked)
                {
                    nr1 += buttons[i].textContent;
                }
                else
                {
                    displayOperator.textContent = "";
                    nr2 += buttons[i].textContent;
                    displayNr.textContent = nr2;
                }
            }
        }
        else if(buttons[i].className == "button operation" && nr1 != "")
        {
            if(nr2 != "")
            {
                if(operator == "÷" && nr2 == "0")
                {
                    displayNr.textContent = "Division by 0 not possible";
                    nr1 = "";
                    nr2 = "";
                    displayOperator.textContent = "";
                    operationClicked = false;
                    operationFinished = true;
                }
                else
                {
                    nr1 = operate(parseFloat(nr1), operator, parseFloat(nr2));
                    displayNr.textContent = nr1;
                    nr2 = "";
                }
            }
            else if(operationFinished)
            {
                nr1 = displayNr.textContent;
                operationFinished = false;
            }
            if(displayNr.textContent != "Division by 0 not possible")
            {
                displayOperator.textContent = buttons[i].textContent;
                operationClicked = true;
                operator = buttons[i].textContent;
            }
            commaTyped = false;
        }
        else if(buttons[i].textContent == "=" && nr1 != "" && nr2 != "")
        {
            if(operator == "÷" && nr2 == "0")
            {
                displayNr.textContent = "Division by 0 not possible";
                nr1 = "";
            }
            else
            {
                const decimals = parseFloat(operate(parseFloat(nr1), operator, parseFloat(nr2))).toString().split(".")[1];
                    if (decimals.length > 5) 
                    {
                        displayNr.textContent = parseFloat(operate(parseFloat(nr1), operator, parseFloat(nr2))).toFixed(6);
                    } 
                    else
                    {
                        displayNr.textContent = parseFloat(operate(parseFloat(nr1), operator, parseFloat(nr2)))
                    }
                nr1 = displayNr.textContent;
            }
            
            commaTyped = false;
            operationClicked = false;
            operationFinished = true;
            nr2 = "";
            displayOperator.textContent = "";
        }
        else if(buttons[i].textContent == "CE")
        {
            commaTyped = false;
            displayNr.textContent = "";
            displayOperator.textContent = "";
            operationClicked = false;
            operationFinished = false;
            nr1 = "";
            nr2 = "";
        }
        else if(buttons[i].textContent == "DEL")
        {
            if(displayNr.textContent != "Division by 0 not possible")
            {
                if(displayNr.textContent.substring(displayNr.textContent.length-1) == ".")
                {
                    commaTyped = false;
                }

                displayNr.textContent = displayNr.textContent.substring(0, displayNr.textContent.length-1);
                if(displayNr.textContent == "-")
                {
                    displayNr.textContent = "";
                }
                if(!operationClicked)
                {
                    nr1 = displayNr.textContent;
                }
                else{
                    nr2 = displayNr.textContent;
                }
            }
        }       
    });
}