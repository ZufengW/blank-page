import {getPower2Checked, getPowerLevel, setPowerLevel} from './powers';

/** The world map. Everything starts hidden except for the first sentence. */
const MAP_SCHEMATIC = [
  '            0 4                                                            ',
  '          4    #             0                .                            ',  // Leftmost needs to be blocked
  '               +              +          5 #                               ',  // Need . and slider to block middle +.
  '                                          0                                ',
  '# + This.page is intentionally left blank. #   #                          #',
  '                                                                           ',
  '4          +                 +            +                                ',  // Leftmost +: need up 2, down 3. Extend 3 more.
  '               #                                                           ',
  '# +     1     +   #   #     #                  #                           ',  // 2nd +: must expand exactly twice to reach 4.
  '                                              #                            ',
  '3      2     .                                                             ',
  '            #     +   #                                                    ',
  '  #     # 4    +    #       ###                                            ',
  '            0 #    2                                                       ',
  '          #      +                                                         ',
  '     # $ #        #   3                                                    ',
  '           #     #                                                         ',
  '       #        3                                                          ',
  '               #                                                           ',
  '                                                                           ',
  '                                                                           ',
  '                                                                           ',
];

/** Visibility of a tile */
enum VIS {
  HIDDEN,
  FAINT,
  QUESTION,
  VISIBLE,
}

interface MapTile {
  /** Whether or not this tile is revealed to the player.
   * 0: not revealed; 1: question mark; 2: revealed
   */
  revealed: VIS;
  /** The character currently occupying this tile. */
  char: string;
  /** Reference to the tile in the DOM. */
  span: HTMLSpanElement;
  /** Row in the map */
  row: number;
  /** Col in the map */
  col: number;
}

/** For storing a bunch of references to beacons */
interface BeaconsGroup { tiles: MapTile[]; numActive: number; }
type BeaconsType = BeaconsGroup[];

const MAP_ROWS = MAP_SCHEMATIC.length;
/** Number of columns in the map. */
const MAP_COLS = MAP_SCHEMATIC[0].length;

/** Classnames */
const INTERACTIVE = 'interactive';
const ANTI_BEACON = 'anti-beacon';
const LOW_BEACON = 'low-beacon';
const MED_BEACON = 'med-beacon';
const HIGH_BEACON = 'high-beacon';

/** Regex to match characters in the initial sentence */
const WORD_MATCHER = /[Ta-z]/;
/** Regex to match beacon symbols 0-9 */
const BEACON_MATCHER = /\d/;

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
function setupMapPre(): {map: MapTile[][], beacons: BeaconsType} {
  const map: MapTile[][] = [];
  // Also get references to just the beacons.
  const b: BeaconsGroup[] = [
    {tiles: [], numActive: 0},
    {tiles: [], numActive: 0},
    {tiles: [], numActive: 0},
    {tiles: [], numActive: 0},
    {tiles: [], numActive: 0},
    {tiles: [], numActive: 0},
  ];

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
      if (mapTile.char.match(BEACON_MATCHER)) {
        b[mapTile.char].tiles.push(mapTile);
        span.classList.add('beacon');
      }
    }
    map.push(mapRow);
  }

  // Reveal the first part of the map: the first sentence
  for (let i = 3; i < 42; i++) {
    map[4][i].revealed = VIS.VISIBLE;
  }

  return {map, beacons: b};
}

initRenderMap(document.getElementById('game-pre') as HTMLPreElement);
export const {map: gameMap, beacons} = setupMapPre();
console.log(beacons);
let starsCollected = 0;

/** Updates the visibility of the entire map. */
export function updateMap(): void {
  // Reset the beacon counts in preparation for recounting.
  for (const group of Object.values(beacons)) {
    group.numActive = 0;
  }

  for (const row of gameMap) {
    for (const tile of row) {
      // Check if any tiles need to be promoted in visibility.
      if (tile.revealed === VIS.HIDDEN) {
        // Check if should be revealed? When next to a visible and active char
        if (hasVisibleNeighbour(tile)) {
          // Empty tiles and 0-beacons get fully revealed immediately.
          // Other non-empty tiles get ?
          tile.revealed = (tile.char === ' ' || tile.char === '0')
            ? VIS.VISIBLE
            : VIS.QUESTION;
        } else if (getPowerLevel() > 0 && hasVisibleNeighbour(tile, 2)) {
          // With Perception +, may check distance 2
          if (tile.char === ' ' || tile.char === '0') {
            tile.revealed = VIS.VISIBLE;  // Reveal some tiles immediately.
          } else {
            tile.revealed = VIS.FAINT;
            tile.span.classList.add('faint');
          }
        }
      } else if (tile.revealed === VIS.FAINT && hasVisibleNeighbour(tile)) {
        // Go from faint to question or visible
        tile.revealed = (tile.char === ' ' || tile.char === '0')
          ? VIS.VISIBLE
          : VIS.QUESTION;
        tile.span.classList.remove('faint');
      }

      // Update the appearance of the tiles
      if (tile.revealed === VIS.HIDDEN) {
        // Hidden tiles display as empty.
        tile.span.innerHTML = ' ';
      } else if (tile.revealed === VIS.FAINT) {
        // Unknown tiles display as '?'
        tile.span.innerHTML = '?';
      } else if (tile.revealed === VIS.QUESTION) {
        // Unknown tiles display as '?'
        tile.span.innerHTML = '?';
        tile.span.classList.add(INTERACTIVE);
      } else {
        // Revealed tiles display as normal.
        updateSpan(tile);
        // Count activated beacons. Only activated if has the char and neighbour.
        if (tile.char.match(BEACON_MATCHER) && hasVisibleNeighbour(tile)) {
          beacons[tile.char].numActive++;
        }
      }
    }
  }
  updateBeacons();
}

/** Updates just one span on the map. */
function updateSpan(tile: MapTile) {
  tile.span.innerHTML = tile.char;
  // If interactable, use different mouse hover.
  if (isInteractive(tile)) {
    tile.span.classList.add(INTERACTIVE);
  } else {
    tile.span.classList.remove(INTERACTIVE);
  }
}

/** Updates the styles of the beacons */
function updateBeacons() {
  // Zero group (anti-beacons) overrides all. Makes all beacons highlight.
  if (beacons[0].numActive > 0) {
    for (const group of beacons) {
      for (const tile of group.tiles) {
        if (tile.revealed === VIS.VISIBLE && tile.char.match(BEACON_MATCHER)) {
          tile.span.classList.add(ANTI_BEACON);
          tile.span.classList.remove(LOW_BEACON, MED_BEACON, HIGH_BEACON);
        }
      }
    }
    return;
  } else {
    // Deactiate the zero beacons
    for (const tile of beacons[0].tiles) {
      tile.span.classList.remove(ANTI_BEACON);
    }
  }

  for (let i = 1; i < beacons.length; i++) {
    const group = beacons[i];
    // If entire group active, highlight them all and make active.
    if (group.numActive === group.tiles.length) {
      for (const tile of group.tiles) {
        if (tile.revealed === VIS.VISIBLE) {
          tile.span.classList.add(HIGH_BEACON, INTERACTIVE);
          tile.span.classList.remove(LOW_BEACON, MED_BEACON, ANTI_BEACON);
        }
      }
      continue;
    }
    // Otherwise highlight them depending on whether they are active
    for (const tile of group.tiles) {
      // Also need to check that the beacon is still there...
      if (tile.revealed === VIS.VISIBLE && tile.char === String(i)) {
        if (hasVisibleNeighbour(tile)) {
          tile.span.classList.add(MED_BEACON);
          tile.span.classList.remove(ANTI_BEACON, LOW_BEACON, HIGH_BEACON);
        } else {
          tile.span.classList.add(LOW_BEACON);
          tile.span.classList.remove(ANTI_BEACON, MED_BEACON, HIGH_BEACON);
        }
      } else {
        // Invisible or deactivated beacon tile
        tile.span.classList.remove(ANTI_BEACON, LOW_BEACON, MED_BEACON, HIGH_BEACON);
      }
    }
  }
}

/**
 * Returns whether or not at least one of the 4 neighbours
 * is visible and non-empty.
 *
 * @param dist distance from middle
 */
function hasVisibleNeighbour(tile: MapTile, dist = 1): boolean {
  const neighbours = getNeighboursAsArray(tile, dist);
  for (const n of neighbours) {
    if (n.revealed === VIS.VISIBLE && n.char !== ' ') {
      return true;
    }
  }
  return false;
}

/**
 * Handler for when a span is clicked.
 *
 * @param r row index
 * @param c col index
 */
function onSpanClick(row: number, col: number): void {
  const tile = gameMap[row][col];
  console.log('span clicked', row, col, tile);

  if (tile.revealed === VIS.QUESTION) {  // May click '?' to reveal it
    tile.revealed = VIS.VISIBLE;
    updateMap();
    return;
  }
  if (!isInteractive(tile)) {
    return;
  }
  // Initial words disappear when clicked.
  // Hacky optimisation: short-circuit if power level indicates progress beyond.
  if (getPowerLevel() < 1 && tile.char.match(WORD_MATCHER)) {
    // To be less tedious, also removes contiguous lowercase characters.
    tile.char = ' ';
    let r = 0;
    let c = 0;
    // Go left
    r = tile.row;
    c = tile.col - 1;
    while (c >= 0) {
      const currTile = gameMap[r][c];
      if (!(currTile.char.match(WORD_MATCHER))) { break; }
      currTile.char = ' ';
      c--;
    }
    // Go right
    c = tile.col + 1;
    while (c < MAP_COLS) {
      const currTile = gameMap[r][c];
      if (!(currTile.char.match(WORD_MATCHER))) { break; }
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
    if (getPower2Checked()) {
      c = tile.col;
      while (c >= 0) {
        // If the tile on the left is not . or out of bounds, may retract.
        if (gameMap[r][c - 1].char !== '.' || c - 1 < 0) {
          gameMap[r][c].char = ' ';
          return updateMap();
        }
        c--;
      }
    }
    while (c >= 0) {
      if (gameMap[r][c].char === ' ') {
        gameMap[r][c].char = '.';
        return updateMap();
      }
      if (gameMap[r][c].char !== '.') { break; }
      c--;
    }
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
  if (tile.char.match(BEACON_MATCHER)) {
    if (tile.span.classList.contains(HIGH_BEACON)) {
      const numBeaconsActive = parseInt(tile.char, 10);
      console.log('Activate beacon', tile.char);
      setPowerLevel(numBeaconsActive);
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
  if (tile.char === ' ' || tile.revealed === VIS.HIDDEN || tile.revealed === VIS.FAINT) {
    return false;
  }
  if (getPowerLevel() < 1 && tile.char.match(WORD_MATCHER)) {
    return true;  // Matches the initial sentence.
  }
  // May expand to the left as long as there is space at the end of the line...
  if (tile.char === '.') {
    // May expand as long as there is empty space at the end of any pipe.
    let r = tile.row;
    let c = tile.col;
    if (getPower2Checked()) {
      //  May retract as long as there is a dot on the left.
      return isInMapBounds(r, c - 1) && (gameMap[r][c - 1].char === '.');
    }
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
  if (tile.revealed === VIS.QUESTION) {
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
  if (tile.char.match(BEACON_MATCHER)) {
    // See logic in: updateBeacons
    return (tile.span.classList.contains(HIGH_BEACON));
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

/**
 * Get an array the neighbours of a map tile. Up to four of them.
 *
 * @param tile middle tile to get the neighbours of
 * @param dist distance from the middle tile (default 1)
 */
function getNeighboursAsArray(tile: MapTile, dist = 1) {
  const left = isInMapBounds(tile.row, tile.col - dist) ? gameMap[tile.row][tile.col - dist] : null;
  const right = isInMapBounds(tile.row, tile.col + dist) ? gameMap[tile.row][tile.col + dist] : null;
  const up = isInMapBounds(tile.row + dist, tile.col) ? gameMap[tile.row + dist][tile.col] : null;
  const down = isInMapBounds(tile.row - dist, tile.col) ? gameMap[tile.row - dist][tile.col] : null;
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
        tile.revealed = VIS.VISIBLE;
        tile.span.classList.remove('faint');
      } else if (tile.char === toDestroy) {
        tile.char = ' ';
      }
    }
  }
}

/** Power: remove all pipes from the map */
export function removeAllPipes(): void {
  if (getPowerLevel() < 1) {
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
