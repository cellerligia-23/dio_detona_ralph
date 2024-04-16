const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    time: document.getElementById("time"),
    score: document.getElementById("score"),
    btn: document.getElementById("btn-game"),
  },
  values: {
    timerId: null,
    breakTime: 1000,
    positionId: 0,
    result: 0,
    currentTime: 60,
  },
};

const {view, values} = state;

// FUNÇÕES QUE CONTROLA O TEMPO DO JOGO

function countDown() {
  values.currentTime--;
  view.time.textContent = values.currentTime;

  if(values.currentTime <= 0) {
    clearInterval(values.timerId);
    clearInterval(values.currentTime);
    alert(`Seu tempo acabou! Sua pontuação: ${values.result}`)
  };
};

function setTime() {
  setInterval(countDown, values.breakTime);
};

// FUNÇÕES QUE MANIPULA AS SAQUARE

function randomSquare() {
  // Primeiro vou remover a class 'enemy'
  view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  // Segundo escolher um número aleatório de 0 a 8 para ser o index.
  const index = Math.floor(Math.random() * 9);
  let selectedSquare = view.squares[index];

  selectedSquare.classList.add("enemy");
  values.positionId = selectedSquare.id;
};

function moveEnemy() {
  values.timerId = setInterval(randomSquare, values.breakTime);
};

function addListeningFunction() {
  view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === values.positionId) {
        values.result ++;
        view.score.textContent = values.result;
        values.positionId = null;
      }
    });
  });
};

// FUNÇÃO PARA O BOTÃO

function btnFunction(){
  view.btn.textContent = "Jogando..."
  moveEnemy();
  addListeningFunction();
  setTime();
};

view.btn.addEventListener("click", btnFunction)
