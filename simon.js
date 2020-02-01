// to do list

// Create start button w listener to fire new game on click

// Create conditional so button can only be clicked when a game is not in progress or 
// only starts if a game is not in progress
// this will involve a global boolean variable and an if statement

// Create conditional so 4 buttons cannot be activated unless game is in progress.

// Overhaul visible html design to look like Simon

// Create empty text fields with appropriate styling, then make DOM innertext to display you lose, 
// click for new game at appropriate time (eg via losegame function)

// round counter, game counter, highscore tracker, winning animation & delay between rounds created.  

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


// primary game function - adds event listener on click which tracks core game functionality

function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            playerarray.push(parseInt(this.id));
            // lose game logic and resulting actions
            if (parseInt(this.id) != computerarray[clicks]) {
                lossfunction()
            }
            clicks++;
            // win game logic and resulting actions
            if (computerarray.length === clicks && computerarray.join("") === playerarray.join("")) {
                sequencer = 1;
                winfunction();
            }
        })
    }
}

// function starts each round & determines Simon's choices. Argument = round length.
function initialize(length = 4) {
    console.log("am I happening twice?")
    // resets variables for next game cycle
    roundcount++;
    clicks = 0;
    countup = 0;
    playerarray = [];
    document.getElementById("roundcount").innerText = roundcount;
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
    target.addEventListener("mousedown", function () {
        this.classList.add("highlight");
    })
    target.addEventListener("mouseup", function () {
        this.classList.remove("highlight");
    })
}

// This function will execute things that happen when you win.
// it is a complex loop to animate the buttons for game victory


function winfunction() {
    // uses victory function to recur highlight 1, 2, 3, 4 in order
    if (sequencer < 17) {
        if (sequencer < 5) {
            victory(sequencer);
        }
        else if (sequencer < 9) {
            victory(sequencer - 4);
        }
        else if (sequencer < 13) {
            victory(sequencer - 8);
        }
        // highlights and removes from all 4 buttons together 4 times
        else if (sequencer < 17) {
            sequencer++;
            bigblink = document.getElementsByClassName("inactive-state");
            for (let i = 0; i < 4; i++) {
                bigblink[i].classList.add("highlight")
            }
            for (let j = 0; j < 4; j++) {
                window.setTimeout(function () {
                    bigblink[j].classList.remove("highlight");
                }, 250)
            }
            window.setTimeout(function () {
                winfunction();
            }, 500)
        }
    }
    // proceeds to adjust variables and restart next game.
    else {
        console.log("resetting variables and initiating next round")
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
    let twirl = document.getElementById(`${iteration}`);
    twirl.classList.add("highlight");
    sequencer++;
    window.setTimeout(function () {
        document.getElementById(`${iteration}`).classList.remove("highlight");
    }, 250)
    window.setTimeout(function () {
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
        roundcount = 0;
    }
    document.getElementById("highscore").innerText=highscore;
    console.log("You lose.  Haa haa.")
}

// creates an initial array of 4 for the computer, delete after there is a functioning game start button
initialize(1)

// invokes the function to make the buttons work, enabling the game
buttonClick()

