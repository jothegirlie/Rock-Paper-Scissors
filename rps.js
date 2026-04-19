const choices = new Set(["rock", "paper", "scissors"])

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase().trim()
    computerSelection = computerSelection.toLowerCase().trim()

    if (playerSelection === computerSelection) {
        return "Tie! You both chose " + computerSelection
    }

    if (playerSelection === "rock") {
        return computerSelection === "paper"
            ? "You Lose! Paper beats Rock."
            : "You Win! Rock beats Scissors."
    }

    if (playerSelection === "paper") {
        return computerSelection === "scissors"
            ? "You Lose! Scissors beats Paper."
            : "You Win! Paper beats Rock."
    }

    if (playerSelection === "scissors") {
        return computerSelection === "rock"
            ? "You Lose! Rock beats Scissors."
            : "You Win! Scissors beats Paper."
    }
}

function computerPlay() {
    const rand_int = Math.floor(Math.random() * 3)
    return rand_int === 0 ? "rock" : rand_int === 1 ? "paper" : "scissors"
}

function validateInput(input, validOptions) {
    if (input === null) return "cancelled"
    if (input.trim() === "") return "empty"
    if (validOptions && !validOptions.has(input.toLowerCase().trim())) return "invalid"
    return "valid"
}

function confirmQuit() {
    const answer = prompt("Are you sure you want to quit? Type YES to confirm.")
    return answer !== null && answer.trim().toLowerCase() === "yes"
}

function getPlayerName() {
    let playerName = prompt("🤖 ROB: Before I destroy you, what is your name?")
    const status = validateInput(playerName, null)

    if (status === "cancelled") {
        if (confirmQuit()) return null
        return "Anonymous Soldier"
    }
    if (status === "empty") {
        return "Anonymous Soldier"
    }
    return playerName.trim()
}

function getPlayerChoice(playerName, round, playerPoints, computerPoints) {
    let playerTurn = prompt(
        "ROUND " + round + " OF 5\n" +
        playerName + ": " + playerPoints + "  |  ROB: " + computerPoints + "\n\n" +
        "ROB is waiting...\n" +
        "Your turn, " + playerName + "! Choose: rock, paper or scissors\n\n" +
        "(Press Cancel to quit)"
    )
    const status = validateInput(playerTurn, choices)

    if (status === "cancelled") {
        if (confirmQuit()) return null
        return "retry"
    }
    if (status === "invalid") {
        alert("\"" + playerTurn + "\" is not valid. Type: rock, paper or scissors.")
        console.log("Invalid input.")
        return "retry"
    }
    return playerTurn.toLowerCase().trim()
}

function showIntro() {
    alert(
        "Welcome to Rock, Paper and Scissors!\n\n" +
        "📋 Want to follow the action? Open the browser console:\n" +
        "- Chrome / Edge / Firefox: press F12, then click the Console tab\n" +
        "- Mac: press Cmd + Option + J\n\n" +
        "Type your choice each round and see if you can escape ROB!"
    )
}

function logGameStart(playerName) {
    console.log("🕹️ ROCK, PAPER, SCISSORS WAR 🕹️")
    console.log("An evil AI named ROB has kidnapped you!")
    console.log("Beat it in 5 rounds of Rock Paper Scissors to ESCAPE.")
    console.log("Good luck, " + playerName + "!")
}

function playRounds(playerName) {
    let playerPoints = 0
    let computerPoints = 0

    for (let i = 0; i < 5; i++) {
        console.log("Round " + (i + 1) + " of 5 | " + playerName + ": " + playerPoints + "  ROB: " + computerPoints)

        const playerTurn = getPlayerChoice(playerName, i + 1, playerPoints, computerPoints)

        if (playerTurn === null) {
            console.log("💀 " + playerName + " quit the game. ROB wins by default.")
            return null
        }
        if (playerTurn === "retry") {
            i--
            continue
        }

        const computerSelection = computerPlay()
        console.log(playerName + " chose: " + playerTurn)
        console.log("ROB chose: " + computerSelection)
        const round = playRound(playerTurn, computerSelection)
        console.log("⏭️ " + round)

        if (round.includes("You Win")) {
            playerPoints++
        } else if (!round.includes("Tie")) {
            computerPoints++
        }
    }

    return { playerPoints, computerPoints }
}

function showResult(playerName, playerPoints, computerPoints) {
    console.log("\n---------------------------------------------------")
    console.log("                    GAME OVER")
    console.log("Final Score — " + playerName + ": " + playerPoints + "  |  ROB: " + computerPoints)
    console.log("---------------------------------------------------")

    let finalMessage = ""

    if (playerPoints > computerPoints) {
        console.log("🏆 " + playerName + " WINS! ROB has been defeated!")
        console.log("YOU ESCAPED!")
        finalMessage = "🏆 " + playerName + " wins " + playerPoints + " - " + computerPoints + "!\nYou are free! ROB has been defeated!"
    } else if (computerPoints > playerPoints) {
        console.log("🤖 ROB WINS! Loser :(")
        console.log("Too bad " + playerName + ", you got beaten by a bot...")
        finalMessage = "🤖 ROB WINS! " + computerPoints + " - " + playerPoints + "!\nSad, " + playerName + "... Refresh to try again!"
    } else {
        console.log("🤝 It's a DRAW!")
        console.log("Unfortunately you are still stuck... Refresh to try again!")
        finalMessage = "🤝 It's a DRAW! " + playerPoints + " - " + computerPoints + "\nYou are still stuck... Refresh to try again!"
    }

    alert(finalMessage)
}

function game() {
    showIntro()

    const playerName = getPlayerName()
    if (playerName === null) {
        console.log("💀 Player quit before the game started.")
        return
    }

    logGameStart(playerName)

    const result = playRounds(playerName)
    if (result === null) return

    showResult(playerName, result.playerPoints, result.computerPoints)
}

game()