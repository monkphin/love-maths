// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them. 

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");
  
  // This iterates through buttons ie - if (let i = 0; i > button.length; i++)
  for (let button of buttons) {

    button.addEventListener("click", function() {
        if (this.getAttribute("data-type") === "submit") {
            checkAnswer();
        } else {
            let gameType = this.getAttribute("data-type")
            runGame(gameType);
        }
    })
  }

  document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
  })

  runGame("addition");

})

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed. 
 */

function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //Creates a random number between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplicationQuestion(num1, num2) 
    } else if (gameType === "subtract") {
        displaySubtractionQuestion(num1, num2) 
    } else if (gameType === "division") {
        displaySubtractionQuestion(num1, num2) 
    } else {
        alert(`unknown game type ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting`
    }
    
}

/**
 * Checks the answer against the first element 
 * in the returned CalculatedCorrectAnswer Array
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value); //checks the answer which is retrieve from DOM
    let calculatedAnswer = calculateCorrectAnswer();                        //Get correct answer from calculatedCorrectAnswer
    let isCorrect = userAnswer === calculatedAnswer[0];                     //Set isCorrect variable which willbe either true/false depending on the calculatedANswer matching the calcuateCorrectANswer

    if (isCorrect) {
        alert("Hey! You got this right :D");
        incrementScore();
    } else {
        alert (`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and returns the operator (plus, minus, etc) 
 * directly from the dom, and returns the correct answer. 
 */

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if(operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if(operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if(operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if(operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert (`Unimplemented Operator ${operator}`);
        throw (`Unimplemented Operator ${operator}. Aborting`);
    }

}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; // Checks if operand1 is bigger than Operand2 and if so, returns Operand2, if not returns operand1. 
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayDivisionQuestion(operand1, operand2) {
    operand1 = operand1 * operand2;
    document.getElementById('operand1').textContent = operand1; // Checks if operand1 is bigger than Operand2 and if so, returns Operand2, if not returns operand1. 
    document.getElementById('operand1').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}