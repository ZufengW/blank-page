
/** The world map. Everything starts hidden except for the first sentence. */
const MAP_SCHEMATIC = [
  '    #######################################################################',
  '                                              #                            ',
  '# + This.page is intentionally left blank. #  +#                          #',
  '#                                                                          ',
  '         *     #                                                           ',
  '                                                                           ',
  '#                                                                          ',
  '# +           +  # #  #                       +#                           ',
  '                                              #                            ',
  '2            .                                                             ',
  '                 1                                                         ',
  '  #            +    #                                                      ',
  '   2          ##                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
];

interface MapTile {
  /** Whether or not this tile is revealed to the player.
   * 0: not revealed; 1: question mark; 2: revealed
   */
  revealed: 0|1|2;
  /** The character currently occupying this tile. */
  char: string;
  /** Reference to the tile in the DOM. */
  span: HTMLSpanElement;
  /** Row in the map */
  row: number;
  /** Col in the map */
  col: number;
}

const MAP_ROWS = MAP_SCHEMATIC.length;
/** Number of columns in the map. */
const MAP_COLS = MAP_SCHEMATIC[0].length;

/** Classname */
const INTERACTIVE = 'interactive';

/** Do this once to render the map initially */
function initRenderMap(pre: HTMLPreElement): void {
  // Starts empty
  let htmlString = '';
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      htmlString += `<span row="${r}" col="${c}"> </span>`;
    }
    htmlString += '\n';
  }
  pre.innerHTML = htmlString;
}

/**
 * Create all the spans and get references to them.
 *
 * In order to get reference to the spans, Must render the map before doing this.
 *
 * Also adds click listeners to the spans.
 */
function setupMapPre(): MapTile[][] {
  const map: MapTile[][] = [];
  for (let r = 0; r < MAP_ROWS; r++) {
    const mapRow: MapTile[] = [];
    for (let c = 0; c < MAP_COLS; c++) {
      const span = document.querySelector(`span[row="${r}"][col="${c}"]`) as HTMLSpanElement;
      const mapTile: MapTile = {
        char: MAP_SCHEMATIC[r][c],
        revealed: 0,
        span,
        row: r,
        col: c,
      };
      mapRow.push(mapTile);

      span.onclick = () => {
        onSpanClick(r, c);
      };
      // Beacons (number digits) get a special class
      if (mapTile.char.match(/\d/)) {
        span.classList.add('beacon');
      }
    }
    map.push(mapRow);
  }

  // Reveal the first part of the map
  for (let i = 3; i < 42; i++) {
    map[2][i].revealed = 2;
  }

  return map;
}

initRenderMap(document.getElementById('game-pre') as HTMLPreElement);
export const gameMap = setupMapPre();
let starsCollected = 0;
let activeBeacons = {};
/** Power level increases when lighting a bunch of beacons */
let powerLevel = 0;

/** Updates the visibility of the entire map. */
export function updateMap(): void {
  activeBeacons = {};

  for (const row of gameMap) {
    for (const tile of row) {
      if (!tile.revealed) {
        // Check if should be revealed? When next to a visible and active char
        const neighbours = getNeighboursAsArray(tile);
        for (const n of neighbours) {
          if (n.revealed === 2 && n.char !== ' ') {
            // Empty tiles get fully revealed immediately. Non-empty get ?
            tile.revealed = tile.char === ' ' ? 2 : 1;
            break;
          }
        }
      }
      if (tile.revealed === 0) {
        tile.span.innerHTML = ' ';
        continue;
      } else if (tile.revealed === 1 && tile.char !== ' ') {
        tile.span.innerHTML = '!';
        tile.span.classList.add(INTERACTIVE);
        continue;
      }
      // Tile is completely revealed.
      updateSpan(tile);
      // Count activated beacons
      if (tile.char.match(/\d/) && isInteractive(tile)) {
        if (activeBeacons[tile.char]) {
          activeBeacons[tile.char]++;
        } else {
          activeBeacons[tile.char] = 1;
        }
      }
    }
  }
}

/** Updates just one span on the map. */
function updateSpan(tile: MapTile) {
  tile.span.innerHTML = tile.char;
  // If interactible, use different mouse hover.
  if (isInteractive(tile)) {
    tile.span.classList.add(INTERACTIVE);
  } else {
    tile.span.classList.remove(INTERACTIVE);
  }
}

/**
 * Handler for when a span is clicked.
 *
 * @param r row index
 * @param c col index
 */
function onSpanClick(row: number, col: number): void {
  // TODO: behaviour depends on what the character is
  const tile = gameMap[row][col];
  console.log('span clicked', row, col, tile);

  if (tile.revealed === 1) {  // May click '?' to reveal it
    tile.revealed = 2;
    updateMap();
    return;
  }
  if (!isInteractive(tile)) {
    return;
  }
  // Uppercase becomes lowercase.
  if (tile.char >= 'A' && tile.char <= 'Z') {
    tile.char = tile.char.toLowerCase();
    updateMap();
    return;
  }
  // Lowercase characters disappear.
  if (tile.char >= 'a' && tile.char <= 'z') {
    // To be less tedious, also removes contiguous lowercase characters.
    tile.char = ' ';
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      const currTile = gameMap[r][c];
      if (!(currTile.char >= 'a' && currTile.char <= 'z')) { break; }
      currTile.char = ' ';
      c--;
    }
    // Go right
    c = tile.col + 1;
    while (c < MAP_COLS) {
      const currTile = gameMap[r][c];
      if (!(currTile.char >= 'a' && currTile.char <= 'z')) { break; }
      currTile.char = ' ';
      c++;
    }
    return updateMap();
  }

  // Expands to the left as long as there is space at the end of the ...
  if (tile.char === '.') {
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '.';
        break;
      }
      if (gameMap[r][c].char !== '.') { break; }
      c--;
    }
    return updateMap();
  }
  if (tile.char === '+' ) {
    // May expand out as long as there is empty space at the end of any pipe.
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '-';
        break;
      }
      if (gameMap[r][c].char !== '-') { break; }
      c--;
    }
    // Go right
    c = tile.col + 1;
    while (c < MAP_COLS) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '-';
        break;
      }
      if (gameMap[r][c].char !== '-') { break; }
      c++;
    }
    // Go up
    r = tile.row - 1;
    c = tile.col;
    while (r >= 0) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '|';
        break;
      }
      if (gameMap[r][c].char !== '|') { break; }
      r--;
    }
    // Go down
    r = tile.row + 1;
    while (r < MAP_ROWS) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '|';
        break;
      }
      if (gameMap[r][c].char !== '|') { break; }
      r++;
    }
    return updateMap();
  }
  // If click on beacon, check if the others are all active...
  if (tile.char.match(/\d/)) {
    const numBeaconsActive: number = activeBeacons[tile.char];
    console.log(`numBeaconsActive for ${tile.char}:`, numBeaconsActive);
    if (numBeaconsActive === parseInt(tile.char, 10)) {
      console.log('Activate beacon', tile.char);
      powerLevel = numBeaconsActive;
      destroyAndRevealBeacons(numBeaconsActive);
    }
    return updateMap();
  }
  if (tile.char === '*' ) {
    starsCollected++; console.log('Collected a star', starsCollected);
    tile.char = ' ';
    updateMap();  // Can simply collect it.
    return;
  }
}

/** Checks if a char is interactive -- i.e. satisfies the conditions for interaction. */
function isInteractive(tile: MapTile): boolean {
  if (tile.char === ' ' || tile.revealed === 0) {
    return false;
  }
  if ((tile.char >= 'A' && tile.char <= 'Z') || (tile.char >= 'a' && tile.char <= 'z')) {
    return true;
  }
  // May expand to the left as long as there is space at the end of the line...
  if (tile.char === '.') {
    // May expand as long as there is empty space at the end of any pipe.
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      if (gameMap[r][c].char === ' ') {
        return true;
      }
      if (gameMap[r][c].char !== '.') {
        break;
      }
      c--;
    }
  }
  if (tile.revealed === 1) {
    return true;
  }
  if (tile.char === '+' ) {
    // May expand as long as there is empty space at the end of any pipe.
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      if (gameMap[r][c].char === ' ') {
        return true;
      }
      if (gameMap[r][c].char !== '-') {
        break;
      }
      c--;
    }
    // Go right
    c = tile.col + 1;
    while (c < MAP_COLS) {
      if (gameMap[r][c].char === ' ') {
        return true;
      }
      if (gameMap[r][c].char !== '-') {
        break;
      }
      c++;
    }
    // Go up
    r = tile.row - 1;
    c = tile.col;
    while (r >= 0) {
      if (gameMap[r][c].char === ' ') {
        return true;
      }
      if (gameMap[r][c].char !== '|') {
        break;
      }
      r--;
    }
    // Go down
    r = tile.row + 1;
    while (r < MAP_ROWS) {
      if (gameMap[r][c].char === ' ') {
        return true;
      }
      if (gameMap[r][c].char !== '|') {
        break;
      }
      r++;
    }
    return false;
  }
  if (tile.char.match(/\d/)) {
    // Works if has any non-empty neighbours.
    return getNeighboursAsArray(tile).filter(t => t.char !== ' ').length > 0;
  }
  return false;
}

/** Returns true if the coordinate is in bounds and contains the char */
function coordsContainsChar(r: number, c: number, char: string): boolean {
  if (!isInMapBounds(r, c)) {
    return false;
  }
  return gameMap[r][c].char === char;
}

/** Whether or not the coordinate is in bounds */
function isInMapBounds(r: number, c: number) {
  if (r < 0 ||  r >= MAP_ROWS || c < 0 || c >= MAP_COLS) {
    return false;
  }
  return true;
}

// Checks if a coordinate on the map is clear
function isClear(r: number, c: number) {
  return coordsContainsChar(r, c, ' ');
}

/** Get the neighbours of a map tile as an object. 4 of them, maybe null. */
function getNeighbours(tile: MapTile) {
  const left = isInMapBounds(tile.row, tile.col - 1) ? gameMap[tile.row][tile.col - 1] : null;
  const right = isInMapBounds(tile.row, tile.col + 1) ? gameMap[tile.row][tile.col + 1] : null;
  const up = isInMapBounds(tile.row + 1, tile.col) ? gameMap[tile.row + 1][tile.col] : null;
  const down = isInMapBounds(tile.row - 1, tile.col) ? gameMap[tile.row - 1][tile.col] : null;
  return {
    left, right, up, down,
  };
}

/** Get the neighbours of a map tile. Up to 4 f them. */
function getNeighboursAsArray(tile: MapTile) {
  const left = isInMapBounds(tile.row, tile.col - 1) ? gameMap[tile.row][tile.col - 1] : null;
  const right = isInMapBounds(tile.row, tile.col + 1) ? gameMap[tile.row][tile.col + 1] : null;
  const up = isInMapBounds(tile.row + 1, tile.col) ? gameMap[tile.row + 1][tile.col] : null;
  const down = isInMapBounds(tile.row - 1, tile.col) ? gameMap[tile.row - 1][tile.col] : null;
  const arr: MapTile[] = [];
  if (left) { arr.push(left); }
  if (right) { arr.push(right); }
  if (up) { arr.push(up); }
  if (down) { arr.push(down); }
  return arr;
}

/**
 * Deactivate all the beacons on the map with number equal to beaconNum.
 * And reveal all the beacons on the map with number equal to beaconNum + 1.
 */
function destroyAndRevealBeacons(beaconNum: number): void {
  const toDestroy = String(beaconNum);
  const toReveal = String(beaconNum + 1);
  for (const row of gameMap) {
    for (const tile of row) {
      if (tile.char === toReveal) {
        tile.revealed = 2;
      } else if (tile.char === toDestroy) {
        tile.char = ' ';
      }
    }
  }
  // Extra code to make the powers container appear
  const powersContainer = document.getElementById('powers-container');
  if (powersContainer.classList.contains('invisible')) {
    powersContainer.classList.remove('invisible');
    powersContainer.scrollIntoView({behavior: 'smooth'});
  }
}

/** Power: remove all pipes from the map */
export function removeAllPipes(): void {
  if (powerLevel < 1) {
    console.error('Must have power level at least 1');
    return;
  }
  for (const row of gameMap) {
    for (const tile of row) {
      if (tile.char === '-' || tile.char === '|') {
        tile.char = ' ';
      }
    }
  }
  updateMap();
}
