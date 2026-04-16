function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase().trim()
    computerSelection = computerSelection.toLowerCase().trim()
 
    if (playerSelection === computerSelection) {
        return "Tie! You both choose " + computerSelection 
    }
 
    let result = ""
 
    if (playerSelection == "rock") {
        if (computerSelection == "paper") {
            result = "You Lose! Paper beats Rock."
        } else {
            result = "You Win! Rock beats Scissors."
        }
    }
 
    if (playerSelection == "paper") {
        if (computerSelection == "scissors") {
            result = "You Lose! Scissors beats Paper."
        } else {
            result = "You Win! Paper beats Rock."
        }
    }
 
    if (playerSelection == "scissors") {
        if (computerSelection == "rock") {
            result = "You Lose! Rock beats Scissors."
        } else {
            result = "You Win! Scissors beats Paper."
        }
    }
 
    return result
}
 
function computerPlay() {
    const rand_int = Math.floor(Math.random() * 3)

    return rand_int == 0 ? "rock" : rand_int == 1 ? "paper" : "scissors"
}
 
function game() {
    const choises = new Set(["rock", "paper", "scissors"]);
    alert("Welcome to Rock, Paper and Scissors! Write your choice and see if you win!")
 
    let playerName = prompt(
        "🤖ROB: Before I destroy you, what is your name?"
    )
    if (playerName === null || playerName.trim() === "") {
        playerName = "Anonymous Soldier"
    } else {
        playerName = playerName.trim()
    }
 
    
    console.log("🕹️ ROCK, PAPER, SCISSORS WAR 🕹️")
    console.log("An evil AI named ROB has kidnapped you!")
    console.log("Beat it in 5 rounds of Rock Paper Scissors to ESCAPE.")
    console.log("Good luck, " + playerName + "!")

 
    let player_points = 0
    let computer_points = 0
 
    for (let i = 0; i < 5; i++) {
        console.log("Round " + (i + 1) + " of 5 | " + playerName + ": " + player_points + "  ROB: " + computer_points)
 
        let player_turn = prompt(
            "ROUND " + (i + 1) + " OF 5\n" +
            playerName + ": " + player_points + "  |  ROB: " + computer_points + "\n\n" +
            "ROB is waiting...\n" +
            "Your turn, " + playerName + "! Choose either rock, paper or scissors"
        )
 
        if (player_turn === null) {
            console.log("\n💀 " + playerName + "ROB wins by default.You remain a hostage.")
            return
        }
 
        player_turn = player_turn.toLowerCase().trim()
 
        if (choises.has(player_turn)) {
            let computerSelection = computerPlay()
            console.log(playerName + " choose: " + player_turn)
            console.log("ROB choose: " + computerSelection)
            let round = playRound(player_turn, computerSelection)
            console.log("⏭️ " + round)
            if (round.includes("You Win")) {
                player_points++
            } else if (round.includes("Tie")) {
            } else {
                computer_points++
            }
        } else {
            alert( player_turn + "\" is not valid. Type: rock, paper or scissors.")
            console.log("invalid input.")
            i--
        }
    }
 
    console.log("\n---------------------------------------------------")
    console.log("                    GAME OVER")
    console.log("Final Score — " + playerName + ": " + player_points + "  |  ROB: " + computer_points)
    console.log("-----------------------------------------------------")
 
    let finalMessage = ""
 
    if (player_points > computer_points) {
        console.log("🏆 " + playerName + " WINS! ROB has been defeated!")
        console.log("YOU ESCAPED!")
        finalMessage = "🏆 " + playerName + " wins " + player_points + " - " + computer_points + "!\nYou are free! ROB has been defeated!"
    } else if (computer_points > player_points) {
        console.log("🤖ROB WINS! Muuuahahahahahaha!")
        console.log("Too bad " + playerName + ", you got beaten by a bot.")
        finalMessage = "🤖ROB WINS! " + computer_points + " - " + player_points + "!\nSad, " + playerName + "... Refresh to try again!"
    } else {
        console.log("🤝 It's a DRAW! ROB and " + playerName + " are at tie.")
        console.log("Unfortunately you are still stuck... Refresh to try again!")
        finalMessage = "🤝 It's a DRAW! " + player_points + " - " + computer_points + "\nYou are still stuck... Refresh to try again!"
    }
 
    alert(finalMessage)
}
 
game()