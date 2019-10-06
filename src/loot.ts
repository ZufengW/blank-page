import { getPowerLevel, MAX_POWER_LEVEL } from './powers';

let currencyCollected = 0;
/** Index of next trophy. */
let nextTrophy = 0;

export const MAX_CURRENCY = 1000;

const containerDiv = document.getElementById('trophy-container');
const moneyDisplay = document.getElementById('money-display');
const trophyDiv = document.getElementById('trophy-case');
const nextTrophyPre = document.getElementById('trophy-next');

// Need to escape the backslashes though
const TROPHIES = [
  {
    design: [
      '     ',
      '     ',
      '     ',
      '     ',
      '     ',
      '  _  ',
      ' {1} ',
      '  "  ',
    ],
    cost: 100,
  },
  {
    design: [
      '     ',
      '     ',
      '     ',
      '     ',
      '  _  ',
      ' /=\\ ',
      ' \\"/ ',
      ' /_\\ ',
    ],
    cost: 200,
  },
  {
    design: [
      '       ',
      '       ',
      '       ',
      '  /-\\  ',
      ' [\\_/] ',
      '  \\ /  ',
      '  |4|  ',
      '  [_]  ',
    ],
    cost: 400,
  },
  {
    design: [
      '          ',
      '          ',
      '   ____   ',
      ' /| .. |\\ ',
      ' \\| .. |/ ',
      '  \\    /  ',
      '   |__|   ',
      '  /____\\  ',
    ],
    cost: 600,
  },
  {
    design: [
      '     __     ',
      '   /`  \\\\   ',
      '  _\\___//_  ',
      ' | | LD | | ',
      '  \\| 45 |/  ',
      '   \\    /   ',
      '    |__|    ',
      '   /____\\   ',
    ],
    cost: 800,
  },
  {
    design: [
      '   /````\\   ',
      '  /  /\\  \\  ',
      '  \\  \\/  /  ',
      '   \\  \\ /   ',
      ' \\-/\\  \\\\-/ ',
      ' /-\\ __ /-\\ ',
      '    |__|    ',
      '   /____\\   ',
    ],
    cost: 1000,
  },
];

// Trophies must have correct height
for (const t of TROPHIES) {
  if (t.design.length !== 8) {
    console.error('T has incorrect height', t);
  }
}

/** Add 1 to currency. Updates the trophies. */
export function addCurrency() {
  containerDiv.classList.remove('invisible');
  currencyCollected += 100;
  moneyDisplay.textContent = `Money: $${currencyCollected}`;

  if (TROPHIES[nextTrophy].cost <= currencyCollected) {
    // Can display the next trophy
    trophyDiv.appendChild(trophyToHtml(TROPHIES[nextTrophy].design));
    trophyDiv.scrollIntoView({behavior: 'smooth'});
    nextTrophy++;

    if (nextTrophy < TROPHIES.length) {
      // Update the message
      nextTrophyPre.innerHTML = `\n\n\n Next: $${TROPHIES[nextTrophy].cost} \n\n\n`;
    } else {
      // No more trophies.
      nextTrophyPre.innerHTML = `\n\n\n FOUND \n THEM \n ALL \n\n\n`;
    }
  }
  checkCompletion();
}

function trophyToHtml(design: string[]): HTMLPreElement {
  const pre = document.createElement('pre');
  pre.innerHTML = design.join('\n');
  pre.classList.add('trophy');
  return pre;
}

/** Check completionist: have max power level and all trophies */
export function checkCompletion() {
  if (getPowerLevel() === MAX_POWER_LEVEL
    && currencyCollected === MAX_CURRENCY) {
      const p = document.getElementById('completionist');
      if (p.textContent.length > 0) {
        return;
      }
      p.textContent = '100% Completion! You win! Thanks for playing.';
      p.scrollIntoView({behavior: 'smooth'});
  }
}
