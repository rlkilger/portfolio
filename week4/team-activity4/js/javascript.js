document.querySelector(".board").addEventListener('click', playerTurn);

let currentPlayer = "X";
const player1 = "X";
const player2 = "O";

function playerTurn(event) {
  if (!event.target.innerHTML.length) {
    event.target.innerHTML = currentPlayer;
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
}

function resetBoard() {
  const myNode = document.querySelectorAll(".square");
  //console.log(myNode);
  myNode.forEach(element => {
    element.innerHTML = "";
  });
  currentPlayer = player1;
}