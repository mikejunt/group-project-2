// to do list

// Create start button w listener to fire new game on click

// Create conditional so button can only be clicked when a game is not in progress or 
// only starts if a game is not in progress
// this will involve a global boolean variable and an if statement

// Create conditional so 4 buttons cannot be activated unless game is in progress.

// Create html fields to display current game round in middle of start button

// Create counter and innertext edit to display current round.
// this would be added to initialize, before the first for loop.  

// Add a delay between winning and start of next round, probably with a settimeout
// this involves moving initializing next game into wingame function

// Overhaul visible html design to look like Simon

// Create empty text fields with appropriate styling, then make DOM innertext to display you lose, 
// click for new game at appropriate time (eg via losegame function)

// Add some kind of round winning animation.  This could provide the delay between rounds. 
// this would go in the wingame animation

// Potentially add a high score feature. Max rounds survived.   And requisite function to write it to page.
// this would go in the losegame function

// Create a closure around finished js to bypass cheating (this is last as it makes debugging harder)


// creates variables needed by multiple functions so they have to exist globally.
let computerarray = []; 
let playerarray = []; 
let clicks = 0;
let countup = 0;


// primary game function - adds event listener on click which tracks core game functionality

function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            playerarray.push(parseInt(this.id));
            // lose game logic and resulting actions
            if (parseInt(this.id) != computerarray[clicks]) {
                console.log(`Didnt Match, loss follows. ${this.id} ${computerarray[clicks]}`);
                lossfunction()
            }
            clicks++;
            // win game logic and resulting actions
            if (computerarray.length === clicks && computerarray.join("") === playerarray.join("")) {
                winfunction();
            }
            console.log(`${clicks} clicks so far.`)
        })
    }
}

// function starts each round & determines Simon's choices. Argument = round length.
function initialize(length = 4) {
    // resets variables for next game cycle
    clicks = 0;
    countup = 0;
    playerarray = [];
    // generates x random numbers between 1 and 4 and pushes each one into array holding computer's choices.
    for (let i = 0; i < length; i++) {
        let pick = (Math.floor(Math.random() * 4) + 1);
        computerarray.push(pick);
    }
    // see below
    highlighter();
}

// function that recursively causes buttons to light up in Simon's order
function highlighter() {
// immediately adds highlighter class to brighten button
    document.getElementById(computerarray[countup]).classList.add("highlight");
// creates 1 second timer after which the brightness is removed
    window.setTimeout(function () {
        document.getElementById(computerarray[countup]).classList.remove("highlight");
        countup++;
    }, 1000)
// creates an entirely separate 1.5 second timeout to run this function again until Simon's array complete
    window.setTimeout(function () {
        if (countup < computerarray.length) {
            highlighter()
        }
    }, 1500)
}

// for loop that adds mouseup and mousedown event listeners to highlight buttons when pressed
for (let i = 1; i < 5; i++) {
    let target = document.getElementById(i);
    target.addEventListener("mousedown", function (){
        this.classList.add("highlight");
        console.log(`Mouse down on ${this.id}`)
    })
    target.addEventListener("mouseup", function (){
        this.classList.remove("highlight");
        console.log(`Mouse up on ${this.id}`)
    })
}

// This function will execute things that happen when you win.
// any win-the-game effects and delay before starting the next game would happen here


function winfunction() {
    // adjusts variables for starting the next game
    computerarray = [];
    clicks++;    
    // begins the next game
    initialize(clicks);
}

// this function will execute stuff that happens when you lose
// this will mostly consist of feedback to the player (You Lose text, etc)
// as well as potentially re-enabling the start game button.
// this is also where a high score variable would be tracked and high score written onto the document.  

function lossfunction() {
    console.log("You lose.  Haa haa.")
}

// creates an initial array of 4 for the computer, delete after there is a functioning game start button
initialize(4)

// invokes the function to make the buttons work, enabling the game
buttonClick()

