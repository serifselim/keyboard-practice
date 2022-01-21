const KEYCODE_ARRAY = [
    81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 191, 220
]

const scoreBoard = document.querySelector('.score-board')

let pressedCharacter
let isPressed = false
let requestedCharacter
let requestedButton
let score = 0

start()

function start() {
    setNewCharacter()
    updateScoreBoard()
} // Game Start Functions

function updateScoreBoard(checkIsTrue = true) {
    if (checkIsTrue) {
        score += Math.floor(Math.random() * 10)
    } else {
        score = 0;
    }
    scoreBoard.textContent = score.toString()
} // Show Current Score Board

function getButtonWithValue(value) {
    return document.querySelector(`button[value="${value}"]`)
} // Get Button With Value in HTML

function getNewCharacter() {
    const randomNumber = Math.floor(Math.random() * KEYCODE_ARRAY.length)
    return KEYCODE_ARRAY[randomNumber]
} // New Character Functions

function setNewCharacter() {
    requestedCharacter = getNewCharacter()
    requestedButton = getButtonWithValue(requestedCharacter)
    requestedButton.classList.add('requested')
} // New Character Functions

function deleteOldCharacter() {
    requestedButton.classList.remove('requested')
} // Delete Old Character Function

function checkPressedCharacter(requestedCharacter, pressedCharacter) {
    if (requestedCharacter === pressedCharacter) return true
    else return false
} // Current Control

function resetGame() {
    isPressed = true
    updateScoreBoard(false)
    KEYCODE_ARRAY.forEach(keyCode => {
        const eachButton = getButtonWithValue(keyCode)
        eachButton.classList.remove('pressed')
        eachButton.classList.add('requested')
    })
    setTimeout(() => {
        isPressed = false
        KEYCODE_ARRAY.forEach(keyCode => {
            const eachButton = getButtonWithValue(keyCode)
            eachButton.classList.remove('pressed')
            eachButton.classList.remove('requested')
        })
        setNewCharacter()
    }, 1000);
}

function keyActive(e) {
    if (!isPressed && KEYCODE_ARRAY.includes(e.keyCode)) {
        pressedCharacter = getButtonWithValue(e.keyCode)
        pressedCharacter.classList.add('pressed')
        const checkIsTrue = checkPressedCharacter(requestedCharacter, e.keyCode)
        if (checkIsTrue) {
            updateScoreBoard()
            deleteOldCharacter()
            setNewCharacter()
        } else {
            resetGame()
        }
        isPressed = true
    }
} // Key Actions Side

function keyDisactive() {
    pressedCharacter.classList.remove('pressed')
    isPressed = false
} // Key Actions Side


window.addEventListener('keydown', keyActive)
window.addEventListener('keyup', keyDisactive)