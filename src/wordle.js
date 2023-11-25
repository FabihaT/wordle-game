//Dictionary of words and hints
const dictionary = [
    {"word": "Diver","hint": "Person who explore underwater realms",},
    {"word": "Jumbo","hint": "Large-sized term often used with popcorn",},
    {"word": "Quirk","hint": "Unusual or peculiar behavior",},
    {"word": "Glide","hint": "Move smoothly or effortlessly",},
    {"word": "Frost", "hint": "Cold, icy crystals on surfaces"},
    {"word": "Snack", "hint": "Small, quick bites between meals"},
    {"word": "Nudge", "hint": "Gentle push or poke"},
    {"word": "Prize", "hint": "Reward or recognition of achievement"},
    {"word": "Chirp", "hint": "High-pitched bird sound"},
    {"word": "Phone","hint": "A device we can't live without",},
    {"word": "Water", "hint": "H2O for Chemistry nerds"},
    {"word": "Chips", "hint": "Pringles, Doritos, Lays, Potato..."},
    {"word": "Waste", "hint": "This game is a _____ of time"},
]

//Size of a 5 by 5 grid
var width = 5;
var height = 5;
var row = 0;
var col = 0;
var gameOver = false;
var gameWon = false;
let wordsDict = [];
let word = "";
let hint = "";

const getWords = () => {
    let resetButton = document.getElementById("reset-button");
    resetButton.disabled = true;
    resetButton.innerHTML = "Loading...";

    // Simulate a delay to mimic the asynchronous behavior of an API call
    setTimeout(() => {
        resetButton.disabled = false;
        resetButton.innerHTML = "<button style='cursor: pointer'>Start Over</button>";
        wordsDict = dictionary; // Use the predefined dictionary instead of fetching from an API
        setRandWord(); // Call to function to set a random word from the dictionary
    }, 1000); // Adjust the delay as needed
}

function setRandWord() {
    let index = Number.parseInt(Math.random() * wordsDict.length); //Generates random number from length of dictionary
    word = wordsDict[index]["word"].toUpperCase(); //Adds word from random index of dictionary
    hint = wordsDict[index]["hint"]; //Adds hint from random index of dictionary
}

window.onload = function() { //Calls this function when the window is opened
    getWords(); 
    createBoard();
}

function gameEnd() {
    if (gameOver) {
        setRandWord(); //Set new random word from existing dictionary
        document.querySelector("main").classList.toggle("show-answer"); //Hide answer div
    }
    if (gameWon) {
        winGame(); //Calls function to show board and hide win-img
    }
    if (document.querySelector("main").classList.contains("show-hint")) {
        document.querySelector("main").classList.toggle("show-hint"); //Hide hint div if currently toggled
    }
    gameOver = false;
    gameWon = false;
    if (!gameOver) { //Clear board to reset game
        let squares = document.querySelectorAll(".squares");
        for (let i = 0; i < squares.length; i++) { //Removes styling from all squares in board
            squares[i].innerText = "";
            squares[i].classList.remove("correct");
            squares[i].classList.remove("wrong");
            squares[i].classList.remove("exists");
        }
        //Reset at starting position
        row = 0;
        col = 0;
        gameStart();
    }
}

function createBoard() {
    // Create a table with 4 rows and 4 columns
    let table = document.createElement("table"); //Creates element <table></table>
    for (let i = 0; i < height; i++) {
        let row = document.createElement("tr"); //Creates table row element <tr></tr>
        for (let j = 0; j < width; j++) {
            let square = document.createElement("td"); //For each row, creates a column element <td></td>
            square.id = i.toString() + j.toString(); //Assigns id of "ij" to each square
            square.classList.add("squares");
            square.innerText = ""; //Fills each square with an empty string
            row.appendChild(square); 
        }
        table.appendChild(row);
    }
    document.getElementById("board").appendChild(table); //Appends the table to the "board" div in the html file
    gameStart();
}

function gameStart() {
    let board = document.getElementById("board");
    board.addEventListener("keyup", keyPress); //Add keyup event listener to the game board
    board.setAttribute("tabindex", 0); //Set focus to board so keyup events will only take place here
    board.focus();
    //Add click events to page header icons by calling each function
    document.getElementById("instructions").addEventListener("click", showInstructions);
    document.getElementById("hint").addEventListener("click", showHint);
    document.getElementById("dark").addEventListener("click", darkMode);
}
  
function keyPress(event) {
    if (event.code >= "KeyA" && event.code <= "KeyZ") { //Checks if key entered is a letter
        if (col < width) { //Checks that current square doesn't exceed width of board
            let currentSquare = document.getElementById(row.toString() + col.toString());
            if (currentSquare.innerText === "") {
                currentSquare.innerText = event.code[3]; //Replaces blank square with entered key
                col++;
            }
        }
    }
    else if (event.code === "Backspace") {
        if (col > 0 && col <= width) { 
            col--;
        }
        let currentSquare = document.getElementById(row.toString() + col.toString());
        currentSquare.innerText = ""; //Replaces letter with blank string
    }
    else if (event.code === "Enter") {
        if (col < width) { //Checks if the letters entered in each col is less than the width of the word
            window.alert("You must complete the word"); //Window outputs this message
            return;
        }
        updateGuess();
        row++; //Starts at next row in board
        col = 0; //Resets column index at new row
    }

    if (!gameOver && row === height) { //User loses the game
        gameOver = true;
        //Shows html div of losing the game
        let answer = document.getElementById("correct-answer");
        answer.style.backgroundColor = '#ff4242';
        answer.innerHTML = "<p>You missed the word <strong>" + word + "</strong> and lost!</p>";
        document.querySelector("main").classList.toggle("show-answer");
    }
    document.getElementById("reset-button").addEventListener("click", gameEnd); //Adds click event to button to reset game
}

function updateGuess() {
    let correct = 0; //To count correct letters in word
    for(let i = 0; i < width; i++) {
        let currentSquare = document.getElementById(row.toString() + i.toString());
        let letter = currentSquare.innerText;

        if (word[i] === letter) { //If the letter is in the right position
            currentSquare.classList.add("correct");
            correct++;
        }
        else if (word.includes(letter)) { //If the letter is in the word but not the right position
            currentSquare.classList.add("exists");
        }
        else { //The word doesn't have this letter
            currentSquare.classList.add("wrong");
        }

        if (correct === width) { //User wins the game
            gameOver = true;
            gameWon = true;
            winGame(); //Calls function if word is correct
            //Shows html div of winning the game
            let answer = document.getElementById("correct-answer");
            answer.style.backgroundColor = '#7fff9b';
            answer.innerHTML = "<p>You guessed the word <strong>" + word + "</strong> correctly!</p>";
            document.querySelector("main").classList.toggle("show-answer");
        }
    }
}

function winGame() {
    //Calls main to hide game board and show the winning image
    document.querySelector("main").classList.toggle("hide-board");
    document.querySelector("main").classList.toggle("show-img");
}

function showInstructions() {
    document.getElementById("board").focus(); // Set focus back to game board when panel is toggled
    document.querySelector("main").classList.toggle("side-panel-open"); //Call this class from the main element to show the side panel
}

function showHint() {
    document.getElementById("board").focus();
    document.getElementById("hint-text").innerHTML = "<p><i>Hint:</i> " + hint + "</p>";
    document.querySelector("main").classList.toggle("show-hint"); //Call this class from the main element to show the hint
}

function darkMode() {
    document.getElementById("board").focus();
    document.body.classList.toggle("dark-mode"); //Call this class to show dark mode on display
    let icons = document.querySelectorAll(".icons li a"); 
    for (let i = 0; i < icons.length; i++) { //Loop through each icon in the header to toggle between white and black colour
        if (icons[i].style.color === 'white') { 
            icons[i].style.color = 'black'; //Reset icon colour to black if they are white when disabling dark mode
            continue;
        }
        icons[i].style.color = 'white'; //If icons are black (default) change it to white in dark mode
    }
}
  