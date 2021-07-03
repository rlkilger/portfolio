import Meals from './meals.js';

const myHike = new Meals('meals');

window.addEventListener("load", () => {
  myHike.showHikeList();
});