import { gameMap, removeAllPipes, updateMap } from './map';

console.log('hello world');

const mapPre = document.getElementById('game-pre') as HTMLPreElement;
mapPre.style.opacity = '0.5';  // TODO: change to 0
console.log(mapPre);

console.log(gameMap);
updateMap();

// Page starts blank
let pageOpacity = 0.5;
document.addEventListener('click', () => {
  if (pageOpacity < 1) {
    pageOpacity += 0.1;
  }
  mapPre.style.opacity = String(pageOpacity);
  // Optionally remove the listener when reached 1
  // TODO: disallow interaction until full opacity
});

document.getElementById('power-2-button').addEventListener('click', () => {
  removeAllPipes();
});
