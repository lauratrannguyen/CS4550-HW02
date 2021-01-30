// Calculator mechanisms
(function() {
  "use strict"
  // Screen that displays all the numbers
  let displaySpace = "0";

  // Initalizes the buttons and adds event listeners for each one
  function initialize() {
    // Get the table
    let buttons = document.getElementsByTagName('tr');
    // Go through each button in the table and initialize them with event listeners
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        // Gets the button at the row and col location
        let button = buttons.item(col).getElementsByTagName('button').item(row);
        // If C is clicked, clear the display back to 0
        if (button.innerHTML == "C") {
          button.addEventListener('click', () => {
            return displaySpace = "0"
          }, false);
          // Updates the display
          button.addEventListener('click', update, false);
        } // If * is picked, multiply the numbers on screen
        else if (button.innerHTML == '*') {
          button.addEventListener('click', () => {
            return operation('*');
          }, false);
          button.addEventListener('click', update, false);
        } // If / is picked, divide the numbers on screen
        else if (button.innerHTML == '/') {
          button.addEventListener('click', () => {
            return operation('/');
          }, false);
          button.addEventListener('click', update, false);
        } // If - is picked, subtract the numbers on screen
        else if (button.innerHTML == '-') {
          button.addEventListener('click', () => {
            return operation('-');
          }, false);
          button.addEventListener('click', update, false);
        } // If +/= is picked, either add or evaluate the numbers on screen
        else if (button.innerHTML == '+/=') {
          button.addEventListener('click', () => {
            // Checks to see if the display actually includes an arithematic expression
            // or ends on a number
            if (displaySpace.includes('-') || displaySpace.includes('*') ||
              displaySpace.includes('/') || displaySpace.includes('+')) {
              return equal();
            } // If it doesn't, just add
            else {
              return operation('+');
            }
          }, false);
          button.addEventListener('click', update, false);
        } // Put decimal on screen if decimal already isn't there
        else if (button.innerHTML == '.') {
          button.addEventListener('click', decimal, false);
          button.addEventListener('click', update, false);
        } // Puts numbers on the screen if allowed
        else {
          button.addEventListener('click', numButton, false);
          button.addEventListener('click', update, false);
        }
      }
    }
  }

  // Updates the screen with the signs and numbers
  function update() {
    let screen = document.getElementById('display');
    screen.innerHTML = displaySpace;
  }

  // Puts the operation symbol on the screen ONLY IF it isn't already there
  function operation(Symbol) {
    if (Number.isInteger(parseInt(displaySpace.charAt(displaySpace.length - 1)))) {
      displaySpace += Symbol;
    }
  }

  // Evaluates the expression on the screen, ONLY if the last position is an integer
  function equal() {
    if (Number.isInteger(parseInt(displaySpace.charAt(displaySpace.length - 1)))) {
      let total = eval(displaySpace);
      displaySpace = total.toString();
    }
  }

  // Adds a decimal to the screen if there isn't already one in the last position
  // or if the number currently being on doesn't have a decimal
  function decimal() {
    // If expression includes an arithematic, continue
    if (displaySpace.includes('-') || displaySpace.includes('*') ||
      displaySpace.includes('/') || displaySpace.includes('+')) {
      // Get the number unit in the last position
      let place = displaySpace.match(/([^\d.])(?!.*\1)/).index + 1;
      // Check to see if that number has a decimal
      if (!displaySpace.substr(place).includes('.')) {
        displaySpace += '.';
      }
    } // Else, check to see if the single number on screen already has a decimal
    else {
      if (!displaySpace.includes('.')) {
        displaySpace += '.';
      }
    }
  }

  // Puts numbers on the display screen and adds it to the expression
  function numButton() {
    // Get the number pressed
    let number = parseInt(this.innerHTML);
    // If screen is empty, just replace with number
    if (displaySpace == "0") {
      displaySpace = number.toString();
    } // If not, just tack number to the end
    else {
      displaySpace += number;
    }
  }

  // Initializes the calculator
  window.addEventListener('load', initialize, false);
})();
