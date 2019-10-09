/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/loot.ts":
/*!*********************!*\
  !*** ./src/loot.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var powers_1 = __webpack_require__(/*! ./powers */ "./src/powers.ts");
var currencyCollected = 0;
/** Index of next trophy. */
var nextTrophy = 0;
exports.MAX_CURRENCY = 1000;
var containerDiv = document.getElementById('trophy-container');
var moneyDisplay = document.getElementById('money-display');
var trophyDiv = document.getElementById('trophy-case');
var nextTrophyPre = document.getElementById('trophy-next');
// Need to escape the backslashes though
var TROPHIES = [
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
for (var _i = 0, TROPHIES_1 = TROPHIES; _i < TROPHIES_1.length; _i++) {
    var t = TROPHIES_1[_i];
    if (t.design.length !== 8) {
        console.error('T has incorrect height', t);
    }
}
/** Add 1 to currency. Updates the trophies. */
function addCurrency() {
    containerDiv.classList.remove('invisible');
    currencyCollected += 100;
    moneyDisplay.textContent = "Money: $" + currencyCollected;
    if (TROPHIES[nextTrophy].cost <= currencyCollected) {
        // Can display the next trophy
        trophyDiv.appendChild(trophyToHtml(TROPHIES[nextTrophy].design));
        trophyDiv.scrollIntoView({ behavior: 'smooth' });
        nextTrophy++;
        if (nextTrophy < TROPHIES.length) {
            // Update the message
            nextTrophyPre.innerHTML = "\n\n\n Next: $" + TROPHIES[nextTrophy].cost + " \n\n\n";
        }
        else {
            // No more trophies.
            nextTrophyPre.innerHTML = "\n\n\n FOUND \n THEM \n ALL \n\n\n";
        }
    }
    checkCompletion();
}
exports.addCurrency = addCurrency;
function trophyToHtml(design) {
    var pre = document.createElement('pre');
    pre.innerHTML = design.join('\n');
    pre.classList.add('trophy');
    return pre;
}
/** Check completionist: have max power level and all trophies */
function checkCompletion() {
    if (powers_1.getPowerLevel() === powers_1.MAX_POWER_LEVEL
        && currencyCollected === exports.MAX_CURRENCY) {
        var p = document.getElementById('completionist');
        if (p.textContent.length > 0) {
            return;
        }
        p.textContent = '100% Completion! You win! Thanks for playing.';
        p.scrollIntoView({ behavior: 'smooth' });
    }
}
exports.checkCompletion = checkCompletion;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = __webpack_require__(/*! ./map */ "./src/map.ts");
var mapPre = document.getElementById('game-pre');
mapPre.style.opacity = '0';
map_1.updateMap();
// Page starts blank
var pageOpacityMultipler = 0;
document.addEventListener('click', handleClick);
function handleClick() {
    // Increase opacity until 1, then remove the event
    pageOpacityMultipler += 1;
    if (pageOpacityMultipler < 10) {
        // Not using floats here due to floating point imprecision
        mapPre.style.opacity = "." + pageOpacityMultipler;
    }
    else {
        mapPre.style.opacity = '1';
        document.removeEventListener('click', handleClick);
        map_1.setGameInteractable(true);
        map_1.updateMap();
    }
}
document.getElementById('power-2-button').addEventListener('click', function () {
    map_1.removeAllPipes();
});


/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var loot_1 = __webpack_require__(/*! ./loot */ "./src/loot.ts");
var powers_1 = __webpack_require__(/*! ./powers */ "./src/powers.ts");
/** The world map. Everything starts hidden except for the first sentence. */
var MAP_SCHEMATIC = [
    '@           0 4                              #  $ + 5 ',
    '          4    #             0          .     ## #   #',
    '               +              +          6 $ #      # ',
    '                                          0  #        ',
    '# + This page is intentionally left blank.            ',
    '                                              #       ',
    '4          +                 +            +    5      ',
    '               # #          ##                        ',
    '# +     1     +   #            0             # #      ',
    '                           #+                 #       ',
    '3      2     .                                       #',
    '            #     +   #                           #   ',
    '  #     # 4    +    #  #    5                         ',
    '            0 #    2                      $ #        #',
    '          #      +      # # 6 ### #$## ##        # # #',
    '     # $ #        #   3  # # #   0    #  # $ ####   6 ',
    '           #     # # #  #   #                     $   ',
    '       #        3 $ $ ##     +        #    +          ',
    ' #             # #   0   +     #                    6 ',
    '5 #####  # #### #                +    6   #           ',
    '           #         +       0                  ## $  ',
    '# 6     +   5 0 #     #    #           #              ',
];
/** Visibility of a tile */
var VIS;
(function (VIS) {
    VIS[VIS["HIDDEN"] = 0] = "HIDDEN";
    VIS[VIS["FAINT"] = 1] = "FAINT";
    VIS[VIS["QUESTION"] = 2] = "QUESTION";
    VIS[VIS["VISIBLE"] = 3] = "VISIBLE";
})(VIS || (VIS = {}));
var MAP_ROWS = MAP_SCHEMATIC.length;
/** Number of columns in the map. */
var MAP_COLS = MAP_SCHEMATIC[0].length;
/** Classnames */
var INTERACTIVE = 'interactive';
var ANTI_BEACON = 'anti-beacon';
var LOW_BEACON = 'low-beacon';
var MED_BEACON = 'med-beacon';
var HIGH_BEACON = 'high-beacon';
/** Regex to match characters in the initial sentence */
var WORD_MATCHER = /[Ta-z]/;
/** Regex to match beacon symbols 0-9 */
var BEACON_MATCHER = /\d/;
/** Do this once to render the map initially */
function initRenderMap(pre) {
    // Starts empty
    var htmlString = '';
    for (var r = 0; r < MAP_ROWS; r++) {
        for (var c = 0; c < MAP_COLS; c++) {
            htmlString += "<span row=\"" + r + "\" col=\"" + c + "\"> </span>";
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
function setupMapPre() {
    var map = [];
    // Also get references to just the beacons.
    var b = [
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
        { tiles: [], numActive: 0 },
    ];
    // Also make a count of how many $
    var numMoney = 0;
    var _loop_1 = function (r) {
        var mapRow = [];
        var _loop_2 = function (c) {
            var span = document.querySelector("span[row=\"" + r + "\"][col=\"" + c + "\"]");
            var mapTile = {
                char: MAP_SCHEMATIC[r][c],
                revealed: 0,
                span: span,
                row: r,
                col: c,
            };
            mapRow.push(mapTile);
            if (mapTile.char === '$') {
                numMoney++;
            }
            span.onclick = function () {
                onSpanClick(r, c);
            };
            // Beacons (number digits) get a special class
            if (mapTile.char.match(BEACON_MATCHER)) {
                b[mapTile.char].tiles.push(mapTile);
                span.classList.add('beacon');
            }
        };
        for (var c = 0; c < MAP_COLS; c++) {
            _loop_2(c);
        }
        map.push(mapRow);
    };
    for (var r = 0; r < MAP_ROWS; r++) {
        _loop_1(r);
    }
    // Reveal the first part of the map: the first sentence
    for (var i = 3; i < 42; i++) {
        map[4][i].revealed = VIS.VISIBLE;
    }
    // Sanity check
    if (numMoney * 100 !== loot_1.MAX_CURRENCY) {
        console.error('Money mismatch', numMoney, loot_1.MAX_CURRENCY);
    }
    return { map: map, beacons: b };
}
initRenderMap(document.getElementById('game-pre'));
exports.gameMap = (_a = setupMapPre(), _a.map), exports.beacons = _a.beacons;
/** A reference to the current location of the slider */
var sliderTile = exports.gameMap[0][0];
/** Updates the visibility of the entire map. */
function updateMap() {
    // Reset the beacon counts in preparation for recounting.
    for (var _i = 0, _a = Object.values(exports.beacons); _i < _a.length; _i++) {
        var group = _a[_i];
        group.numActive = 0;
    }
    if (powers_1.getPowerLevel() >= powers_1.SLIDER_POWER_REQUIREMENT) {
        // Initialise the slider.
        sliderTile.revealed = VIS.VISIBLE;
        sliderTile.span.classList.remove('faint');
        sliderTile.span.classList.add('slider');
        updateSlider();
        updateSpan(sliderTile);
    }
    for (var _b = 0, gameMap_1 = exports.gameMap; _b < gameMap_1.length; _b++) {
        var row = gameMap_1[_b];
        for (var _c = 0, row_1 = row; _c < row_1.length; _c++) {
            var tile = row_1[_c];
            // Check if any tiles need to be promoted in visibility.
            if (tile.revealed === VIS.HIDDEN) {
                // Check if should be revealed? When next to a visible and active char
                if (hasVisibleNeighbour(tile)) {
                    // Empty tiles and 0-beacons get fully revealed immediately.
                    // Other non-empty tiles get ?
                    tile.revealed = (tile.char === ' ' || tile.char === '0')
                        ? VIS.VISIBLE
                        : VIS.QUESTION;
                }
                else if ((powers_1.getPowerLevel() > 0 && hasVisibleNeighbour(tile, 2))
                    || powers_1.getPowerLevel() >= 5) {
                    // With Perception +, may check distance 2.
                    // With Perception ++, can see the entire map faintly.
                    if (tile.char === ' ' || tile.char === '0') {
                        tile.revealed = VIS.VISIBLE; // Reveal some tiles immediately.
                    }
                    else {
                        tile.revealed = VIS.FAINT;
                        tile.span.classList.add('faint');
                    }
                }
            }
            else if (tile.revealed === VIS.FAINT && hasVisibleNeighbour(tile)) {
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
            }
            else if (tile.revealed === VIS.FAINT) {
                // Unknown tiles display as '?'
                tile.span.innerHTML = '?';
            }
            else if (tile.revealed === VIS.QUESTION) {
                // Unknown tiles display as '?'
                tile.span.innerHTML = '?';
                tile.span.classList.add(INTERACTIVE);
            }
            else {
                // Revealed tiles display as normal.
                updateSpan(tile);
                // Count activated beacons. Only activated if has the char and neighbour.
                if (tile.char.match(BEACON_MATCHER) && hasVisibleNeighbour(tile)) {
                    exports.beacons[tile.char].numActive++;
                }
            }
        }
    }
    updateBeacons();
}
exports.updateMap = updateMap;
/** Updates just one span on the map. */
function updateSpan(tile) {
    tile.span.innerHTML = tile.char;
    // If interactable, use different mouse hover.
    if (isInteractive(tile)) {
        tile.span.classList.add(INTERACTIVE);
    }
    else {
        tile.span.classList.remove(INTERACTIVE);
    }
}
/** Updates the styles of the beacons */
function updateBeacons() {
    // Zero group (anti-beacons) overrides all. Makes all beacons highlight.
    if (exports.beacons[0].numActive > 0) {
        for (var _i = 0, beacons_1 = exports.beacons; _i < beacons_1.length; _i++) {
            var group = beacons_1[_i];
            for (var _a = 0, _b = group.tiles; _a < _b.length; _a++) {
                var tile = _b[_a];
                if (tile.revealed === VIS.VISIBLE && tile.char.match(BEACON_MATCHER)) {
                    tile.span.classList.add(ANTI_BEACON);
                    tile.span.classList.remove(LOW_BEACON, MED_BEACON, HIGH_BEACON);
                }
            }
        }
        return;
    }
    else {
        // Deactiate the zero beacons
        for (var _c = 0, _d = exports.beacons[0].tiles; _c < _d.length; _c++) {
            var tile = _d[_c];
            tile.span.classList.remove(ANTI_BEACON);
        }
    }
    for (var i = 1; i < exports.beacons.length; i++) {
        var group = exports.beacons[i];
        // If entire group active, highlight them all and make active.
        if (group.numActive === group.tiles.length) {
            for (var _e = 0, _f = group.tiles; _e < _f.length; _e++) {
                var tile = _f[_e];
                if (tile.revealed === VIS.VISIBLE) {
                    tile.span.classList.add(HIGH_BEACON, INTERACTIVE);
                    tile.span.classList.remove(LOW_BEACON, MED_BEACON, ANTI_BEACON);
                }
            }
            continue;
        }
        // Otherwise highlight them depending on whether they are active
        for (var _g = 0, _h = group.tiles; _g < _h.length; _g++) {
            var tile = _h[_g];
            // Also need to check that the beacon is still there...
            if (tile.revealed === VIS.VISIBLE && tile.char === String(i)) {
                if (hasVisibleNeighbour(tile)) {
                    tile.span.classList.add(MED_BEACON);
                    tile.span.classList.remove(ANTI_BEACON, LOW_BEACON, HIGH_BEACON);
                }
                else {
                    tile.span.classList.add(LOW_BEACON);
                    tile.span.classList.remove(ANTI_BEACON, MED_BEACON, HIGH_BEACON);
                }
            }
            else {
                // Invisible or deactivated beacon tile
                tile.span.classList.remove(ANTI_BEACON, LOW_BEACON, MED_BEACON, HIGH_BEACON);
            }
        }
    }
}
/**
 * Update the tiles around the slider.
 * Adds NSEW and makes neighbours visible.
 */
function updateSlider() {
    var _a = getNeighbours(sliderTile), left = _a.left, right = _a.right, up = _a.up, down = _a.down;
    if (up && isClear(up)) {
        up.span.innerHTML = up.char = 'N';
        up.span.classList.add(INTERACTIVE);
        up.revealed = VIS.VISIBLE;
    }
    if (down && isClear(down)) {
        down.span.innerHTML = down.char = 'S';
        down.span.classList.add(INTERACTIVE);
        down.revealed = VIS.VISIBLE;
    }
    if (right && isClear(right)) {
        right.span.innerHTML = right.char = 'E';
        right.span.classList.add(INTERACTIVE);
        right.revealed = VIS.VISIBLE;
    }
    if (left && isClear(left)) {
        left.span.innerHTML = left.char = 'W';
        left.span.classList.add(INTERACTIVE);
        left.revealed = VIS.VISIBLE;
    }
}
/** Changes the sliderTile to a new one. */
function setSliderTile(newTile) {
    // Updates styles on the old tile
    sliderTile.span.classList.remove('slider');
    sliderTile.char = ' ';
    // Clear the directions
    var _a = getNeighbours(sliderTile), left = _a.left, right = _a.right, up = _a.up, down = _a.down;
    if (up && up.char === 'N') {
        up.char = ' ';
    }
    if (down && down.char === 'S') {
        down.char = ' ';
    }
    if (right && right.char === 'E') {
        right.char = ' ';
    }
    if (left && left.char === 'W') {
        left.char = ' ';
    }
    newTile.span.classList.add('slider');
    newTile.char = '@';
    sliderTile = newTile;
}
/**
 * Returns whether or not at least one of the 4 neighbours
 * is visible and non-empty.
 *
 * @param dist distance from middle
 */
function hasVisibleNeighbour(tile, dist) {
    if (dist === void 0) { dist = 1; }
    var neighbours = getNeighboursAsArray(tile, dist);
    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {
        var n = neighbours_1[_i];
        if (n.revealed === VIS.VISIBLE && !isClear(n)) {
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
function onSpanClick(row, col) {
    var tile = exports.gameMap[row][col];
    if (tile.revealed === VIS.QUESTION) { // May click '?' to reveal it
        tile.revealed = VIS.VISIBLE;
        updateMap();
        return;
    }
    if (!isInteractive(tile)) {
        return;
    }
    // Initial words disappear when clicked.
    // Hacky optimisation: short-circuit if power level indicates progress beyond.
    if (powers_1.getPowerLevel() < 1 && tile.char.match(WORD_MATCHER)) {
        // To be less tedious, also removes contiguous lowercase characters.
        tile.char = ' ';
        var r = tile.row;
        var c = 0;
        // Go left
        c = tile.col - 1;
        while (c >= 0) {
            var currTile = exports.gameMap[r][c];
            if (!(currTile.char.match(WORD_MATCHER))) {
                break;
            }
            currTile.char = ' ';
            c--;
        }
        // Go right
        c = tile.col + 1;
        while (c < MAP_COLS) {
            var currTile = exports.gameMap[r][c];
            if (!(currTile.char.match(WORD_MATCHER))) {
                break;
            }
            currTile.char = ' ';
            c++;
        }
        return updateMap();
    }
    if (tile.char === '.') {
        var r = tile.row;
        var c = 0;
        if (powers_1.getPower2Checked()) {
            c = tile.col;
            while (c >= 0) {
                // If the tile on the left is not '.' (including out of bounds), may retract
                if (c - 1 < 0 || exports.gameMap[r][c - 1].char !== '.') {
                    exports.gameMap[r][c].char = ' ';
                    return updateMap();
                }
                c--;
            }
        }
        // May expand to the left as long as there is space at the end of the ...
        c = tile.col - 1;
        while (c >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                exports.gameMap[r][c].char = '.';
                return updateMap();
            }
            if (exports.gameMap[r][c].char !== '.') {
                break;
            }
            c--;
        }
    }
    if (tile.char === '+') {
        // May expand out as long as there is empty space at the end of any pipe.
        var r = 0;
        var c = 0;
        // Go left
        r = tile.row;
        c = tile.col - 1;
        while (c >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                exports.gameMap[r][c].char = '-';
                break;
            }
            if (exports.gameMap[r][c].char !== '-') {
                break;
            }
            c--;
        }
        // Go right
        c = tile.col + 1;
        while (c < MAP_COLS) {
            if (isClear(exports.gameMap[r][c])) {
                exports.gameMap[r][c].char = '-';
                break;
            }
            if (exports.gameMap[r][c].char !== '-') {
                break;
            }
            c++;
        }
        // Go up
        r = tile.row - 1;
        c = tile.col;
        while (r >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                exports.gameMap[r][c].char = '|';
                break;
            }
            if (exports.gameMap[r][c].char !== '|') {
                break;
            }
            r--;
        }
        // Go down
        r = tile.row + 1;
        while (r < MAP_ROWS) {
            if (isClear(exports.gameMap[r][c])) {
                exports.gameMap[r][c].char = '|';
                break;
            }
            if (exports.gameMap[r][c].char !== '|') {
                break;
            }
            r++;
        }
        return updateMap();
    }
    // If click on beacon, check if the others are all active...
    if (tile.char.match(BEACON_MATCHER)) {
        if (tile.span.classList.contains(HIGH_BEACON)) {
            var numBeaconsActive = parseInt(tile.char, 10);
            powers_1.setPowerLevel(numBeaconsActive);
            destroyAndRevealBeacons(numBeaconsActive);
        }
        return updateMap();
    }
    // Currency gets replaced with wall when collected.
    if (tile.char === '$') {
        loot_1.addCurrency();
        tile.char = '#';
        return updateMap();
    }
    if (tile.char === 'N') {
        // Move slider up until it hits something or runs out of space
        var r = sliderTile.row - 1;
        var c = sliderTile.col;
        while (r >= 0 && isClear(exports.gameMap[r][c])) {
            r--;
        }
        setSliderTile(exports.gameMap[r + 1][c]);
        return updateMap();
    }
    if (tile.char === 'S') {
        // Move slider down until it hits something or runs out of space
        var r = sliderTile.row + 1;
        var c = sliderTile.col;
        while (r < MAP_ROWS && isClear(exports.gameMap[r][c])) {
            r++;
        }
        setSliderTile(exports.gameMap[r - 1][c]);
        return updateMap();
    }
    if (tile.char === 'E') {
        // Move slider left until it hits something or runs out of space
        var r = sliderTile.row;
        var c = sliderTile.col + 1;
        while (c < MAP_COLS && isClear(exports.gameMap[r][c])) {
            c++;
        }
        setSliderTile(exports.gameMap[r][c - 1]);
        return updateMap();
    }
    if (tile.char === 'W') {
        // Move slider right until it hits something or runs out of space
        var r = sliderTile.row;
        var c = sliderTile.col - 1;
        while (c >= 0 && isClear(exports.gameMap[r][c])) {
            c--;
        }
        setSliderTile(exports.gameMap[r][c + 1]);
        return updateMap();
    }
}
/** Checks if a char is interactive -- i.e. satisfies the conditions for interaction. */
function isInteractive(tile) {
    if (!isGameInteractable) {
        return false;
    }
    // The slider's directions are interactive. (The slider itself isn't)
    if (tile.char.match(/[NSEW]/)) {
        return true;
    }
    // Other hidden and empty tiles are not interactive.
    if (tile.char === ' ' || tile.revealed === VIS.HIDDEN || tile.revealed === VIS.FAINT) {
        return false;
    }
    if (powers_1.getPowerLevel() < 1 && tile.char.match(WORD_MATCHER)) {
        return true; // Matches the initial sentence.
    }
    // May expand to the left as long as there is space at the end of the line...
    if (tile.char === '.') {
        // May expand as long as there is empty space at the end of any pipe.
        var r = tile.row;
        var c = tile.col;
        if (powers_1.getPower2Checked()) {
            //  May retract as long as there is a dot on the left.
            return isInMapBounds(r, c - 1) && (exports.gameMap[r][c - 1].char === '.');
        }
        // Go left
        r = tile.row;
        c = tile.col - 1;
        while (c >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                return true;
            }
            if (exports.gameMap[r][c].char !== '.') {
                break;
            }
            c--;
        }
    }
    if (tile.revealed === VIS.QUESTION) {
        return true;
    }
    if (tile.char === '$') {
        return true;
    }
    if (tile.char === '+') {
        // May expand as long as there is empty space at the end of any pipe.
        var r = 0;
        var c = 0;
        // Go left
        r = tile.row;
        c = tile.col - 1;
        while (c >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                return true;
            }
            if (exports.gameMap[r][c].char !== '-') {
                break;
            }
            c--;
        }
        // Go right
        c = tile.col + 1;
        while (c < MAP_COLS) {
            if (isClear(exports.gameMap[r][c])) {
                return true;
            }
            if (exports.gameMap[r][c].char !== '-') {
                break;
            }
            c++;
        }
        // Go up
        r = tile.row - 1;
        c = tile.col;
        while (r >= 0) {
            if (isClear(exports.gameMap[r][c])) {
                return true;
            }
            if (exports.gameMap[r][c].char !== '|') {
                break;
            }
            r--;
        }
        // Go down
        r = tile.row + 1;
        while (r < MAP_ROWS) {
            if (isClear(exports.gameMap[r][c])) {
                return true;
            }
            if (exports.gameMap[r][c].char !== '|') {
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
function coordsContainsChar(r, c, char) {
    if (!isInMapBounds(r, c)) {
        return false;
    }
    return exports.gameMap[r][c].char === char;
}
/** Whether or not the coordinate is in bounds */
function isInMapBounds(r, c) {
    if (r < 0 || r >= MAP_ROWS || c < 0 || c >= MAP_COLS) {
        return false;
    }
    return true;
}
/** Checks if a tile on the map is clear of obstacles */
function isClear(tile) {
    return (tile.char.match(/[ NSEW]/));
}
/** Get the neighbours of a map tile as an object. 4 of them, maybe null. */
function getNeighbours(tile) {
    var left = isInMapBounds(tile.row, tile.col - 1) ? exports.gameMap[tile.row][tile.col - 1] : null;
    var right = isInMapBounds(tile.row, tile.col + 1) ? exports.gameMap[tile.row][tile.col + 1] : null;
    var down = isInMapBounds(tile.row + 1, tile.col) ? exports.gameMap[tile.row + 1][tile.col] : null;
    var up = isInMapBounds(tile.row - 1, tile.col) ? exports.gameMap[tile.row - 1][tile.col] : null;
    return {
        left: left, right: right, up: up, down: down,
    };
}
/**
 * Get an array the neighbours of a map tile. Up to four of them.
 *
 * @param tile middle tile to get the neighbours of
 * @param dist distance from the middle tile (default 1)
 */
function getNeighboursAsArray(tile, dist) {
    if (dist === void 0) { dist = 1; }
    var left = isInMapBounds(tile.row, tile.col - dist) ? exports.gameMap[tile.row][tile.col - dist] : null;
    var right = isInMapBounds(tile.row, tile.col + dist) ? exports.gameMap[tile.row][tile.col + dist] : null;
    var down = isInMapBounds(tile.row + dist, tile.col) ? exports.gameMap[tile.row + dist][tile.col] : null;
    var up = isInMapBounds(tile.row - dist, tile.col) ? exports.gameMap[tile.row - dist][tile.col] : null;
    var arr = [];
    if (left) {
        arr.push(left);
    }
    if (right) {
        arr.push(right);
    }
    if (up) {
        arr.push(up);
    }
    if (down) {
        arr.push(down);
    }
    return arr;
}
/**
 * Deactivate all the beacons on the map with number equal to beaconNum.
 * And reveal all the beacons on the map with number equal to beaconNum + 1.
 */
function destroyAndRevealBeacons(beaconNum) {
    var toDestroy = String(beaconNum);
    var toReveal = String(beaconNum + 1);
    for (var _i = 0, gameMap_2 = exports.gameMap; _i < gameMap_2.length; _i++) {
        var row = gameMap_2[_i];
        for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {
            var tile = row_2[_a];
            if (tile.char === toReveal) {
                tile.revealed = VIS.VISIBLE;
                tile.span.classList.remove('faint');
            }
            else if (tile.char === toDestroy) {
                tile.char = ' ';
            }
        }
    }
}
/** Power: remove all pipes from the map */
function removeAllPipes() {
    if (powers_1.getPowerLevel() < 1) {
        console.error('Must have power level at least 1');
        return;
    }
    for (var _i = 0, gameMap_3 = exports.gameMap; _i < gameMap_3.length; _i++) {
        var row = gameMap_3[_i];
        for (var _a = 0, row_3 = row; _a < row_3.length; _a++) {
            var tile = row_3[_a];
            if (tile.char === '-' || tile.char === '|') {
                tile.char = ' ';
            }
        }
    }
    updateMap();
}
exports.removeAllPipes = removeAllPipes;
var isGameInteractable = false;
/** Master switch to control if the pre can be interacted with. */
function setGameInteractable(value) {
    isGameInteractable = value;
}
exports.setGameInteractable = setGameInteractable;


/***/ }),

/***/ "./src/powers.ts":
/*!***********************!*\
  !*** ./src/powers.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var loot_1 = __webpack_require__(/*! ./loot */ "./src/loot.ts");
var map_1 = __webpack_require__(/*! ./map */ "./src/map.ts");
// For dealing with the powers elements
var powersContainer = document.getElementById('powers-container');
var power3Check = document.getElementById('power-3-check');
/** Classname */
var INVISIBLE = 'invisible';
/** Power level required to use slider */
exports.SLIDER_POWER_REQUIREMENT = 4;
exports.MAX_POWER_LEVEL = 6;
var powerLevel = 0;
/** Sets the power level and updates the DOM elements. */
function setPowerLevel(newPowerLevel) {
    // Extra code to make the powers container appear
    if (powersContainer.classList.contains(INVISIBLE)) {
        powersContainer.classList.remove(INVISIBLE);
        powersContainer.scrollIntoView({ behavior: 'smooth' });
    }
    powerLevel = newPowerLevel;
    // Make parts of the container appear
    for (var p = 1; p <= newPowerLevel; p++) {
        var li = document.getElementById("power-" + newPowerLevel + "-li");
        if (!li) {
            // Must already have all the powers.
            console.log('No more powers');
            return;
        }
        if (li.classList.contains(INVISIBLE)) {
            li.classList.remove(INVISIBLE);
        }
    }
    loot_1.checkCompletion();
}
exports.setPowerLevel = setPowerLevel;
/** Gets the current power level */
function getPowerLevel() {
    return powerLevel;
}
exports.getPowerLevel = getPowerLevel;
/** Power 2: ability to retract dots */
function getPower2Checked() {
    return power3Check.checked;
}
exports.getPower2Checked = getPower2Checked;
power3Check.addEventListener('change', function () {
    map_1.updateMap();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvb3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG93ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxzRUFBMEQ7QUFFMUQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7QUFDMUIsNEJBQTRCO0FBQzVCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUVOLG9CQUFZLEdBQUcsSUFBSSxDQUFDO0FBRWpDLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqRSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUs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LEVBQUUsSUFBUTtJQUFSLCtCQUFRO0lBQ25ELElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xHLElBQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25HLElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xHLElBQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hHLElBQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQztJQUMxQixJQUFJLElBQUksRUFBRTtRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FBRTtJQUM3QixJQUFJLEtBQUssRUFBRTtRQUFFLEdBQUcsQ0FBQyxJ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RUFBQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxVQUFVLEdBQUcsYUFBYSxDQUFDO0lBRTNCLHFDQUFxQztJQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBUyxhQUFhLFFBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxvQ0FBb0M7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlCLE9BQU87U0FDUjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEM7S0FDRjtJQUNELHNCQUFlLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBdEJELHNDQXNCQztBQUVELG1DQUFtQztBQUNuQyxTQUFnQixhQUFhO0lBQzNCLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFGRCxzQ0FFQztBQUVELHVDQUF1QztBQUN2QyxTQUFnQixnQkFBZ0I7SUFDOUIsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDO0FBQzdCLENBQUM7QUFGRCw0Q0FFQztBQUVELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDckMsZUFBUyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImltcG9ydCB7IGdldFBvd2VyTGV2ZWwsIE1BWF9QT1dFUl9MRVZFTCB9IGZyb20gJy4vcG93ZXJzJztcblxubGV0IGN1cnJlbmN5Q29sbGVjdGVkID0gMDtcbi8qKiBJbmRleCBvZiBuZXh0IHRyb3BoeS4gKi9cbmxldCBuZXh0VHJvcGh5ID0gMDtcblxuZXhwb3J0IGNvbnN0IE1BWF9DVVJSRU5DWSA9IDEwMDA7XG5cbmNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cm9waHktY29udGFpbmVyJyk7XG5jb25zdCBtb25leURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9uZXktZGlzcGxheScpO1xuY29uc3QgdHJvcGh5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Ryb3BoeS1jYXNlJyk7XG5jb25zdCBuZXh0VHJvcGh5UHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Ryb3BoeS1uZXh0Jyk7XG5cbi8vIE5lZWQgdG8gZXNjYXBlIHRoZSBiYWNrc2xhc2hlcyB0aG91Z2hcbmNvbnN0IFRST1BISUVTID0gW1xuICB7XG4gICAgZGVzaWduOiBbXG4gICAgICAnICAgICAnLFxuICAgICAgJyAgICAgJyxcbiAgICAgICcgICAgICcsXG4gICAgICAnICAgICAnLFxuICAgICAgJyAgICAgJyxcbiAgICAgICcgIF8gICcsXG4gICAgICAnIHsxfSAnLFxuICAgICAgJyAgXCIgICcsXG4gICAgXSxcbiAgICBjb3N0OiAxMDAsXG4gIH0sXG4gIHtcbiAgICBkZXNpZ246IFtcbiAgICAgICcgICAgICcsXG4gICAgICAnICAgICAnLFxuICAgICAgJyAgICAgJyxcbiAgICAgICcgICAgICcsXG4gICAgICAnICBfICAnLFxuICAgICAgJyAvPVxcXFwgJyxcbiAgICAgICcgXFxcXFwiLyAnLFxuICAgICAgJyAvX1xcXFwgJyxcbiAgICBdLFxuICAgIGNvc3Q6IDIwMCxcbiAgfSxcbiAge1xuICAgIGRlc2lnbjogW1xuICAgICAgJyAgICAgICAnLFxuICAgICAgJyAgICAgICAnLFxuICAgICAgJyAgICAgICAnLFxuICAgICAgJyAgLy1cXFxcICAnLFxuICAgICAgJyBbXFxcXF8vXSAnLFxuICAgICAgJyAgXFxcXCAvICAnLFxuICAgICAgJyAgfDR8ICAnLFxuICAgICAgJyAgW19dICAnLFxuICAgIF0sXG4gICAgY29zdDogNDAwLFxuICB9LFxuICB7XG4gICAgZGVzaWduOiBbXG4gICAgICAnICAgICAgICAgICcsXG4gICAgICAnICAgICAgICAgICcsXG4gICAgICAnICAgX19fXyAgICcsXG4gICAgICAnIC98IC4uIHxcXFxcICcsXG4gICAgICAnIFxcXFx8IC4uIHwvICcsXG4gICAgICAnICBcXFxcICAgIC8gICcsXG4gICAgICAnICAgfF9ffCAgICcsXG4gICAgICAnICAvX19fX1xcXFwgICcsXG4gICAgXSxcbiAgICBjb3N0OiA2MDAsXG4gIH0sXG4gIHtcbiAgICBkZXNpZ246IFtcbiAgICAgICcgICAgIF9fICAgICAnLFxuICAgICAgJyAgIC9gICBcXFxcXFxcXCAgICcsXG4gICAgICAnICBfXFxcXF9fXy8vXyAgJyxcbiAgICAgICcgfCB8IExEIHwgfCAnLFxuICAgICAgJyAgXFxcXHwgNDUgfC8gICcsXG4gICAgICAnICAgXFxcXCAgICAvICAgJyxcbiAgICAgICcgICAgfF9ffCAgICAnLFxuICAgICAgJyAgIC9fX19fXFxcXCAgICcsXG4gICAgXSxcbiAgICBjb3N0OiA4MDAsXG4gIH0sXG4gIHtcbiAgICBkZXNpZ246IFtcbiAgICAgICcgICAvYGBgYFxcXFwgICAnLFxuICAgICAgJyAgLyAgL1xcXFwgIFxcXFwgICcsXG4gICAgICAnICBcXFxcICBcXFxcLyAgLyAgJyxcbiAgICAgICcgICBcXFxcICBcXFxcIC8gICAnLFxuICAgICAgJyBcXFxcLS9cXFxcICBcXFxcXFxcXC0vICcsXG4gICAgICAnIC8tXFxcXCBfXyAvLVxcXFwgJyxcbiAgICAgICcgICAgfF9ffCAgICAnLFxuICAgICAgJyAgIC9fX19fXFxcXCAgICcsXG4gICAgXSxcbiAgICBjb3N0OiAxMDAwLFxuICB9LFxuXTtcblxuLy8gVHJvcGhpZXMgbXVzdCBoYXZlIGNvcnJlY3QgaGVpZ2h0XG5mb3IgKGNvbnN0IHQgb2YgVFJPUEhJRVMpIHtcbiAgaWYgKHQuZGVzaWduLmxlbmd0aCAhPT0gOCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1QgaGFzIGluY29ycmVjdCBoZWlnaHQnLCB0KTtcbiAgfVxufVxuXG4vKiogQWRkIDEgdG8gY3VycmVuY3kuIFVwZGF0ZXMgdGhlIHRyb3BoaWVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEN1cnJlbmN5KCkge1xuICBjb250YWluZXJEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG4gIGN1cnJlbmN5Q29sbGVjdGVkICs9IDEwMDtcbiAgbW9uZXlEaXNwbGF5LnRleHRDb250ZW50ID0gYE1vbmV5OiAkJHtjdXJyZW5jeUNvbGxlY3RlZH1gO1xuXG4gIGlmIChUUk9QSElFU1tuZXh0VHJvcGh5XS5jb3N0IDw9IGN1cnJlbmN5Q29sbGVjdGVkKSB7XG4gICAgLy8gQ2FuIGRpc3BsYXkgdGhlIG5leHQgdHJvcGh5XG4gICAgdHJvcGh5RGl2LmFwcGVuZENoaWxkKHRyb3BoeVRvSHRtbChUUk9QSElFU1tuZXh0VHJvcGh5XS5kZXNpZ24pKTtcbiAgICB0cm9waHlEaXYuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJ30pO1xuICAgIG5leHRUcm9waHkrKztcblxuICAgIGlmIChuZXh0VHJvcGh5IDwgVFJPUEhJRVMubGVuZ3RoKSB7XG4gICAgICAvLyBVcGRhdGUgdGhlIG1lc3NhZ2VcbiAgICAgIG5leHRUcm9waHlQcmUuaW5uZXJIVE1MID0gYFxcblxcblxcbiBOZXh0OiAkJHtUUk9QSElFU1tuZXh0VHJvcGh5XS5jb3N0fSBcXG5cXG5cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBtb3JlIHRyb3BoaWVzLlxuICAgICAgbmV4dFRyb3BoeVByZS5pbm5lckhUTUwgPSBgXFxuXFxuXFxuIEZPVU5EIFxcbiBUSEVNIFxcbiBBTEwgXFxuXFxuXFxuYDtcbiAgICB9XG4gIH1cbiAgY2hlY2tDb21wbGV0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIHRyb3BoeVRvSHRtbChkZXNpZ246IHN0cmluZ1tdKTogSFRNTFByZUVsZW1lbnQge1xuICBjb25zdCBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgcHJlLmlubmVySFRNTCA9IGRlc2lnbi5qb2luKCdcXG4nKTtcbiAgcHJlLmNsYXNzTGlzdC5hZGQoJ3Ryb3BoeScpO1xuICByZXR1cm4gcHJlO1xufVxuXG4vKiogQ2hlY2sgY29tcGxldGlvbmlzdDogaGF2ZSBtYXggcG93ZXIgbGV2ZWwgYW5kIGFsbCB0cm9waGllcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29tcGxldGlvbigpIHtcbiAgaWYgKGdldFBvd2VyTGV2ZWwoKSA9PT0gTUFYX1BPV0VSX0xFVkVMXG4gICAgJiYgY3VycmVuY3lDb2xsZWN0ZWQgPT09IE1BWF9DVVJSRU5DWSkge1xuICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0aW9uaXN0Jyk7XG4gICAgICBpZiAocC50ZXh0Q29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHAudGV4dENvbnRlbnQgPSAnMTAwJSBDb21wbGV0aW9uISBZb3Ugd2luISBUaGFua3MgZm9yIHBsYXlpbmcuJztcbiAgICAgIHAuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiAnc21vb3RoJ30pO1xuICB9XG59XG4iLCJpbXBvcnQgeyByZW1vdmVBbGxQaXBlcywgc2V0R2FtZUludGVyYWN0YWJsZSwgdXBkYXRlTWFwIH0gZnJvbSAnLi9tYXAnO1xuXG5jb25zdCBtYXBQcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1wcmUnKSBhcyBIVE1MUHJlRWxlbWVudDtcbm1hcFByZS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xudXBkYXRlTWFwKCk7XG5cbi8vIFBhZ2Ugc3RhcnRzIGJsYW5rXG5sZXQgcGFnZU9wYWNpdHlNdWx0aXBsZXIgPSAwO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljayk7XG5cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKCkge1xuICAvLyBJbmNyZWFzZSBvcGFjaXR5IHVudGlsIDEsIHRoZW4gcmVtb3ZlIHRoZSBldmVudFxuICBwYWdlT3BhY2l0eU11bHRpcGxlciArPSAxO1xuICBpZiAocGFnZU9wYWNpdHlNdWx0aXBsZXIgPCAxMCkge1xuICAgIC8vIE5vdCB1c2luZyBmbG9hdHMgaGVyZSBkdWUgdG8gZmxvYXRpbmcgcG9pbnQgaW1wcmVjaXNpb25cbiAgICBtYXBQcmUuc3R5bGUub3BhY2l0eSA9IGAuJHtwYWdlT3BhY2l0eU11bHRpcGxlcn1gO1xuICB9IGVsc2Uge1xuICAgIG1hcFByZS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spO1xuICAgIHNldEdhbWVJbnRlcmFjdGFibGUodHJ1ZSk7XG4gICAgdXBkYXRlTWFwKCk7XG4gIH1cbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvd2VyLTItYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHJlbW92ZUFsbFBpcGVzKCk7XG59KTtcbiIsImltcG9ydCB7IGFkZEN1cnJlbmN5LCBNQVhfQ1VSUkVOQ1kgfSBmcm9tICcuL2xvb3QnO1xuaW1wb3J0IHtnZXRQb3dlcjJDaGVja2VkLCBnZXRQb3dlckxldmVsLCBzZXRQb3dlckxldmVsLCBTTElERVJfUE9XRVJfUkVRVUlSRU1FTlR9IGZyb20gJy4vcG93ZXJzJztcblxuLyoqIFRoZSB3b3JsZCBtYXAuIEV2ZXJ5dGhpbmcgc3RhcnRzIGhpZGRlbiBleGNlcHQgZm9yIHRoZSBmaXJzdCBzZW50ZW5jZS4gKi9cbmNvbnN0IE1BUF9TQ0hFTUFUSUMgPSBbXG4gICdAICAgICAgICAgICAwIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjICAkICsgNSAnLCAgLy8gT25seSB0aGUgc2xpZGVyIHNob3VsZCBiZSBhYmxlIHRvIHJlYWNoIHRoaXMgNVxuICAnICAgICAgICAgIDQgICAgIyAgICAgICAgICAgICAwICAgICAgICAgIC4gICAgICMjICMgICAjJywgIC8vIExlZnRtb3N0IG5lZWRzIHRvIGJlIGJsb2NrZWRcbiAgJyAgICAgICAgICAgICAgICsgICAgICAgICAgICAgICsgICAgICAgICAgNiAkICMgICAgICAjICcsICAvLyBOZWVkIC4gYW5kIHNsaWRlciB0byBibG9jayBtaWRkbGUgKyB3aGlsZSBpdCBleHRlbmRzIHRvIDUuXG4gICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwICAjICAgICAgICAnLFxuICAnIyArIFRoaXMgcGFnZSBpcyBpbnRlbnRpb25hbGx5IGxlZnQgYmxhbmsuICAgICAgICAgICAgJywgIC8vIE5lZWQgdG8gZ2V0IHNsaWRlciB0byBiZWxvdyB0aGUgMC5cbiAgJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjICAgICAgICcsXG4gICc0ICAgICAgICAgICsgICAgICAgICAgICAgICAgICsgICAgICAgICAgICArICAgIDUgICAgICAnLCAgLy8gTGVmdG1vc3QgKzogbmVlZCB1cCAyLCBkb3duIDMuIEV4dGVuZCAzIG1vcmUuXG4gICcgICAgICAgICAgICAgICAjICMgICAgICAgICAgIyMgICAgICAgICAgICAgICAgICAgICAgICAnLFxuICAnIyArICAgICAxICAgICArICAgIyAgICAgICAgICAgIDAgICAgICAgICAgICAgIyAjICAgICAgJywgIC8vIDJuZCArOiBtdXN0IGV4cGFuZCBleGFjdGx5IHR3aWNlIHRvIHJlYWNoIDQuXG4gICcgICAgICAgICAgICAgICAgICAgICAgICAgICAjKyAgICAgICAgICAgICAgICAgIyAgICAgICAnLCAgLy8gTWlkZGxlICsgaXMgbW9yZSBkaXNjb3ZlcmFibGUgZHVlIHRvICNcbiAgJzMgICAgICAyICAgICAuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIycsXG4gICcgICAgICAgICAgICAjICAgICArICAgIyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgICAnLFxuICAnICAjICAgICAjIDQgICAgKyAgICAjICAjICAgIDUgICAgICAgICAgICAgICAgICAgICAgICAgJyxcbiAgJyAgICAgICAgICAgIDAgIyAgICAyICAgICAgICAgICAgICAgICAgICAgICQgIyAgICAgICAgIycsXG4gICcgICAgICAgICAgIyAgICAgICsgICAgICAjICMgNiAjIyMgIyQjIyAjIyAgICAgICAgIyAjICMnLFxuICAnICAgICAjICQgIyAgICAgICAgIyAgIDMgICMgIyAjICAgMCAgICAjICAjICQgIyMjIyAgIDYgJyxcbiAgJyAgICAgICAgICAgIyAgICAgIyAjICMgICMgICAjICAgICAgICAgICAgICAgICAgICAgJCAgICcsXG4gICcgICAgICAgIyAgICAgICAgMyAkICQgIyMgICAgICsgICAgICAgICMgICAgKyAgICAgICAgICAnLFxuICAnICMgICAgICAgICAgICAgIyAjICAgMCAgICsgICAgICMgICAgICAgICAgICAgICAgICAgIDYgJyxcbiAgJzUgIyMjIyMgICMgIyMjIyAjICAgICAgICAgICAgICAgICsgICAgNiAgICMgICAgICAgICAgICcsXG4gICcgICAgICAgICAgICMgICAgICAgICArICAgICAgIDAgICAgICAgICAgICAgICAgICAjIyAkICAnLFxuICAnIyA2ICAgICArICAgNSAwICMgICAgICMgICAgIyAgICAgICAgICAgIyAgICAgICAgICAgICAgJyxcbl07XG5cbi8qKiBWaXNpYmlsaXR5IG9mIGEgdGlsZSAqL1xuZW51bSBWSVMge1xuICBISURERU4sXG4gIEZBSU5ULFxuICBRVUVTVElPTixcbiAgVklTSUJMRSxcbn1cblxuaW50ZXJmYWNlIE1hcFRpbGUge1xuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB0aWxlIGlzIHJldmVhbGVkIHRvIHRoZSBwbGF5ZXIuXG4gICAqIDA6IG5vdCByZXZlYWxlZDsgMTogcXVlc3Rpb24gbWFyazsgMjogcmV2ZWFsZWRcbiAgICovXG4gIHJldmVhbGVkOiBWSVM7XG4gIC8qKiBUaGUgY2hhcmFjdGVyIGN1cnJlbnRseSBvY2N1cHlpbmcgdGhpcyB0aWxlLiAqL1xuICBjaGFyOiBzdHJpbmc7XG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHRpbGUgaW4gdGhlIERPTS4gKi9cbiAgc3BhbjogSFRNTFNwYW5FbGVtZW50O1xuICAvKiogUm93IGluIHRoZSBtYXAgKi9cbiAgcm93OiBudW1iZXI7XG4gIC8qKiBDb2wgaW4gdGhlIG1hcCAqL1xuICBjb2w6IG51bWJlcjtcbn1cblxuLyoqIEZvciBzdG9yaW5nIGEgYnVuY2ggb2YgcmVmZXJlbmNlcyB0byBiZWFjb25zICovXG5pbnRlcmZhY2UgQmVhY29uc0dyb3VwIHsgdGlsZXM6IE1hcFRpbGVbXTsgbnVtQWN0aXZlOiBudW1iZXI7IH1cbnR5cGUgQmVhY29uc1R5cGUgPSBCZWFjb25zR3JvdXBbXTtcblxuY29uc3QgTUFQX1JPV1MgPSBNQVBfU0NIRU1BVElDLmxlbmd0aDtcbi8qKiBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbWFwLiAqL1xuY29uc3QgTUFQX0NPTFMgPSBNQVBfU0NIRU1BVElDWzBdLmxlbmd0aDtcblxuLyoqIENsYXNzbmFtZXMgKi9cbmNvbnN0IElOVEVSQUNUSVZFID0gJ2ludGVyYWN0aXZlJztcbmNvbnN0IEFOVElfQkVBQ09OID0gJ2FudGktYmVhY29uJztcbmNvbnN0IExPV19CRUFDT04gPSAnbG93LWJlYWNvbic7XG5jb25zdCBNRURfQkVBQ09OID0gJ21lZC1iZWFjb24nO1xuY29uc3QgSElHSF9CRUFDT04gPSAnaGlnaC1iZWFjb24nO1xuXG4vKiogUmVnZXggdG8gbWF0Y2ggY2hhcmFjdGVycyBpbiB0aGUgaW5pdGlhbCBzZW50ZW5jZSAqL1xuY29uc3QgV09SRF9NQVRDSEVSID0gL1tUYS16XS87XG4vKiogUmVnZXggdG8gbWF0Y2ggYmVhY29uIHN5bWJvbHMgMC05ICovXG5jb25zdCBCRUFDT05fTUFUQ0hFUiA9IC9cXGQvO1xuXG4vKiogRG8gdGhpcyBvbmNlIHRvIHJlbmRlciB0aGUgbWFwIGluaXRpYWxseSAqL1xuZnVuY3Rpb24gaW5pdFJlbmRlck1hcChwcmU6IEhUTUxQcmVFbGVtZW50KTogdm9pZCB7XG4gIC8vIFN0YXJ0cyBlbXB0eVxuICBsZXQgaHRtbFN0cmluZyA9ICcnO1xuICBmb3IgKGxldCByID0gMDsgciA8IE1BUF9ST1dTOyByKyspIHtcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IE1BUF9DT0xTOyBjKyspIHtcbiAgICAgIGh0bWxTdHJpbmcgKz0gYDxzcGFuIHJvdz1cIiR7cn1cIiBjb2w9XCIke2N9XCI+IDwvc3Bhbj5gO1xuICAgIH1cbiAgICBodG1sU3RyaW5nICs9ICdcXG4nO1xuICB9XG4gIHByZS5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbGwgdGhlIHNwYW5zIGFuZCBnZXQgcmVmZXJlbmNlcyB0byB0aGVtLlxuICpcbiAqIEluIG9yZGVyIHRvIGdldCByZWZlcmVuY2UgdG8gdGhlIHNwYW5zLCBNdXN0IHJlbmRlciB0aGUgbWFwIGJlZm9yZSBkb2luZyB0aGlzLlxuICpcbiAqIEFsc28gYWRkcyBjbGljayBsaXN0ZW5lcnMgdG8gdGhlIHNwYW5zLlxuICovXG5mdW5jdGlvbiBzZXR1cE1hcFByZSgpOiB7bWFwOiBNYXBUaWxlW11bXSwgYmVhY29uczogQmVhY29uc1R5cGV9IHtcbiAgY29uc3QgbWFwOiBNYXBUaWxlW11bXSA9IFtdO1xuICAvLyBBbHNvIGdldCByZWZlcmVuY2VzIHRvIGp1c3QgdGhlIGJlYWNvbnMuXG4gIGNvbnN0IGI6IEJlYWNvbnNHcm91cFtdID0gW1xuICAgIHt0aWxlczogW10sIG51bUFjdGl2ZTogMH0sXG4gICAge3RpbGVzOiBbXSwgbnVtQWN0aXZlOiAwfSxcbiAgICB7dGlsZXM6IFtdLCBudW1BY3RpdmU6IDB9LFxuICAgIHt0aWxlczogW10sIG51bUFjdGl2ZTogMH0sXG4gICAge3RpbGVzOiBbXSwgbnVtQWN0aXZlOiAwfSxcbiAgICB7dGlsZXM6IFtdLCBudW1BY3RpdmU6IDB9LFxuICAgIHt0aWxlczogW10sIG51bUFjdGl2ZTogMH0sXG4gIF07XG5cbiAgLy8gQWxzbyBtYWtlIGEgY291bnQgb2YgaG93IG1hbnkgJFxuICBsZXQgbnVtTW9uZXkgPSAwO1xuXG4gIGZvciAobGV0IHIgPSAwOyByIDwgTUFQX1JPV1M7IHIrKykge1xuICAgIGNvbnN0IG1hcFJvdzogTWFwVGlsZVtdID0gW107XG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCBNQVBfQ09MUzsgYysrKSB7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3Bhbltyb3c9XCIke3J9XCJdW2NvbD1cIiR7Y31cIl1gKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICBjb25zdCBtYXBUaWxlOiBNYXBUaWxlID0ge1xuICAgICAgICBjaGFyOiBNQVBfU0NIRU1BVElDW3JdW2NdLFxuICAgICAgICByZXZlYWxlZDogMCxcbiAgICAgICAgc3BhbixcbiAgICAgICAgcm93OiByLFxuICAgICAgICBjb2w6IGMsXG4gICAgICB9O1xuICAgICAgbWFwUm93LnB1c2gobWFwVGlsZSk7XG5cbiAgICAgIGlmIChtYXBUaWxlLmNoYXIgPT09ICckJykgeyBudW1Nb25leSsrOyB9XG5cbiAgICAgIHNwYW4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgb25TcGFuQ2xpY2sociwgYyk7XG4gICAgICB9O1xuICAgICAgLy8gQmVhY29ucyAobnVtYmVyIGRpZ2l0cykgZ2V0IGEgc3BlY2lhbCBjbGFzc1xuICAgICAgaWYgKG1hcFRpbGUuY2hhci5tYXRjaChCRUFDT05fTUFUQ0hFUikpIHtcbiAgICAgICAgYlttYXBUaWxlLmNoYXJdLnRpbGVzLnB1c2gobWFwVGlsZSk7XG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnYmVhY29uJyk7XG4gICAgICB9XG4gICAgfVxuICAgIG1hcC5wdXNoKG1hcFJvdyk7XG4gIH1cblxuICAvLyBSZXZlYWwgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIG1hcDogdGhlIGZpcnN0IHNlbnRlbmNlXG4gIGZvciAobGV0IGkgPSAzOyBpIDwgNDI7IGkrKykge1xuICAgIG1hcFs0XVtpXS5yZXZlYWxlZCA9IFZJUy5WSVNJQkxFO1xuICB9XG5cbiAgLy8gU2FuaXR5IGNoZWNrXG4gIGlmIChudW1Nb25leSAqIDEwMCAhPT0gTUFYX0NVUlJFTkNZKSB7XG4gICAgY29uc29sZS5lcnJvcignTW9uZXkgbWlzbWF0Y2gnLCBudW1Nb25leSwgTUFYX0NVUlJFTkNZKTtcbiAgfVxuXG4gIHJldHVybiB7bWFwLCBiZWFjb25zOiBifTtcbn1cblxuaW5pdFJlbmRlck1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1wcmUnKSBhcyBIVE1MUHJlRWxlbWVudCk7XG5leHBvcnQgY29uc3Qge21hcDogZ2FtZU1hcCwgYmVhY29uc30gPSBzZXR1cE1hcFByZSgpO1xuLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgKi9cbmxldCBzbGlkZXJUaWxlOiBNYXBUaWxlID0gZ2FtZU1hcFswXVswXTtcblxuLyoqIFVwZGF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGVudGlyZSBtYXAuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWFwKCk6IHZvaWQge1xuICAvLyBSZXNldCB0aGUgYmVhY29uIGNvdW50cyBpbiBwcmVwYXJhdGlvbiBmb3IgcmVjb3VudGluZy5cbiAgZm9yIChjb25zdCBncm91cCBvZiBPYmplY3QudmFsdWVzKGJlYWNvbnMpKSB7XG4gICAgZ3JvdXAubnVtQWN0aXZlID0gMDtcbiAgfVxuXG4gIGlmIChnZXRQb3dlckxldmVsKCkgPj0gU0xJREVSX1BPV0VSX1JFUVVJUkVNRU5UKSB7XG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgc2xpZGVyLlxuICAgIHNsaWRlclRpbGUucmV2ZWFsZWQgPSBWSVMuVklTSUJMRTtcbiAgICBzbGlkZXJUaWxlLnNwYW4uY2xhc3NMaXN0LnJlbW92ZSgnZmFpbnQnKTtcbiAgICBzbGlkZXJUaWxlLnNwYW4uY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XG4gICAgdXBkYXRlU2xpZGVyKCk7XG4gICAgdXBkYXRlU3BhbihzbGlkZXJUaWxlKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgcm93IG9mIGdhbWVNYXApIHtcbiAgICBmb3IgKGNvbnN0IHRpbGUgb2Ygcm93KSB7XG4gICAgICAvLyBDaGVjayBpZiBhbnkgdGlsZXMgbmVlZCB0byBiZSBwcm9tb3RlZCBpbiB2aXNpYmlsaXR5LlxuICAgICAgaWYgKHRpbGUucmV2ZWFsZWQgPT09IFZJUy5ISURERU4pIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2hvdWxkIGJlIHJldmVhbGVkPyBXaGVuIG5leHQgdG8gYSB2aXNpYmxlIGFuZCBhY3RpdmUgY2hhclxuICAgICAgICBpZiAoaGFzVmlzaWJsZU5laWdoYm91cih0aWxlKSkge1xuICAgICAgICAgIC8vIEVtcHR5IHRpbGVzIGFuZCAwLWJlYWNvbnMgZ2V0IGZ1bGx5IHJldmVhbGVkIGltbWVkaWF0ZWx5LlxuICAgICAgICAgIC8vIE90aGVyIG5vbi1lbXB0eSB0aWxlcyBnZXQgP1xuICAgICAgICAgIHRpbGUucmV2ZWFsZWQgPSAodGlsZS5jaGFyID09PSAnICcgfHwgdGlsZS5jaGFyID09PSAnMCcpXG4gICAgICAgICAgICA/IFZJUy5WSVNJQkxFXG4gICAgICAgICAgICA6IFZJUy5RVUVTVElPTjtcbiAgICAgICAgfSBlbHNlIGlmICgoZ2V0UG93ZXJMZXZlbCgpID4gMCAmJiBoYXNWaXNpYmxlTmVpZ2hib3VyKHRpbGUsIDIpKVxuICAgICAgICAgICAgfHwgZ2V0UG93ZXJMZXZlbCgpID49IDUpIHtcbiAgICAgICAgICAvLyBXaXRoIFBlcmNlcHRpb24gKywgbWF5IGNoZWNrIGRpc3RhbmNlIDIuXG4gICAgICAgICAgLy8gV2l0aCBQZXJjZXB0aW9uICsrLCBjYW4gc2VlIHRoZSBlbnRpcmUgbWFwIGZhaW50bHkuXG4gICAgICAgICAgaWYgKHRpbGUuY2hhciA9PT0gJyAnIHx8IHRpbGUuY2hhciA9PT0gJzAnKSB7XG4gICAgICAgICAgICB0aWxlLnJldmVhbGVkID0gVklTLlZJU0lCTEU7ICAvLyBSZXZlYWwgc29tZSB0aWxlcyBpbW1lZGlhdGVseS5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGlsZS5yZXZlYWxlZCA9IFZJUy5GQUlOVDtcbiAgICAgICAgICAgIHRpbGUuc3Bhbi5jbGFzc0xpc3QuYWRkKCdmYWludCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aWxlLnJldmVhbGVkID09PSBWSVMuRkFJTlQgJiYgaGFzVmlzaWJsZU5laWdoYm91cih0aWxlKSkge1xuICAgICAgICAvLyBHbyBmcm9tIGZhaW50IHRvIHF1ZXN0aW9uIG9yIHZpc2libGVcbiAgICAgICAgdGlsZS5yZXZlYWxlZCA9ICh0aWxlLmNoYXIgPT09ICcgJyB8fCB0aWxlLmNoYXIgPT09ICcwJylcbiAgICAgICAgICA/IFZJUy5WSVNJQkxFXG4gICAgICAgICAgOiBWSVMuUVVFU1RJT047XG4gICAgICAgIHRpbGUuc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWludCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIHRpbGVzXG4gICAgICBpZiAodGlsZS5yZXZlYWxlZCA9PT0gVklTLkhJRERFTikge1xuICAgICAgICAvLyBIaWRkZW4gdGlsZXMgZGlzcGxheSBhcyBlbXB0eS5cbiAgICAgICAgdGlsZS5zcGFuLmlubmVySFRNTCA9ICcgJztcbiAgICAgIH0gZWxzZSBpZiAodGlsZS5yZXZlYWxlZCA9PT0gVklTLkZBSU5UKSB7XG4gICAgICAgIC8vIFVua25vd24gdGlsZXMgZGlzcGxheSBhcyAnPydcbiAgICAgICAgdGlsZS5zcGFuLmlubmVySFRNTCA9ICc/JztcbiAgICAgIH0gZWxzZSBpZiAodGlsZS5yZXZlYWxlZCA9PT0gVklTLlFVRVNUSU9OKSB7XG4gICAgICAgIC8vIFVua25vd24gdGlsZXMgZGlzcGxheSBhcyAnPydcbiAgICAgICAgdGlsZS5zcGFuLmlubmVySFRNTCA9ICc/JztcbiAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5hZGQoSU5URVJBQ1RJVkUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV2ZWFsZWQgdGlsZXMgZGlzcGxheSBhcyBub3JtYWwuXG4gICAgICAgIHVwZGF0ZVNwYW4odGlsZSk7XG4gICAgICAgIC8vIENvdW50IGFjdGl2YXRlZCBiZWFjb25zLiBPbmx5IGFjdGl2YXRlZCBpZiBoYXMgdGhlIGNoYXIgYW5kIG5laWdoYm91ci5cbiAgICAgICAgaWYgKHRpbGUuY2hhci5tYXRjaChCRUFDT05fTUFUQ0hFUikgJiYgaGFzVmlzaWJsZU5laWdoYm91cih0aWxlKSkge1xuICAgICAgICAgIGJlYWNvbnNbdGlsZS5jaGFyXS5udW1BY3RpdmUrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB1cGRhdGVCZWFjb25zKCk7XG59XG5cbi8qKiBVcGRhdGVzIGp1c3Qgb25lIHNwYW4gb24gdGhlIG1hcC4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNwYW4odGlsZTogTWFwVGlsZSkge1xuICB0aWxlLnNwYW4uaW5uZXJIVE1MID0gdGlsZS5jaGFyO1xuICAvLyBJZiBpbnRlcmFjdGFibGUsIHVzZSBkaWZmZXJlbnQgbW91c2UgaG92ZXIuXG4gIGlmIChpc0ludGVyYWN0aXZlKHRpbGUpKSB7XG4gICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5hZGQoSU5URVJBQ1RJVkUpO1xuICB9IGVsc2Uge1xuICAgIHRpbGUuc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKElOVEVSQUNUSVZFKTtcbiAgfVxufVxuXG4vKiogVXBkYXRlcyB0aGUgc3R5bGVzIG9mIHRoZSBiZWFjb25zICovXG5mdW5jdGlvbiB1cGRhdGVCZWFjb25zKCkge1xuICAvLyBaZXJvIGdyb3VwIChhbnRpLWJlYWNvbnMpIG92ZXJyaWRlcyBhbGwuIE1ha2VzIGFsbCBiZWFjb25zIGhpZ2hsaWdodC5cbiAgaWYgKGJlYWNvbnNbMF0ubnVtQWN0aXZlID4gMCkge1xuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgYmVhY29ucykge1xuICAgICAgZm9yIChjb25zdCB0aWxlIG9mIGdyb3VwLnRpbGVzKSB7XG4gICAgICAgIGlmICh0aWxlLnJldmVhbGVkID09PSBWSVMuVklTSUJMRSAmJiB0aWxlLmNoYXIubWF0Y2goQkVBQ09OX01BVENIRVIpKSB7XG4gICAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5hZGQoQU5USV9CRUFDT04pO1xuICAgICAgICAgIHRpbGUuc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKExPV19CRUFDT04sIE1FRF9CRUFDT04sIEhJR0hfQkVBQ09OKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgLy8gRGVhY3RpYXRlIHRoZSB6ZXJvIGJlYWNvbnNcbiAgICBmb3IgKGNvbnN0IHRpbGUgb2YgYmVhY29uc1swXS50aWxlcykge1xuICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5yZW1vdmUoQU5USV9CRUFDT04pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYmVhY29ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdyb3VwID0gYmVhY29uc1tpXTtcbiAgICAvLyBJZiBlbnRpcmUgZ3JvdXAgYWN0aXZlLCBoaWdobGlnaHQgdGhlbSBhbGwgYW5kIG1ha2UgYWN0aXZlLlxuICAgIGlmIChncm91cC5udW1BY3RpdmUgPT09IGdyb3VwLnRpbGVzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCB0aWxlIG9mIGdyb3VwLnRpbGVzKSB7XG4gICAgICAgIGlmICh0aWxlLnJldmVhbGVkID09PSBWSVMuVklTSUJMRSkge1xuICAgICAgICAgIHRpbGUuc3Bhbi5jbGFzc0xpc3QuYWRkKEhJR0hfQkVBQ09OLCBJTlRFUkFDVElWRSk7XG4gICAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5yZW1vdmUoTE9XX0JFQUNPTiwgTUVEX0JFQUNPTiwgQU5USV9CRUFDT04pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlIGhpZ2hsaWdodCB0aGVtIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZXkgYXJlIGFjdGl2ZVxuICAgIGZvciAoY29uc3QgdGlsZSBvZiBncm91cC50aWxlcykge1xuICAgICAgLy8gQWxzbyBuZWVkIHRvIGNoZWNrIHRoYXQgdGhlIGJlYWNvbiBpcyBzdGlsbCB0aGVyZS4uLlxuICAgICAgaWYgKHRpbGUucmV2ZWFsZWQgPT09IFZJUy5WSVNJQkxFICYmIHRpbGUuY2hhciA9PT0gU3RyaW5nKGkpKSB7XG4gICAgICAgIGlmIChoYXNWaXNpYmxlTmVpZ2hib3VyKHRpbGUpKSB7XG4gICAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5hZGQoTUVEX0JFQUNPTik7XG4gICAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5yZW1vdmUoQU5USV9CRUFDT04sIExPV19CRUFDT04sIEhJR0hfQkVBQ09OKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aWxlLnNwYW4uY2xhc3NMaXN0LmFkZChMT1dfQkVBQ09OKTtcbiAgICAgICAgICB0aWxlLnNwYW4uY2xhc3NMaXN0LnJlbW92ZShBTlRJX0JFQUNPTiwgTUVEX0JFQUNPTiwgSElHSF9CRUFDT04pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbnZpc2libGUgb3IgZGVhY3RpdmF0ZWQgYmVhY29uIHRpbGVcbiAgICAgICAgdGlsZS5zcGFuLmNsYXNzTGlzdC5yZW1vdmUoQU5USV9CRUFDT04sIExPV19CRUFDT04sIE1FRF9CRUFDT04sIEhJR0hfQkVBQ09OKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIHRpbGVzIGFyb3VuZCB0aGUgc2xpZGVyLlxuICogQWRkcyBOU0VXIGFuZCBtYWtlcyBuZWlnaGJvdXJzIHZpc2libGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlcigpOiB2b2lkIHtcbiAgY29uc3Qge2xlZnQsIHJpZ2h0LCB1cCwgZG93bn0gPSBnZXROZWlnaGJvdXJzKHNsaWRlclRpbGUpO1xuICBpZiAodXAgJiYgaXNDbGVhcih1cCkpIHtcbiAgICB1cC5zcGFuLmlubmVySFRNTCA9IHVwLmNoYXIgPSAnTic7XG4gICAgdXAuc3Bhbi5jbGFzc0xpc3QuYWRkKElOVEVSQUNUSVZFKTtcbiAgICB1cC5yZXZlYWxlZCA9IFZJUy5WSVNJQkxFO1xuICB9XG4gIGlmIChkb3duICYmIGlzQ2xlYXIoZG93bikpIHtcbiAgICBkb3duLnNwYW4uaW5uZXJIVE1MID0gZG93bi5jaGFyID0gJ1MnO1xuICAgIGRvd24uc3Bhbi5jbGFzc0xpc3QuYWRkKElOVEVSQUNUSVZFKTtcbiAgICBkb3duLnJldmVhbGVkID0gVklTLlZJU0lCTEU7XG4gIH1cbiAgaWYgKHJpZ2h0ICYmIGlzQ2xlYXIocmlnaHQpKSB7XG4gICAgcmlnaHQuc3Bhbi5pbm5lckhUTUwgPSByaWdodC5jaGFyID0gJ0UnO1xuICAgIHJpZ2h0LnNwYW4uY2xhc3NMaXN0LmFkZChJTlRFUkFDVElWRSk7XG4gICAgcmlnaHQucmV2ZWFsZWQgPSBWSVMuVklTSUJMRTtcbiAgfVxuICBpZiAobGVmdCAmJiBpc0NsZWFyKGxlZnQpKSB7XG4gICAgbGVmdC5zcGFuLmlubmVySFRNTCA9IGxlZnQuY2hhciA9ICdXJztcbiAgICBsZWZ0LnNwYW4uY2xhc3NMaXN0LmFkZChJTlRFUkFDVElWRSk7XG4gICAgbGVmdC5yZXZlYWxlZCA9IFZJUy5WSVNJQkxFO1xuICB9XG59XG5cbi8qKiBDaGFuZ2VzIHRoZSBzbGlkZXJUaWxlIHRvIGEgbmV3IG9uZS4gKi9cbmZ1bmN0aW9uIHNldFNsaWRlclRpbGUobmV3VGlsZTogTWFwVGlsZSk6IHZvaWQge1xuICAvLyBVcGRhdGVzIHN0eWxlcyBvbiB0aGUgb2xkIHRpbGVcbiAgc2xpZGVyVGlsZS5zcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlcicpO1xuICBzbGlkZXJUaWxlLmNoYXIgPSAnICc7XG5cbiAgLy8gQ2xlYXIgdGhlIGRpcmVjdGlvbnNcbiAgY29uc3Qge2xlZnQsIHJpZ2h0LCB1cCwgZG93bn0gPSBnZXROZWlnaGJvdXJzKHNsaWRlclRpbGUpO1xuICBpZiAodXAgJiYgdXAuY2hhciA9PT0gJ04nKSB7XG4gICAgdXAuY2hhciA9ICcgJztcbiAgfVxuICBpZiAoZG93biAmJiBkb3duLmNoYXIgPT09ICdTJykge1xuICAgIGRvd24uY2hhciA9ICcgJztcbiAgfVxuICBpZiAocmlnaHQgJiYgcmlnaHQuY2hhciA9PT0gJ0UnKSB7XG4gICAgcmlnaHQuY2hhciA9ICcgJztcbiAgfVxuICBpZiAobGVmdCAmJiBsZWZ0LmNoYXIgPT09ICdXJykge1xuICAgIGxlZnQuY2hhciA9ICcgJztcbiAgfVxuXG4gIG5ld1RpbGUuc3Bhbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXInKTtcbiAgbmV3VGlsZS5jaGFyID0gJ0AnO1xuICBzbGlkZXJUaWxlID0gbmV3VGlsZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGF0IGxlYXN0IG9uZSBvZiB0aGUgNCBuZWlnaGJvdXJzXG4gKiBpcyB2aXNpYmxlIGFuZCBub24tZW1wdHkuXG4gKlxuICogQHBhcmFtIGRpc3QgZGlzdGFuY2UgZnJvbSBtaWRkbGVcbiAqL1xuZnVuY3Rpb24gaGFzVmlzaWJsZU5laWdoYm91cih0aWxlOiBNYXBUaWxlLCBkaXN0ID0gMSk6IGJvb2xlYW4ge1xuICBjb25zdCBuZWlnaGJvdXJzID0gZ2V0TmVpZ2hib3Vyc0FzQXJyYXkodGlsZSwgZGlzdCk7XG4gIGZvciAoY29uc3QgbiBvZiBuZWlnaGJvdXJzKSB7XG4gICAgaWYgKG4ucmV2ZWFsZWQgPT09IFZJUy5WSVNJQkxFICYmICFpc0NsZWFyKG4pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHdoZW4gYSBzcGFuIGlzIGNsaWNrZWQuXG4gKlxuICogQHBhcmFtIHIgcm93IGluZGV4XG4gKiBAcGFyYW0gYyBjb2wgaW5kZXhcbiAqL1xuZnVuY3Rpb24gb25TcGFuQ2xpY2socm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHRpbGUgPSBnYW1lTWFwW3Jvd11bY29sXTtcblxuICBpZiAodGlsZS5yZXZlYWxlZCA9PT0gVklTLlFVRVNUSU9OKSB7ICAvLyBNYXkgY2xpY2sgJz8nIHRvIHJldmVhbCBpdFxuICAgIHRpbGUucmV2ZWFsZWQgPSBWSVMuVklTSUJMRTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFpc0ludGVyYWN0aXZlKHRpbGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIEluaXRpYWwgd29yZHMgZGlzYXBwZWFyIHdoZW4gY2xpY2tlZC5cbiAgLy8gSGFja3kgb3B0aW1pc2F0aW9uOiBzaG9ydC1jaXJjdWl0IGlmIHBvd2VyIGxldmVsIGluZGljYXRlcyBwcm9ncmVzcyBiZXlvbmQuXG4gIGlmIChnZXRQb3dlckxldmVsKCkgPCAxICYmIHRpbGUuY2hhci5tYXRjaChXT1JEX01BVENIRVIpKSB7XG4gICAgLy8gVG8gYmUgbGVzcyB0ZWRpb3VzLCBhbHNvIHJlbW92ZXMgY29udGlndW91cyBsb3dlcmNhc2UgY2hhcmFjdGVycy5cbiAgICB0aWxlLmNoYXIgPSAnICc7XG4gICAgY29uc3QgciA9IHRpbGUucm93O1xuICAgIGxldCBjID0gMDtcbiAgICAvLyBHbyBsZWZ0XG4gICAgYyA9IHRpbGUuY29sIC0gMTtcbiAgICB3aGlsZSAoYyA+PSAwKSB7XG4gICAgICBjb25zdCBjdXJyVGlsZSA9IGdhbWVNYXBbcl1bY107XG4gICAgICBpZiAoIShjdXJyVGlsZS5jaGFyLm1hdGNoKFdPUkRfTUFUQ0hFUikpKSB7IGJyZWFrOyB9XG4gICAgICBjdXJyVGlsZS5jaGFyID0gJyAnO1xuICAgICAgYy0tO1xuICAgIH1cbiAgICAvLyBHbyByaWdodFxuICAgIGMgPSB0aWxlLmNvbCArIDE7XG4gICAgd2hpbGUgKGMgPCBNQVBfQ09MUykge1xuICAgICAgY29uc3QgY3VyclRpbGUgPSBnYW1lTWFwW3JdW2NdO1xuICAgICAgaWYgKCEoY3VyclRpbGUuY2hhci5tYXRjaChXT1JEX01BVENIRVIpKSkgeyBicmVhazsgfVxuICAgICAgY3VyclRpbGUuY2hhciA9ICcgJztcbiAgICAgIGMrKztcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICB9XG5cbiAgaWYgKHRpbGUuY2hhciA9PT0gJy4nKSB7XG4gICAgY29uc3QgciA9IHRpbGUucm93O1xuICAgIGxldCBjID0gMDtcbiAgICBpZiAoZ2V0UG93ZXIyQ2hlY2tlZCgpKSB7XG4gICAgICBjID0gdGlsZS5jb2w7XG4gICAgICB3aGlsZSAoYyA+PSAwKSB7XG4gICAgICAgIC8vIElmIHRoZSB0aWxlIG9uIHRoZSBsZWZ0IGlzIG5vdCAnLicgKGluY2x1ZGluZyBvdXQgb2YgYm91bmRzKSwgbWF5IHJldHJhY3RcbiAgICAgICAgaWYgKGMgLSAxIDwgMCB8fCBnYW1lTWFwW3JdW2MgLSAxXS5jaGFyICE9PSAnLicpIHtcbiAgICAgICAgICBnYW1lTWFwW3JdW2NdLmNoYXIgPSAnICc7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIGMtLTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWF5IGV4cGFuZCB0byB0aGUgbGVmdCBhcyBsb25nIGFzIHRoZXJlIGlzIHNwYWNlIGF0IHRoZSBlbmQgb2YgdGhlIC4uLlxuICAgIGMgPSB0aWxlLmNvbCAtIDE7XG4gICAgd2hpbGUgKGMgPj0gMCkge1xuICAgICAgaWYgKGlzQ2xlYXIoZ2FtZU1hcFtyXVtjXSkpIHtcbiAgICAgICAgZ2FtZU1hcFtyXVtjXS5jaGFyID0gJy4nO1xuICAgICAgICByZXR1cm4gdXBkYXRlTWFwKCk7XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZU1hcFtyXVtjXS5jaGFyICE9PSAnLicpIHsgYnJlYWs7IH1cbiAgICAgIGMtLTtcbiAgICB9XG4gIH1cbiAgaWYgKHRpbGUuY2hhciA9PT0gJysnICkge1xuICAgIC8vIE1heSBleHBhbmQgb3V0IGFzIGxvbmcgYXMgdGhlcmUgaXMgZW1wdHkgc3BhY2UgYXQgdGhlIGVuZCBvZiBhbnkgcGlwZS5cbiAgICBsZXQgciA9IDA7XG4gICAgbGV0IGMgPSAwO1xuICAgIC8vIEdvIGxlZnRcbiAgICByID0gdGlsZS5yb3c7XG4gICAgYyA9IHRpbGUuY29sIC0gMTtcbiAgICB3aGlsZSAoYyA+PSAwKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICBnYW1lTWFwW3JdW2NdLmNoYXIgPSAnLSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVNYXBbcl1bY10uY2hhciAhPT0gJy0nKSB7IGJyZWFrOyB9XG4gICAgICBjLS07XG4gICAgfVxuICAgIC8vIEdvIHJpZ2h0XG4gICAgYyA9IHRpbGUuY29sICsgMTtcbiAgICB3aGlsZSAoYyA8IE1BUF9DT0xTKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICBnYW1lTWFwW3JdW2NdLmNoYXIgPSAnLSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVNYXBbcl1bY10uY2hhciAhPT0gJy0nKSB7IGJyZWFrOyB9XG4gICAgICBjKys7XG4gICAgfVxuICAgIC8vIEdvIHVwXG4gICAgciA9IHRpbGUucm93IC0gMTtcbiAgICBjID0gdGlsZS5jb2w7XG4gICAgd2hpbGUgKHIgPj0gMCkge1xuICAgICAgaWYgKGlzQ2xlYXIoZ2FtZU1hcFtyXVtjXSkpIHtcbiAgICAgICAgZ2FtZU1hcFtyXVtjXS5jaGFyID0gJ3wnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lTWFwW3JdW2NdLmNoYXIgIT09ICd8JykgeyBicmVhazsgfVxuICAgICAgci0tO1xuICAgIH1cbiAgICAvLyBHbyBkb3duXG4gICAgciA9IHRpbGUucm93ICsgMTtcbiAgICB3aGlsZSAociA8IE1BUF9ST1dTKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICBnYW1lTWFwW3JdW2NdLmNoYXIgPSAnfCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVNYXBbcl1bY10uY2hhciAhPT0gJ3wnKSB7IGJyZWFrOyB9XG4gICAgICByKys7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVNYXAoKTtcbiAgfVxuICAvLyBJZiBjbGljayBvbiBiZWFjb24sIGNoZWNrIGlmIHRoZSBvdGhlcnMgYXJlIGFsbCBhY3RpdmUuLi5cbiAgaWYgKHRpbGUuY2hhci5tYXRjaChCRUFDT05fTUFUQ0hFUikpIHtcbiAgICBpZiAodGlsZS5zcGFuLmNsYXNzTGlzdC5jb250YWlucyhISUdIX0JFQUNPTikpIHtcbiAgICAgIGNvbnN0IG51bUJlYWNvbnNBY3RpdmUgPSBwYXJzZUludCh0aWxlLmNoYXIsIDEwKTtcbiAgICAgIHNldFBvd2VyTGV2ZWwobnVtQmVhY29uc0FjdGl2ZSk7XG4gICAgICBkZXN0cm95QW5kUmV2ZWFsQmVhY29ucyhudW1CZWFjb25zQWN0aXZlKTtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICB9XG4gIC8vIEN1cnJlbmN5IGdldHMgcmVwbGFjZWQgd2l0aCB3YWxsIHdoZW4gY29sbGVjdGVkLlxuICBpZiAodGlsZS5jaGFyID09PSAnJCcgKSB7XG4gICAgYWRkQ3VycmVuY3koKTtcbiAgICB0aWxlLmNoYXIgPSAnIyc7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICB9XG4gIGlmICh0aWxlLmNoYXIgPT09ICdOJykge1xuICAgIC8vIE1vdmUgc2xpZGVyIHVwIHVudGlsIGl0IGhpdHMgc29tZXRoaW5nIG9yIHJ1bnMgb3V0IG9mIHNwYWNlXG4gICAgbGV0IHIgPSBzbGlkZXJUaWxlLnJvdyAtIDE7XG4gICAgY29uc3QgYyA9IHNsaWRlclRpbGUuY29sO1xuICAgIHdoaWxlIChyID49IDAgJiYgaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkgeyByLS07IH1cbiAgICBzZXRTbGlkZXJUaWxlKGdhbWVNYXBbciArIDFdW2NdKTtcbiAgICByZXR1cm4gdXBkYXRlTWFwKCk7XG4gIH1cbiAgaWYgKHRpbGUuY2hhciA9PT0gJ1MnKSB7XG4gICAgLy8gTW92ZSBzbGlkZXIgZG93biB1bnRpbCBpdCBoaXRzIHNvbWV0aGluZyBvciBydW5zIG91dCBvZiBzcGFjZVxuICAgIGxldCByID0gc2xpZGVyVGlsZS5yb3cgKyAxO1xuICAgIGNvbnN0IGMgPSBzbGlkZXJUaWxlLmNvbDtcbiAgICB3aGlsZSAociA8IE1BUF9ST1dTICYmIGlzQ2xlYXIoZ2FtZU1hcFtyXVtjXSkpIHsgcisrOyB9XG4gICAgc2V0U2xpZGVyVGlsZShnYW1lTWFwW3IgLSAxXVtjXSk7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICB9XG4gIGlmICh0aWxlLmNoYXIgPT09ICdFJykge1xuICAgIC8vIE1vdmUgc2xpZGVyIGxlZnQgdW50aWwgaXQgaGl0cyBzb21ldGhpbmcgb3IgcnVucyBvdXQgb2Ygc3BhY2VcbiAgICBjb25zdCByID0gc2xpZGVyVGlsZS5yb3c7XG4gICAgbGV0IGMgPSBzbGlkZXJUaWxlLmNvbCArIDE7XG4gICAgd2hpbGUgKGMgPCBNQVBfQ09MUyAmJiBpc0NsZWFyKGdhbWVNYXBbcl1bY10pKSB7IGMrKzsgfVxuICAgIHNldFNsaWRlclRpbGUoZ2FtZU1hcFtyXVtjIC0gMV0pO1xuICAgIHJldHVybiB1cGRhdGVNYXAoKTtcbiAgfVxuICBpZiAodGlsZS5jaGFyID09PSAnVycpIHtcbiAgICAvLyBNb3ZlIHNsaWRlciByaWdodCB1bnRpbCBpdCBoaXRzIHNvbWV0aGluZyBvciBydW5zIG91dCBvZiBzcGFjZVxuICAgIGNvbnN0IHIgPSBzbGlkZXJUaWxlLnJvdztcbiAgICBsZXQgYyA9IHNsaWRlclRpbGUuY29sIC0gMTtcbiAgICB3aGlsZSAoYyA+PSAwICYmIGlzQ2xlYXIoZ2FtZU1hcFtyXVtjXSkpIHsgYy0tOyB9XG4gICAgc2V0U2xpZGVyVGlsZShnYW1lTWFwW3JdW2MgKyAxXSk7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCgpO1xuICB9XG59XG5cbi8qKiBDaGVja3MgaWYgYSBjaGFyIGlzIGludGVyYWN0aXZlIC0tIGkuZS4gc2F0aXNmaWVzIHRoZSBjb25kaXRpb25zIGZvciBpbnRlcmFjdGlvbi4gKi9cbmZ1bmN0aW9uIGlzSW50ZXJhY3RpdmUodGlsZTogTWFwVGlsZSk6IGJvb2xlYW4ge1xuICBpZiAoIWlzR2FtZUludGVyYWN0YWJsZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgc2xpZGVyJ3MgZGlyZWN0aW9ucyBhcmUgaW50ZXJhY3RpdmUuIChUaGUgc2xpZGVyIGl0c2VsZiBpc24ndClcbiAgaWYgKHRpbGUuY2hhci5tYXRjaCgvW05TRVddLykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBPdGhlciBoaWRkZW4gYW5kIGVtcHR5IHRpbGVzIGFyZSBub3QgaW50ZXJhY3RpdmUuXG4gIGlmICh0aWxlLmNoYXIgPT09ICcgJyB8fCB0aWxlLnJldmVhbGVkID09PSBWSVMuSElEREVOIHx8IHRpbGUucmV2ZWFsZWQgPT09IFZJUy5GQUlOVCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0UG93ZXJMZXZlbCgpIDwgMSAmJiB0aWxlLmNoYXIubWF0Y2goV09SRF9NQVRDSEVSKSkge1xuICAgIHJldHVybiB0cnVlOyAgLy8gTWF0Y2hlcyB0aGUgaW5pdGlhbCBzZW50ZW5jZS5cbiAgfVxuICAvLyBNYXkgZXhwYW5kIHRvIHRoZSBsZWZ0IGFzIGxvbmcgYXMgdGhlcmUgaXMgc3BhY2UgYXQgdGhlIGVuZCBvZiB0aGUgbGluZS4uLlxuICBpZiAodGlsZS5jaGFyID09PSAnLicpIHtcbiAgICAvLyBNYXkgZXhwYW5kIGFzIGxvbmcgYXMgdGhlcmUgaXMgZW1wdHkgc3BhY2UgYXQgdGhlIGVuZCBvZiBhbnkgcGlwZS5cbiAgICBsZXQgciA9IHRpbGUucm93O1xuICAgIGxldCBjID0gdGlsZS5jb2w7XG4gICAgaWYgKGdldFBvd2VyMkNoZWNrZWQoKSkge1xuICAgICAgLy8gIE1heSByZXRyYWN0IGFzIGxvbmcgYXMgdGhlcmUgaXMgYSBkb3Qgb24gdGhlIGxlZnQuXG4gICAgICByZXR1cm4gaXNJbk1hcEJvdW5kcyhyLCBjIC0gMSkgJiYgKGdhbWVNYXBbcl1bYyAtIDFdLmNoYXIgPT09ICcuJyk7XG4gICAgfVxuICAgIC8vIEdvIGxlZnRcbiAgICByID0gdGlsZS5yb3c7XG4gICAgYyA9IHRpbGUuY29sIC0gMTtcbiAgICB3aGlsZSAoYyA+PSAwKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lTWFwW3JdW2NdLmNoYXIgIT09ICcuJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGMtLTtcbiAgICB9XG4gIH1cbiAgaWYgKHRpbGUucmV2ZWFsZWQgPT09IFZJUy5RVUVTVElPTikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0aWxlLmNoYXIgPT09ICckJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0aWxlLmNoYXIgPT09ICcrJyApIHtcbiAgICAvLyBNYXkgZXhwYW5kIGFzIGxvbmcgYXMgdGhlcmUgaXMgZW1wdHkgc3BhY2UgYXQgdGhlIGVuZCBvZiBhbnkgcGlwZS5cbiAgICBsZXQgciA9IDA7XG4gICAgbGV0IGMgPSAwO1xuICAgIC8vIEdvIGxlZnRcbiAgICByID0gdGlsZS5yb3c7XG4gICAgYyA9IHRpbGUuY29sIC0gMTtcbiAgICB3aGlsZSAoYyA+PSAwKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lTWFwW3JdW2NdLmNoYXIgIT09ICctJykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGMtLTtcbiAgICB9XG4gICAgLy8gR28gcmlnaHRcbiAgICBjID0gdGlsZS5jb2wgKyAxO1xuICAgIHdoaWxlIChjIDwgTUFQX0NPTFMpIHtcbiAgICAgIGlmIChpc0NsZWFyKGdhbWVNYXBbcl1bY10pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVNYXBbcl1bY10uY2hhciAhPT0gJy0nKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYysrO1xuICAgIH1cbiAgICAvLyBHbyB1cFxuICAgIHIgPSB0aWxlLnJvdyAtIDE7XG4gICAgYyA9IHRpbGUuY29sO1xuICAgIHdoaWxlIChyID49IDApIHtcbiAgICAgIGlmIChpc0NsZWFyKGdhbWVNYXBbcl1bY10pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVNYXBbcl1bY10uY2hhciAhPT0gJ3wnKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgci0tO1xuICAgIH1cbiAgICAvLyBHbyBkb3duXG4gICAgciA9IHRpbGUucm93ICsgMTtcbiAgICB3aGlsZSAociA8IE1BUF9ST1dTKSB7XG4gICAgICBpZiAoaXNDbGVhcihnYW1lTWFwW3JdW2NdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lTWFwW3JdW2NdLmNoYXIgIT09ICd8Jykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHIrKztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0aWxlLmNoYXIubWF0Y2goQkVBQ09OX01BVENIRVIpKSB7XG4gICAgLy8gU2VlIGxvZ2ljIGluOiB1cGRhdGVCZWFjb25zXG4gICAgcmV0dXJuICh0aWxlLnNwYW4uY2xhc3NMaXN0LmNvbnRhaW5zKEhJR0hfQkVBQ09OKSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKiogUmV0dXJucyB0cnVlIGlmIHRoZSBjb29yZGluYXRlIGlzIGluIGJvdW5kcyBhbmQgY29udGFpbnMgdGhlIGNoYXIgKi9cbmZ1bmN0aW9uIGNvb3Jkc0NvbnRhaW5zQ2hhcihyOiBudW1iZXIsIGM6IG51bWJlciwgY2hhcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghaXNJbk1hcEJvdW5kcyhyLCBjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZ2FtZU1hcFtyXVtjXS5jaGFyID09PSBjaGFyO1xufVxuXG4vKiogV2hldGhlciBvciBub3QgdGhlIGNvb3JkaW5hdGUgaXMgaW4gYm91bmRzICovXG5mdW5jdGlvbiBpc0luTWFwQm91bmRzKHI6IG51bWJlciwgYzogbnVtYmVyKSB7XG4gIGlmIChyIDwgMCB8fCAgciA+PSBNQVBfUk9XUyB8fCBjIDwgMCB8fCBjID49IE1BUF9DT0xTKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogQ2hlY2tzIGlmIGEgdGlsZSBvbiB0aGUgbWFwIGlzIGNsZWFyIG9mIG9ic3RhY2xlcyAqL1xuZnVuY3Rpb24gaXNDbGVhcih0aWxlOiBNYXBUaWxlKSB7XG4gIHJldHVybiAodGlsZS5jaGFyLm1hdGNoKC9bIE5TRVddLykpO1xufVxuXG4vKiogR2V0IHRoZSBuZWlnaGJvdXJzIG9mIGEgbWFwIHRpbGUgYXMgYW4gb2JqZWN0LiA0IG9mIHRoZW0sIG1heWJlIG51bGwuICovXG5mdW5jdGlvbiBnZXROZWlnaGJvdXJzKHRpbGU6IE1hcFRpbGUpIHtcbiAgY29uc3QgbGVmdCA9IGlzSW5NYXBCb3VuZHModGlsZS5yb3csIHRpbGUuY29sIC0gMSkgPyBnYW1lTWFwW3RpbGUucm93XVt0aWxlLmNvbCAtIDFdIDogbnVsbDtcbiAgY29uc3QgcmlnaHQgPSBpc0luTWFwQm91bmRzKHRpbGUucm93LCB0aWxlLmNvbCArIDEpID8gZ2FtZU1hcFt0aWxlLnJvd11bdGlsZS5jb2wgKyAxXSA6IG51bGw7XG4gIGNvbnN0IGRvd24gPSBpc0luTWFwQm91bmRzKHRpbGUucm93ICsgMSwgdGlsZS5jb2wpID8gZ2FtZU1hcFt0aWxlLnJvdyArIDFdW3RpbGUuY29sXSA6IG51bGw7XG4gIGNvbnN0IHVwID0gaXNJbk1hcEJvdW5kcyh0aWxlLnJvdyAtIDEsIHRpbGUuY29sKSA/IGdhbWVNYXBbdGlsZS5yb3cgLSAxXVt0aWxlLmNvbF0gOiBudWxsO1xuICByZXR1cm4ge1xuICAgIGxlZnQsIHJpZ2h0LCB1cCwgZG93bixcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgYW4gYXJyYXkgdGhlIG5laWdoYm91cnMgb2YgYSBtYXAgdGlsZS4gVXAgdG8gZm91ciBvZiB0aGVtLlxuICpcbiAqIEBwYXJhbSB0aWxlIG1pZGRsZSB0aWxlIHRvIGdldCB0aGUgbmVpZ2hib3VycyBvZlxuICogQHBhcmFtIGRpc3QgZGlzdGFuY2UgZnJvbSB0aGUgbWlkZGxlIHRpbGUgKGRlZmF1bHQgMSlcbiAqL1xuZnVuY3Rpb24gZ2V0TmVpZ2hib3Vyc0FzQXJyYXkodGlsZTogTWFwVGlsZSwgZGlzdCA9IDEpIHtcbiAgY29uc3QgbGVmdCA9IGlzSW5NYXBCb3VuZHModGlsZS5yb3csIHRpbGUuY29sIC0gZGlzdCkgPyBnYW1lTWFwW3RpbGUucm93XVt0aWxlLmNvbCAtIGRpc3RdIDogbnVsbDtcbiAgY29uc3QgcmlnaHQgPSBpc0luTWFwQm91bmRzKHRpbGUucm93LCB0aWxlLmNvbCArIGRpc3QpID8gZ2FtZU1hcFt0aWxlLnJvd11bdGlsZS5jb2wgKyBkaXN0XSA6IG51bGw7XG4gIGNvbnN0IGRvd24gPSBpc0luTWFwQm91bmRzKHRpbGUucm93ICsgZGlzdCwgdGlsZS5jb2wpID8gZ2FtZU1hcFt0aWxlLnJvdyArIGRpc3RdW3RpbGUuY29sXSA6IG51bGw7XG4gIGNvbnN0IHVwID0gaXNJbk1hcEJvdW5kcyh0aWxlLnJvdyAtIGRpc3QsIHRpbGUuY29sKSA/IGdhbWVNYXBbdGlsZS5yb3cgLSBkaXN0XVt0aWxlLmNvbF0gOiBudWxsO1xuICBjb25zdCBhcnI6IE1hcFRpbGVbXSA9IFtdO1xuICBpZiAobGVmdCkgeyBhcnIucHVzaChsZWZ0KTsgfVxuICBpZiAocmlnaHQpIHsgYXJyLnB1c2gocmlnaHQpOyB9XG4gIGlmICh1cCkgeyBhcnIucHVzaCh1cCk7IH1cbiAgaWYgKGRvd24pIHsgYXJyLnB1c2goZG93bik7IH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBEZWFjdGl2YXRlIGFsbCB0aGUgYmVhY29ucyBvbiB0aGUgbWFwIHdpdGggbnVtYmVyIGVxdWFsIHRvIGJlYWNvbk51bS5cbiAqIEFuZCByZXZlYWwgYWxsIHRoZSBiZWFjb25zIG9uIHRoZSBtYXAgd2l0aCBudW1iZXIgZXF1YWwgdG8gYmVhY29uTnVtICsgMS5cbiAqL1xuZnVuY3Rpb24gZGVzdHJveUFuZFJldmVhbEJlYWNvbnMoYmVhY29uTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgdG9EZXN0cm95ID0gU3RyaW5nKGJlYWNvbk51bSk7XG4gIGNvbnN0IHRvUmV2ZWFsID0gU3RyaW5nKGJlYWNvbk51bSArIDEpO1xuICBmb3IgKGNvbnN0IHJvdyBvZiBnYW1lTWFwKSB7XG4gICAgZm9yIChjb25zdCB0aWxlIG9mIHJvdykge1xuICAgICAgaWYgKHRpbGUuY2hhciA9PT0gdG9SZXZlYWwpIHtcbiAgICAgICAgdGlsZS5yZXZlYWxlZCA9IFZJUy5WSVNJQkxFO1xuICAgICAgICB0aWxlLnNwYW4uY2xhc3NMaXN0LnJlbW92ZSgnZmFpbnQnKTtcbiAgICAgIH0gZWxzZSBpZiAodGlsZS5jaGFyID09PSB0b0Rlc3Ryb3kpIHtcbiAgICAgICAgdGlsZS5jaGFyID0gJyAnO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiogUG93ZXI6IHJlbW92ZSBhbGwgcGlwZXMgZnJvbSB0aGUgbWFwICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsUGlwZXMoKTogdm9pZCB7XG4gIGlmIChnZXRQb3dlckxldmVsKCkgPCAxKSB7XG4gICAgY29uc29sZS5lcnJvcignTXVzdCBoYXZlIHBvd2VyIGxldmVsIGF0IGxlYXN0IDEnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yIChjb25zdCByb3cgb2YgZ2FtZU1hcCkge1xuICAgIGZvciAoY29uc3QgdGlsZSBvZiByb3cpIHtcbiAgICAgIGlmICh0aWxlLmNoYXIgPT09ICctJyB8fCB0aWxlLmNoYXIgPT09ICd8Jykge1xuICAgICAgICB0aWxlLmNoYXIgPSAnICc7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHVwZGF0ZU1hcCgpO1xufVxuXG5sZXQgaXNHYW1lSW50ZXJhY3RhYmxlID0gZmFsc2U7XG4vKiogTWFzdGVyIHN3aXRjaCB0byBjb250cm9sIGlmIHRoZSBwcmUgY2FuIGJlIGludGVyYWN0ZWQgd2l0aC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lSW50ZXJhY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gIGlzR2FtZUludGVyYWN0YWJsZSA9IHZhbHVlO1xufVxuIiwiaW1wb3J0IHsgY2hlY2tDb21wbGV0aW9uIH0gZnJvbSAnLi9sb290JztcbmltcG9ydCB7IHVwZGF0ZU1hcCB9IGZyb20gJy4vbWFwJztcblxuLy8gRm9yIGRlYWxpbmcgd2l0aCB0aGUgcG93ZXJzIGVsZW1lbnRzXG5jb25zdCBwb3dlcnNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXJzLWNvbnRhaW5lcicpO1xuY29uc3QgcG93ZXIzQ2hlY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXItMy1jaGVjaycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbi8qKiBDbGFzc25hbWUgKi9cbmNvbnN0IElOVklTSUJMRSA9ICdpbnZpc2libGUnO1xuXG4vKiogUG93ZXIgbGV2ZWwgcmVxdWlyZWQgdG8gdXNlIHNsaWRlciAqL1xuZXhwb3J0IGNvbnN0IFNMSURFUl9QT1dFUl9SRVFVSVJFTUVOVCA9IDQ7XG5leHBvcnQgY29uc3QgTUFYX1BPV0VSX0xFVkVMID0gNjtcblxubGV0IHBvd2VyTGV2ZWwgPSAwO1xuXG4vKiogU2V0cyB0aGUgcG93ZXIgbGV2ZWwgYW5kIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50cy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb3dlckxldmVsKG5ld1Bvd2VyTGV2ZWw6IG51bWJlcikge1xuICAvLyBFeHRyYSBjb2RlIHRvIG1ha2UgdGhlIHBvd2VycyBjb250YWluZXIgYXBwZWFyXG4gIGlmIChwb3dlcnNDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKElOVklTSUJMRSkpIHtcbiAgICBwb3dlcnNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShJTlZJU0lCTEUpO1xuICAgIHBvd2Vyc0NvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnfSk7XG4gIH1cblxuICBwb3dlckxldmVsID0gbmV3UG93ZXJMZXZlbDtcblxuICAvLyBNYWtlIHBhcnRzIG9mIHRoZSBjb250YWluZXIgYXBwZWFyXG4gIGZvciAobGV0IHAgPSAxOyBwIDw9IG5ld1Bvd2VyTGV2ZWw7IHArKykge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBvd2VyLSR7bmV3UG93ZXJMZXZlbH0tbGlgKTtcbiAgICBpZiAoIWxpKSB7XG4gICAgICAvLyBNdXN0IGFscmVhZHkgaGF2ZSBhbGwgdGhlIHBvd2Vycy5cbiAgICAgIGNvbnNvbGUubG9nKCdObyBtb3JlIHBvd2VycycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKElOVklTSUJMRSkpIHtcbiAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoSU5WSVNJQkxFKTtcbiAgICB9XG4gIH1cbiAgY2hlY2tDb21wbGV0aW9uKCk7XG59XG5cbi8qKiBHZXRzIHRoZSBjdXJyZW50IHBvd2VyIGxldmVsICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG93ZXJMZXZlbCgpIHtcbiAgcmV0dXJuIHBvd2VyTGV2ZWw7XG59XG5cbi8qKiBQb3dlciAyOiBhYmlsaXR5IHRvIHJldHJhY3QgZG90cyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBvd2VyMkNoZWNrZWQoKSB7XG4gIHJldHVybiBwb3dlcjNDaGVjay5jaGVja2VkO1xufVxuXG5wb3dlcjNDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHVwZGF0ZU1hcCgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9