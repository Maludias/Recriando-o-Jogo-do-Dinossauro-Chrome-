const menina = document.querySelector('.menina');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
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
          menina.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      
      position += 20;
      menina.style.bottom = position + 'px';
    }
  }, 20);
}

function createMeninas() {
  const meninas = document.createElement('div');
  let meninasPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  meninas.classList.add('meninas');
background.appendChild(meninas);
  meninas.style.left = meninasPosition + 'px';

  let leftTimer = setInterval(() => {
    if (meninasPosition < -60) {
     
      clearInterval(leftTimer);
     background.removeChild(meninas);
    } else if (meninasPosition > 0 && meninasPosition < 60 && position < 60) {
     
      clearInterval(leftTimer);
      isGameOver = true;
      window.location.href = "gameover.html"
      //document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
        } else {
      meninasPosition -= 10;
      meninas.style.left = meninasPosition + 'px';
    }
  }, 20);

  setTimeout(createMeninas, randomTime);
}

createMeninas();
document.addEventListener('keyup', handleKeyUp);