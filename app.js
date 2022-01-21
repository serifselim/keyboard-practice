const KEYCODE_ARRAY = [
    81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 191, 220
]

let pressedCharacter, requestedButton, requestedCharacter
let isPressed = false
let currentScore = 0
let bestScore = 0
let isResetting = false

const currentScoreText = document.getElementById('current-score')
const bestScoreText = document.getElementById('best-score')
const repeatButton = document.getElementById('repeat')

start()

function start() {
    getBestScore()
    setNewCharacter()
    updateCurrentScore(false)
} // Game Start Functions

function getBestScore() {
    const data = JSON.parse(localStorage.getItem('bestScore'))
    if (data) {
        bestScore = data
        bestScoreText.textContent = bestScore.toString()
    }
} // Get Value From Local Storage

function updateCurrentScore(checkIsTrue = true) {
    if (checkIsTrue) {
        currentScore += Math.floor(Math.random() * 10)
    } else {
        currentScore = 0;
    }
    currentScoreText.textContent = currentScore.toString()
} // Show Current Score Board

function updateBestScore() {
    if (currentScore >= bestScore) {
        JSON.stringify(localStorage.setItem('bestScore', currentScore))
        bestScoreText.textContent = currentScore.toString()
    }
}

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

function actionAllButtonStyle(actionType) {
    KEYCODE_ARRAY.forEach(keyCode => {
        const eachButton = getButtonWithValue(keyCode)
        if (actionType === 'add') eachButton.classList.add('requested')
        else eachButton.classList.remove('requested')
    })
} // Action All Button 

function resetGame() {
    isResetting = true
    updateBestScore()
    updateCurrentScore(false)
    actionAllButtonStyle('add')

    setTimeout(() => {
        actionAllButtonStyle('remove')
        setNewCharacter()
        isResetting = false
    }, 1000);
} // Reset All Game

function addSound() {
    let audio = new Audio('keyboard.mp3');
    audio.play();
} // Add keyboard sound

function keyActive(e) {
    if (!isPressed && KEYCODE_ARRAY.includes(e.keyCode) && !isResetting) {
        addSound()
        pressedCharacter = getButtonWithValue(e.keyCode)
        pressedCharacter.classList.add('pressed')
        const checkIsTrue = checkPressedCharacter(requestedCharacter, e.keyCode)
        if (checkIsTrue) {
            updateCurrentScore()
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

repeatButton.onclick = () => resetGame()
window.addEventListener('keydown', keyActive)
window.addEventListener('keyup', keyDisactive)