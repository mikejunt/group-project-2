let computerarray = [];
let playerarray = [];



function buttonClick() {
    for (let i = 1; i <= 4; i++) {
        let buttons = document.getElementById(i);
        buttons.addEventListener("click", function () {
            playerarray.push(this.id);
            console.log.apply(`Listener ${i} created`)
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
}
initialize(8)
console.log(computerarray)
buttonClick