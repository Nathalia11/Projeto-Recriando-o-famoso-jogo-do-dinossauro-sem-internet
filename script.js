const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false; 
let isGameOver = false;
let position = 0; // deixar fora para ser acessada por todas as funções //

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {  //invertento a variável //
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) { // altura que o dino pode saltar //

      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {  // intervalo de decida //
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {

      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20); //  a cada 20 milesimos de segundo vai adicionar mais 20 dentro do position //
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {

      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // operador logico && que verifica uma segunda condição // 

      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; //vai limpar a tela e botar a menssagem "fim de jogo" //
    } else {
      cactusPosition -= 10; // o cactus se mover para a esquerda//
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime); // invocando outros cactus de maneira aleatoria //
}

createCactus();
document.addEventListener('keyup', handleKeyUp); // Se pressionarmos e soltarmos uma tecla, primeiro se produz um evento keydown ao pressionar a tecla, em seguida um keypress e por último um keyup ao soltá-la.//



