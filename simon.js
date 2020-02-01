// to do list

// Create start button w listener to fire new game on click

// Overhaul visible html design to look like Simon

// Create empty text fields with appropriate styling, then make DOM innertext to display you lose, 
// click for new game at appropriate time (eg via losegame function)

// Create a closure around finished js to bypass cheating (this is last as it makes debugging harder)


// creates variables needed by multiple functions so they have to exist globally.
let computerarray = [];
let playerarray = [];
let clicks = 0;
let countup = 0;
let sequencer = 0;
let highscore = 0;
let roundcount = 0;
let gamecount = 0;
let enableplayer = true;
let inprogress = false;


// primary game function - adds event listener on click which tracks core game functionality

function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            if (enableplayer === true && inprogress === true) {
                playerarray.push(parseInt(this.id));
                // lose game logic and resulting actions
                if (parseInt(this.id) != computerarray[clicks]) {
                    enableplayer = false;
                    lossfunction()
                }
                clicks++;
                // win game logic and resulting actions
                if (computerarray.length === clicks && computerarray.join("") === playerarray.join("")) {
                    sequencer = 1;
                    enableplayer = false;
                    winfunction();
                }
            }
        })
    }
}

// function starts each round & determines Simon's choices. Argument = round length.
function initialize(length = 4) {
    // adjusts or resets variables for next game cycle
    enableplayer = false;
    roundcount++;
    clicks = 0;
    countup = 0;
    playerarray = [];
    inprogress = true;
    document.getElementById("roundcount").innerText = roundcount;
    // generates x random numbers between 1 and 4 and pushes each one into array holding computer's choices.
    for (let i = 0; i < length; i++) {
        let pick = (Math.floor(Math.random() * 4) + 1);
        computerarray.push(pick);
    }
    // disables player input during Simon's sequence display
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
        // enables buttons again when Simon's sequence ends
        else {
            enableplayer = true;
        }
    }, 1500)
}

// for loop that adds mouseup and mousedown event listeners to highlight buttons when pressed
(function () {
    for (let i = 1; i < 5; i++) {
        let target = document.getElementById(i);
        target.addEventListener("mousedown", function () {
            if (enableplayer === true && inprogress === true) {
                this.classList.add("highlight");
            }
        })
        target.addEventListener("mouseup", function () {
            if (enableplayer === true && inprogress === true) {
                this.classList.remove("highlight");
            }
        })
    }
})()

// This function will execute things that happen when you win.
// it is a complex loop to animate the buttons for game victory


function winfunction() {
    // uses victory function to recur highlight 1, 2, 3, 4 in order
    if (sequencer < 17) {
        if (sequencer < 13) {
            victory(sequencer);
        }
        // highlights and removes from all 4 buttons together 4 times
        else if (sequencer < 17) {
            sequencer++;
            bigblink = document.getElementsByClassName("inactive-state");
            for (let i = 0; i < 4; i++) {
                bigblink[i].classList.add("highlight")
                window.setTimeout(function () {
                    bigblink[i].classList.remove("highlight");
                }, 250)
            }
            window.setTimeout(function () {
                winfunction();
            }, 500)
        }
    }
    // proceeds to adjust variables and restart next game.
    else {
        computerarray = [];
        clicks++;
        // begins the next game after a brief delay
        window.setTimeout(function () {
            initialize(clicks)
        }, 2500)
    }
}

// recursive function used to make victory twirl

function victory(iteration = 1) {
    let twirl = document.getElementById(`${(iteration % 4) + 1}`);
    twirl.classList.add("highlight");
    sequencer++;
    window.setTimeout(function () {
        document.getElementById(`${(iteration % 4) + 1}`).classList.remove("highlight");
        winfunction();
    }, 250)
}

// this function will execute stuff that happens when you lose
// this will mostly consist of feedback to the player (You Lose text, etc)
// as well as potentially re-enabling the start game button.
// now accurately tracks high score  

function lossfunction() {
    roundcount--;
    if (roundcount > highscore) {
        highscore = roundcount;
    }
    roundcount = 0; 
    document.getElementById("roundcount").innerText = roundcount;
    document.getElementById("highscore").innerText = highscore;
    enableplayer = true;
    inprogress = false;
}

// creates an initial array for the computer, delete after there is a functioning game start button
initialize(1)

// invokes the function to make the buttons work, enabling the game
buttonClick()

