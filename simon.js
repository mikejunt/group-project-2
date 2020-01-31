let computerarray = [];
let playerarray = []
let clicks = 0;
let countup;



function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            playerarray.push(parseInt(this.id));
            if (parseInt(this.id) != computerarray[clicks]) {
                console.log(`Didnt Match loss follows. ${this.id} ${computerarray[clicks]}`);
                lossfunction()
            }
            clicks++;
            if (computerarray.length === clicks && computerarray === playerarray) {
                computerarray = [];
                clicks++;
                initialize(clicks);
                clicks = 0;
                winfunction();
            }
            console.log(`${clicks} clicks so far.`)
        })
    }
    console.log("For loop complete.")
}

function initialize(length = 4) {
    for (let i = 0; i < length; i++) {
        let pick = (Math.floor(Math.random() * 4) + 1);
        computerarray.push(pick);
    }
    console.log("Computer Array Generated.");
    countup = 0;
    playerarray = [];
    highlighter();
}

function highlighter() {
    document.getElementById(computerarray[countup]).classList.add("highlight");
    console.log(`Color added to ID ${computerarray[countup]}`)
    window.setTimeout(function () {
        document.getElementById(computerarray[countup]).classList.remove("highlight");
        console.log(`Color removed from ID ${computerarray[countup]}`)
        countup++
    }, 1000)
    window.setTimeout(function () {
        if (countup < computerarray.length) {
            highlighter()
        }
    }, 1500)
}

for (let i = 1; i < 5; i++) {
    let target = document.getElementById(i);
    console.log (`target picked, it is ${target.id}`)
    target.addEventListener("mousedown", function () { this.classList.add("highlight");console.log(`Mouse down on ${this.id}`) });
    target.addEventListener("mouseup", function () { this.classList.remove("highlight"); console.log(`Mouse up on ${this.id}`) })
}





function winfunction() { console.log(`Win Function.  ${clicks} clicks.  ${computerarray.length} clicks this time.`) }
function lossfunction() { console.log("You lose.  Haa haa.") }




initialize(4)
console.log(computerarray)
buttonClick()

