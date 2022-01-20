let currentKey;
let isPressed = false;


function keyActive(e) {
    if (!isPressed) {
        currentKey = document.querySelector(`button[value="${e.keyCode}"]`)
        currentKey.classList.add('active')
        isPressed = true;
    }
}

function keyDisactive() {
    currentKey.classList.remove('active')
    isPressed = false

}

window.addEventListener('keydown', keyActive)
window.addEventListener('keyup', keyDisactive)