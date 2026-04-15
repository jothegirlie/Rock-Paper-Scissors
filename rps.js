function playRound(playerSelection, computerSelection){
    let result = ""
    if (playerSelection.includes(computerSelection)) {
        return "tie"
    }

    if(playerSelection == "rock"){
        if(computerSelection == "paper"){
            result = "pc wins"
        } else {
            result = "player wins"
        }
    }

    if(playerSelection == "paper"){
        if(computerSelection == "scissors"){
            result = "pc wins"
        } else {
            result = "player wins"
        }
    }

    if(playerSelection == "scissors"){
        if(computerSelection == "rock"){
            result = "pc wins"
        } else {
            result = "player wins"
        }
    }

    return result


}

function computerPlay(){
    const rand_int = Math.floor(Math.random() * 2)

    return rand_int==0 ? "rock" : rand_int == 1? "paper" : "scissors"
}


function game(){

    const choises = new Set(["rock","paper","scissors"])
    console.log("Welcome to Rock, Paper and Scissors! Write your choise and see if you win")
    let player_points = 0
    let computer_points = 0
    for (let i = 0; i < 5; i++){
        let player_turn = prompt("It's your turn, player. Choose either rock, paper or scissors")
        player_turn = player_turn.toLowerCase().trim()
        if (choises.has(player_turn)){
            let computerSelection = computerPlay()
            console.log("You choose: " + player_turn)
            console.log("Computer choose: " + computerSelection)
            let round = playRound(player_turn,computerSelection)
            if(round.includes("player wins")){
                console.log("You won!")
                player_points++
            } else if (round.includes("tie")) {
                console.log("Tie...")
            } else {
                console.log("Computer won.")
                computer_points++
            }
        } else {
            console.log("Whoops, it's not a valid choise")
            i = 0
        }
    }

    if(player_points > computer_points){
        console.log("Congrats, you won against the computer")
    } else if (computer_points > player_points){
        console.log("Too bad, you got beaten by a bot. Maybe you are the clanker, after all?")
    } else {
        console.log("Tie.")
    }
}

game()