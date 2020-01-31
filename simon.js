let computerarray = [];
let playerarray = [];
let clicks = 0



function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            if (parseInt(this.id) != computerarray[clicks]) {
                console.log(`Didnt Match loss follows. ${this.id} ${computerarray[clicks]}`);
                lossfunction()
            }
            clicks++;
            if (computerarray.length === clicks) {  
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
    let countup = 0;
    


}

function highlight() {}








function winfunction() {console.log(`Win Function.  ${clicks} clicks.  ${computerarray.length} clicks this time.`)}
function lossfunction() {console.log("You lose.  Haa haa.")}




initialize(4)
console.log(computerarray)
buttonClick()

