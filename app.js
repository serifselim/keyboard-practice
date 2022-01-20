const KEYCODE_ARRAY = [
    81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 191, 220
]

const scoreBoard = document.querySelector('.score-board')

let pressedCharacter
let isPressed = false
let requestedCharacter
let score = 0

start()

function start() {
    updateScoreBoard()
    setNewCharacter()
} // Game Start Functions

function updateScoreBoard() {
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
    const requestedButton = getButtonWithValue(requestedCharacter)
    requestedButton.classList.add('requested')
} // New Character Functions

function checkPressedCharacter(requestedCharacter, pressedCharacter) {
    if (requestedCharacter === pressedCharacter) return true
    else return false
} // Current Control

function keyActive(e) {
    if (!isPressed) {
        pressedCharacter = getButtonWithValue(e.keyCode)
        pressedCharacter.classList.add('pressed')
        const checkIsTrue = checkPressedCharacter(requestedCharacter, e.keyCode)
        isPressed = true
    }
} // Key Actions Side

function keyDisactive() {
    pressedCharacter.classList.remove('pressed')
    isPressed = false
} // Key Actions Side


window.addEventListener('keydown', keyActive)
window.addEventListener('keyup', keyDisactive)