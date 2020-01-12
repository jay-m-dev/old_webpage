var numSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var pickedSquares = document.querySelectorAll(".pickedSquare");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        // add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to clicked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
    
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            numSquares = 9;
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else if (this.textContent === "Medium") {
                numSquares = 6;
            }
            // numSquares = this.textContent === "Easy" ? 3: 6;
            reset();
        });
    }
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    
    pickedSquares[0].style.backgroundColor = pickedColor.substring(0, 8) + " 0, 0)";
    pickedSquares[1].style.backgroundColor = "rgb(0" + pickedColor.substring(pickedColor.indexOf(","), pickedColor.lastIndexOf(",")) + ", 0)";
    pickedSquares[2].style.backgroundColor = "rgb(0, 0" + pickedColor.substring(pickedColor.lastIndexOf(","), pickedColor.length);
}

// easyBtn.addEventListener("click", function() {
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         if(colors[i]) {
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// })

// hardBtn.addEventListener("click", function() {
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// })

resetButton.addEventListener("click", function() {
    reset();
})

// for(var i = 0; i < squares.length; i++) {
//         // add initial colors to squares
//         squares[i].style.backgroundColor = colors[i];
//         // add click listeners to squares
//         squares[i].addEventListener("click", function() {
//         //grab color of clicked square
//         var clickedColor = this.style.backgroundColor;
//         //compare color to clicked color
//         if (clickedColor === pickedColor) {
//             messageDisplay.textContent = "Correct!";
//             resetButton.textContent = "Play Again?";
//             changeColors(clickedColor);
//             h1.style.backgroundColor = clickedColor;
//         } else {
//             this.style.backgroundColor = "#232323";
//             messageDisplay.textContent = "Try Again";
//         }
//     });
// }

function changeColors(color) {
    //loop through all squares
    for(var i = 0; i < colors.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors to array
    for(var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return the array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}