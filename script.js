const mario = document.querySelector(".mario");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {

      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          mario.style.bottom = position + "px";
        }
      });

    } else {

      position += 20;
      mario.style.bottom = position + "px";

    }
  }, 20);
}

function createCannonBall() {
  const cannonBall = document.createElement("div");
  let cannonBallPosition = 1000;
  let randomTime = Math.random() * 6000;

  cannonBall.classList.add("cannon-ball");
  cannonBall.style.left = 1000 + "px";
  background.appendChild(cannonBall);

  let leftInterval = setInterval(() => {
    if (cannonBallPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cannonBall);
    } else if (cannonBallPosition > 0 && cannonBallPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = "<h1 class=\"game-over\">Fim de Jogo!</h1>";
    } else {
      cannonBallPosition -= 10;
      cannonBall.style.left = cannonBallPosition + "px";
    }
  }, 20);

  setTimeout(createCannonBall, randomTime);
}

createCannonBall();
document.addEventListener("keyup", handleKeyUp);
