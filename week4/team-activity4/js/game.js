const chooseTL = document.getElementById("topLeft");
const chooseTM = document.getElementById("topMid");
const chooseTR = document.getElementById("topRight");
const chooseML = document.getElementById("midLeft");
const chooseMM = document.getElementById("midMid");
const chooseMR = document.getElementById("midRight");
const chooseBL = document.getElementById("bottomLeft");
const chooseBM = document.getElementById("bottomMid");
const chooseBR = document.getElementById("bottomRight");


document.querySelector(".gameBoard").addEventListener('click', playGame);

let currentPlayer = "x";

function playGame(event) {
  event.target.innerHTML = currentPlayer;
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
}