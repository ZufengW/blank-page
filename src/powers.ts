import { updateMap } from './map';

// For dealing with the powers elements
const powersContainer = document.getElementById('powers-container');
const power2Check = document.getElementById('power-2-check') as HTMLInputElement;

/** Classname */
const INVISIBLE = 'invisible';

let powerLevel = 0;

/** Sets the power level and updates the DOM elements. */
export function setPowerLevel(newPowerLevel: number) {
  // Extra code to make the powers container appear
  if (powersContainer.classList.contains(INVISIBLE)) {
    powersContainer.classList.remove(INVISIBLE);
    powersContainer.scrollIntoView({behavior: 'smooth'});
  }

  powerLevel = newPowerLevel;

  // Make parts of the container appear
  for (let p = 1; p <= newPowerLevel; p++) {
    const li = document.getElementById(`power-${newPowerLevel}-li`);
    if (li.classList.contains(INVISIBLE)) {
      li.classList.remove(INVISIBLE);
    }
  }
}

/** Gets the current power level */
export function getPowerLevel() {
  return powerLevel;
}

/** Power 2: ability to retract dots */
export function getPower2Checked() {
  return power2Check.checked;
}

power2Check.addEventListener('change', () => {
  console.log('input changed');
  updateMap();
});
