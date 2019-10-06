import { removeAllPipes, setGameInteractable, updateMap } from './map';

const mapPre = document.getElementById('game-pre') as HTMLPreElement;
mapPre.style.opacity = '0';
updateMap();

// Page starts blank
let pageOpacityMultipler = 0;
document.addEventListener('click', handleClick);

function handleClick() {
  // Increase opacity until 1, then remove the event
  pageOpacityMultipler += 1;
  if (pageOpacityMultipler < 10) {
    // Not using floats here due to floating point imprecision
    mapPre.style.opacity = `.${pageOpacityMultipler}`;
  } else {
    mapPre.style.opacity = '1';
    document.removeEventListener('click', handleClick);
    setGameInteractable(true);
    updateMap();
  }
}

document.getElementById('power-2-button').addEventListener('click', () => {
  removeAllPipes();
});
