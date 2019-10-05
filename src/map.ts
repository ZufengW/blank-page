
/** The world map. Everything starts hidden except for the first sentence. */
const MAP_SCHEMATIC = [
  '    #######################################################################',
  '                                              #                            ',
  '# + T... page is intentionally left blank. #  +#                          #',
  '#                                                                          ',
  '#        *                                                                 ',
  '                                                                           ',
  '#          1                                                               ',
  '# +           +  # #  #                       +#                           ',
  '                                              #                            ',
  '2            .                                                             ',
  '              # #                                                          ',
  '  #                                                                        ',
  '                                                                           ',
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
    }
    map.push(mapRow);
  }
  // TODO: click events added to all the spans...

  // Reveal the first part of the map
  for (let i = 3; i < 42; i++) {
    map[2][i].revealed = 2;
  }

  return map;
}

initRenderMap(document.getElementById('game-pre') as HTMLPreElement);
export const gameMap = setupMapPre();
let starsCollected = 0;

/** Updates the visibility of the entire map. */
export function updateMap(): void {
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
      updateSpan(tile);
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
function onSpanClick(r: number, c: number): void {
  console.log('span clicked', r, c);

  // TODO: behaviour depends on what the character is
  const tile = gameMap[r][c];
  if (!isInteractive(tile)) {
    return;
  }
  // Uppercase becomes lowercase.
  if (tile.char >= 'A' && tile.char <= 'Z') {
    tile.char = tile.char.toLowerCase();
    updateMap();
    return;
  }

  // Lowercase disappears.
  if (tile.char >= 'a' && tile.char <= 'z') {
    tile.char = ' ';
    updateMap();  // map because this tile becomes empty
    return;
  }

  // Expands to the left
  if (tile.char === '.') {
    // updateSpan(tile);
    const leftTile = gameMap[tile.row][tile.col - 1];
    leftTile.char = '.';
    updateMap();
    return;
  }
  if (tile.revealed === 1) {  // May click ?
    tile.revealed = 2;
    updateMap();
    return;
  }
  if (tile.char === '+') {
    // neighbouring non-empty tiles become - and |
    const n = getNeighbours(tile);
    if (n.left && n.left.char === ' ') {
      n.left.char = '-';
    }
    if (n.right && n.right.char === ' ') {
      n.right.char = '-';
    }
    if (n.up && n.up.char === ' ') {
      n.up.char = '|';
    }
    if (n.down && n.down.char === ' ') {
      n.down.char = '|';
    }
    updateMap();
    return;
  }
  // Expands up and down
  if (tile.char === '|') {
    const n = getNeighbours(tile);
    if (n.up && n.up.char === ' ') {
      n.up.char = '|';
    }
    if (n.down && n.down.char === ' ') {
      n.down.char = '|';
    }
    updateMap();
    return;
  }
  // Expands left and right
  if (tile.char === '-') {
    const n = getNeighbours(tile);
    if (n.left && n.left.char === ' ') {
      n.left.char = '-';
    }
    if (n.right && n.right.char === ' ') {
      n.right.char = '-';
    }
    updateMap();
    return;
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
  // . expands to the left if there is space.
  if (tile.char === '.') {
    if (isClear(tile.row, tile.col - 1)) {
      return true;
    }
  }
  if (tile.revealed === 1) {
    return true;
  }
  if (tile.char === '+' ) {
    // Works if has any empty neighbours. Need to expand outward for pipes.
    return getNeighboursAsArray(tile).filter(t => t.char === ' ').length > 0;
  }
  if (tile.char === '|' ) {
    // Works if has any empty up/down neighbours
    const {up, down} = getNeighbours(tile);
    return (up && up.char === ' ') || (down && down.char === ' ');
  }
  if (tile.char === '-' ) {
    // Works if has any empty left/right neighbours
    const {left, right} = getNeighbours(tile);
    return (left && left.char === ' ') || (right && right.char === ' ');
  }
  if (tile.char === '*' ) {
    return true;  // Can simply collect it.
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
