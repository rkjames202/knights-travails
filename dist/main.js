/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/knightsMove.js":
/*!************************************!*\
  !*** ./src/modules/knightsMove.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);

/**
 * Create a chess board that stores legal moves for each square
 *
 * @returns Array representing a chessboard
 */
function createBoard() {
  let board = [];

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = getMoves(row, col);
    }
  }

  return board;
}

/**
 * Generate legal moves/children for a square
 *
 * @param {Number} row - Row coordinate of square
 * @param {Number} col - Column coordinate of square
 * @returns - Array of legal moves
 */
function getMoves(row, col) {
  let moves = [];

  //All moves in front of knight
  moves.push([row + 1, col - 2]);
  moves.push([row + 2, col - 1]);
  moves.push([row + 2, col + 1]);
  moves.push([row + 1, col + 2]);

  //All moves behind knight
  moves.push([row - 1, col - 2]);
  moves.push([row - 2, col - 1]);
  moves.push([row - 2, col + 1]);
  moves.push([row - 1, col + 2]);

  moves = moves.filter(getLegalMoves);

  return moves;
}

/**
 * Callback function, tests if a move is within the bounds of
 * chessboard
 *
 * @param {Array} square - Coordinate of square
 * @returns - If move is legal or not
 */
function getLegalMoves(square) {
  return square[0] >= 0 && square[0] <= 7 && square[1] >= 0 && square[1] <= 7;
}

/**
 * Tests if square's coordinate is within bounds of chessboard
 *
 * @param {Array} square - Coordinate of square
 * @returns - If coordinate is within bounds of chessboard
 */
function squareOutOfBounds(square) {
  return square[0] < 0 || square[0] > 7 || square[1] < 0 || square[1] > 7;
}

/**
 * Prints path taken to get to end square
 *
 * @param {Array} square - Linked list like array where the head represents
 *                        the end coordinates and the tail is start coordinates
 */
function printPath(square) {
  //Will represent path of board traversal
  let path = [];

  //Until there are no more parent/predecessor squares
  while (square) {
    path.unshift([square[0], square[1]]);
    square = square.parent;
  }

  let pathString = "";

  //Append each coordinate within path to string
  path.forEach((step) => {
    pathString += `[${step[0]}, ${step[1]}]\n`;
  });

  //Print path
  console.log(
    `You made it in ${path.length - 1} ${path.length - 1 > 1 ? 'moves' : 'move'}! Here's your path: \n${pathString}`
  );
}

/**
 * Creates a chessboard and determines the shortest path from given start
 * and end coordinates
 *
 * @param {*} start - Start coordinates
 * @param {*} end  - End coordinates
 * @returns
 */
function knightMoves(start, end) {

  //Edge cases
  if (start === end) {
    console.log("Start and end cannot be the same.");
    return;
  } else if (squareOutOfBounds(start) && squareOutOfBounds(end)) {
    console.log("Start and end coordinates are out of bounds.");
    return;
  } else if (squareOutOfBounds(start)) {
    console.log("Start coordinate is out of bounds.");
    return;
  } else if (squareOutOfBounds(end)) {
    console.log("End coordinate is out of bounds.");
    return;
  }

  let board = createBoard();

  //Will record all of the nodes that have been visited
  let visited = [];

  //Enqueue starting square coordinate 
  let queue = [start];

  //While the queue is not empty
  while (queue.length > 0) {
    //Moves pointer for square
    let moves = 0;

    //Dequeue square in front of queue
    let currentSquare = queue.shift();

    //Row and column coordinates for current square
    let currentRow = currentSquare[0];
    let currentCol = currentSquare[1];

    //First see if current square is end square
    if (currentRow === end[0] && currentCol === end[1]) {
      visited.push(currentSquare);

      printPath(visited[visited.length - 1]);
      return;

      //If square has not yet been visited
    } else if  (squareVisited(visited, currentSquare) === false){
      visited.push(currentSquare);

      //If square has already been visited go to next coordinate in queue
    } else {
      continue;
    }

    let numMoves = board[currentRow][currentCol].length;

    //Enqueue unvisited children of current square
    while (moves < numMoves) {
      //Get next child of square
      let nextMove = board[currentRow][currentCol][moves];

      if (squareVisited(visited, nextMove) === false) {
        //Keep track of the predecessor node for each child inside of queue
        nextMove.parent = currentSquare;

        queue.push(nextMove);
      }

      moves++;
    }
  }
}

/**
 * Tests if square has been visited
 * 
 * @param {Array} arr - Array representing squares that have been visited
 * @param {Array} currentSquare - Array representing coordinates of current square
 * @returns 
 */
function squareVisited(arr, currentSquare) {
  //If array is empty, square has not been visited
  if (!arr) {
    return false;
  }

  let result = arr.every((square) => {
    //If square has already been visited, exit method by returning false
    if (square[0] === currentSquare[0] && square[1] === currentSquare[1]) {
      return false;
    } else {
      return true;
    }
  });

  //Result === false; square has been visited and vice versa
  return !result;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_knightsMove__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/knightsMove */ "./src/modules/knightsMove.js");


//Driver function
function main() {
  (0,_modules_knightsMove__WEBPACK_IMPORTED_MODULE_0__["default"])([6, 6], [4, 3]);
  // You made it in 3 moves! Here's your path: [6, 6]
  // [7, 4]
  // [5, 5]
  // [4, 3]

  (0,_modules_knightsMove__WEBPACK_IMPORTED_MODULE_0__["default"])([0, 0], [1, 2]);
  // You made it in 1 move! Here's your path:
  // [0, 0]
  // [1, 2]

  (0,_modules_knightsMove__WEBPACK_IMPORTED_MODULE_0__["default"])([3, 3], [0, 0]);
  // You made it in 2 moves! Here's your path:
  // [3, 3]
  // [2, 1]
  // [0, 0]
}

main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlLFdBQVcsRUFBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLFFBQVEsSUFBSSxRQUFRO0FBQzFDLEdBQUc7O0FBRUg7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUIsRUFBRSx1Q0FBdUMsd0JBQXdCLFdBQVc7QUFDbkg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFdBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7O0FBRUgsc0JBQXNCO0FBQ3RCO0FBQ0E7Ozs7Ozs7O1VDek1BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOK0Q7O0FBRS9EO0FBQ0E7QUFDQSxFQUFFLGdFQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxnRUFBVztBQUNiO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGdFQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvbW9kdWxlcy9rbmlnaHRzTW92ZS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBrbmlnaHRNb3ZlcztcblxuLyoqXG4gKiBDcmVhdGUgYSBjaGVzcyBib2FyZCB0aGF0IHN0b3JlcyBsZWdhbCBtb3ZlcyBmb3IgZWFjaCBzcXVhcmVcbiAqXG4gKiBAcmV0dXJucyBBcnJheSByZXByZXNlbnRpbmcgYSBjaGVzc2JvYXJkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA4OyByb3crKykge1xuICAgIGJvYXJkW3Jvd10gPSBbXTtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA4OyBjb2wrKykge1xuICAgICAgYm9hcmRbcm93XVtjb2xdID0gZ2V0TW92ZXMocm93LCBjb2wpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBib2FyZDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBsZWdhbCBtb3Zlcy9jaGlsZHJlbiBmb3IgYSBzcXVhcmVcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gcm93IC0gUm93IGNvb3JkaW5hdGUgb2Ygc3F1YXJlXG4gKiBAcGFyYW0ge051bWJlcn0gY29sIC0gQ29sdW1uIGNvb3JkaW5hdGUgb2Ygc3F1YXJlXG4gKiBAcmV0dXJucyAtIEFycmF5IG9mIGxlZ2FsIG1vdmVzXG4gKi9cbmZ1bmN0aW9uIGdldE1vdmVzKHJvdywgY29sKSB7XG4gIGxldCBtb3ZlcyA9IFtdO1xuXG4gIC8vQWxsIG1vdmVzIGluIGZyb250IG9mIGtuaWdodFxuICBtb3Zlcy5wdXNoKFtyb3cgKyAxLCBjb2wgLSAyXSk7XG4gIG1vdmVzLnB1c2goW3JvdyArIDIsIGNvbCAtIDFdKTtcbiAgbW92ZXMucHVzaChbcm93ICsgMiwgY29sICsgMV0pO1xuICBtb3Zlcy5wdXNoKFtyb3cgKyAxLCBjb2wgKyAyXSk7XG5cbiAgLy9BbGwgbW92ZXMgYmVoaW5kIGtuaWdodFxuICBtb3Zlcy5wdXNoKFtyb3cgLSAxLCBjb2wgLSAyXSk7XG4gIG1vdmVzLnB1c2goW3JvdyAtIDIsIGNvbCAtIDFdKTtcbiAgbW92ZXMucHVzaChbcm93IC0gMiwgY29sICsgMV0pO1xuICBtb3Zlcy5wdXNoKFtyb3cgLSAxLCBjb2wgKyAyXSk7XG5cbiAgbW92ZXMgPSBtb3Zlcy5maWx0ZXIoZ2V0TGVnYWxNb3Zlcyk7XG5cbiAgcmV0dXJuIG1vdmVzO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZ1bmN0aW9uLCB0ZXN0cyBpZiBhIG1vdmUgaXMgd2l0aGluIHRoZSBib3VuZHMgb2ZcbiAqIGNoZXNzYm9hcmRcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzcXVhcmUgLSBDb29yZGluYXRlIG9mIHNxdWFyZVxuICogQHJldHVybnMgLSBJZiBtb3ZlIGlzIGxlZ2FsIG9yIG5vdFxuICovXG5mdW5jdGlvbiBnZXRMZWdhbE1vdmVzKHNxdWFyZSkge1xuICByZXR1cm4gc3F1YXJlWzBdID49IDAgJiYgc3F1YXJlWzBdIDw9IDcgJiYgc3F1YXJlWzFdID49IDAgJiYgc3F1YXJlWzFdIDw9IDc7XG59XG5cbi8qKlxuICogVGVzdHMgaWYgc3F1YXJlJ3MgY29vcmRpbmF0ZSBpcyB3aXRoaW4gYm91bmRzIG9mIGNoZXNzYm9hcmRcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzcXVhcmUgLSBDb29yZGluYXRlIG9mIHNxdWFyZVxuICogQHJldHVybnMgLSBJZiBjb29yZGluYXRlIGlzIHdpdGhpbiBib3VuZHMgb2YgY2hlc3Nib2FyZFxuICovXG5mdW5jdGlvbiBzcXVhcmVPdXRPZkJvdW5kcyhzcXVhcmUpIHtcbiAgcmV0dXJuIHNxdWFyZVswXSA8IDAgfHwgc3F1YXJlWzBdID4gNyB8fCBzcXVhcmVbMV0gPCAwIHx8IHNxdWFyZVsxXSA+IDc7XG59XG5cbi8qKlxuICogUHJpbnRzIHBhdGggdGFrZW4gdG8gZ2V0IHRvIGVuZCBzcXVhcmVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzcXVhcmUgLSBMaW5rZWQgbGlzdCBsaWtlIGFycmF5IHdoZXJlIHRoZSBoZWFkIHJlcHJlc2VudHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGVuZCBjb29yZGluYXRlcyBhbmQgdGhlIHRhaWwgaXMgc3RhcnQgY29vcmRpbmF0ZXNcbiAqL1xuZnVuY3Rpb24gcHJpbnRQYXRoKHNxdWFyZSkge1xuICAvL1dpbGwgcmVwcmVzZW50IHBhdGggb2YgYm9hcmQgdHJhdmVyc2FsXG4gIGxldCBwYXRoID0gW107XG5cbiAgLy9VbnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBwYXJlbnQvcHJlZGVjZXNzb3Igc3F1YXJlc1xuICB3aGlsZSAoc3F1YXJlKSB7XG4gICAgcGF0aC51bnNoaWZ0KFtzcXVhcmVbMF0sIHNxdWFyZVsxXV0pO1xuICAgIHNxdWFyZSA9IHNxdWFyZS5wYXJlbnQ7XG4gIH1cblxuICBsZXQgcGF0aFN0cmluZyA9IFwiXCI7XG5cbiAgLy9BcHBlbmQgZWFjaCBjb29yZGluYXRlIHdpdGhpbiBwYXRoIHRvIHN0cmluZ1xuICBwYXRoLmZvckVhY2goKHN0ZXApID0+IHtcbiAgICBwYXRoU3RyaW5nICs9IGBbJHtzdGVwWzBdfSwgJHtzdGVwWzFdfV1cXG5gO1xuICB9KTtcblxuICAvL1ByaW50IHBhdGhcbiAgY29uc29sZS5sb2coXG4gICAgYFlvdSBtYWRlIGl0IGluICR7cGF0aC5sZW5ndGggLSAxfSAke3BhdGgubGVuZ3RoIC0gMSA+IDEgPyAnbW92ZXMnIDogJ21vdmUnfSEgSGVyZSdzIHlvdXIgcGF0aDogXFxuJHtwYXRoU3RyaW5nfWBcbiAgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2hlc3Nib2FyZCBhbmQgZGV0ZXJtaW5lcyB0aGUgc2hvcnRlc3QgcGF0aCBmcm9tIGdpdmVuIHN0YXJ0XG4gKiBhbmQgZW5kIGNvb3JkaW5hdGVzXG4gKlxuICogQHBhcmFtIHsqfSBzdGFydCAtIFN0YXJ0IGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0geyp9IGVuZCAgLSBFbmQgY29vcmRpbmF0ZXNcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIGtuaWdodE1vdmVzKHN0YXJ0LCBlbmQpIHtcblxuICAvL0VkZ2UgY2FzZXNcbiAgaWYgKHN0YXJ0ID09PSBlbmQpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IGFuZCBlbmQgY2Fubm90IGJlIHRoZSBzYW1lLlwiKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoc3F1YXJlT3V0T2ZCb3VuZHMoc3RhcnQpICYmIHNxdWFyZU91dE9mQm91bmRzKGVuZCkpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IGFuZCBlbmQgY29vcmRpbmF0ZXMgYXJlIG91dCBvZiBib3VuZHMuXCIpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChzcXVhcmVPdXRPZkJvdW5kcyhzdGFydCkpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IGNvb3JkaW5hdGUgaXMgb3V0IG9mIGJvdW5kcy5cIik7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKHNxdWFyZU91dE9mQm91bmRzKGVuZCkpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVuZCBjb29yZGluYXRlIGlzIG91dCBvZiBib3VuZHMuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgLy9XaWxsIHJlY29yZCBhbGwgb2YgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIHZpc2l0ZWRcbiAgbGV0IHZpc2l0ZWQgPSBbXTtcblxuICAvL0VucXVldWUgc3RhcnRpbmcgc3F1YXJlIGNvb3JkaW5hdGUgXG4gIGxldCBxdWV1ZSA9IFtzdGFydF07XG5cbiAgLy9XaGlsZSB0aGUgcXVldWUgaXMgbm90IGVtcHR5XG4gIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgLy9Nb3ZlcyBwb2ludGVyIGZvciBzcXVhcmVcbiAgICBsZXQgbW92ZXMgPSAwO1xuXG4gICAgLy9EZXF1ZXVlIHNxdWFyZSBpbiBmcm9udCBvZiBxdWV1ZVxuICAgIGxldCBjdXJyZW50U3F1YXJlID0gcXVldWUuc2hpZnQoKTtcblxuICAgIC8vUm93IGFuZCBjb2x1bW4gY29vcmRpbmF0ZXMgZm9yIGN1cnJlbnQgc3F1YXJlXG4gICAgbGV0IGN1cnJlbnRSb3cgPSBjdXJyZW50U3F1YXJlWzBdO1xuICAgIGxldCBjdXJyZW50Q29sID0gY3VycmVudFNxdWFyZVsxXTtcblxuICAgIC8vRmlyc3Qgc2VlIGlmIGN1cnJlbnQgc3F1YXJlIGlzIGVuZCBzcXVhcmVcbiAgICBpZiAoY3VycmVudFJvdyA9PT0gZW5kWzBdICYmIGN1cnJlbnRDb2wgPT09IGVuZFsxXSkge1xuICAgICAgdmlzaXRlZC5wdXNoKGN1cnJlbnRTcXVhcmUpO1xuXG4gICAgICBwcmludFBhdGgodmlzaXRlZFt2aXNpdGVkLmxlbmd0aCAtIDFdKTtcbiAgICAgIHJldHVybjtcblxuICAgICAgLy9JZiBzcXVhcmUgaGFzIG5vdCB5ZXQgYmVlbiB2aXNpdGVkXG4gICAgfSBlbHNlIGlmICAoc3F1YXJlVmlzaXRlZCh2aXNpdGVkLCBjdXJyZW50U3F1YXJlKSA9PT0gZmFsc2Upe1xuICAgICAgdmlzaXRlZC5wdXNoKGN1cnJlbnRTcXVhcmUpO1xuXG4gICAgICAvL0lmIHNxdWFyZSBoYXMgYWxyZWFkeSBiZWVuIHZpc2l0ZWQgZ28gdG8gbmV4dCBjb29yZGluYXRlIGluIHF1ZXVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCBudW1Nb3ZlcyA9IGJvYXJkW2N1cnJlbnRSb3ddW2N1cnJlbnRDb2xdLmxlbmd0aDtcblxuICAgIC8vRW5xdWV1ZSB1bnZpc2l0ZWQgY2hpbGRyZW4gb2YgY3VycmVudCBzcXVhcmVcbiAgICB3aGlsZSAobW92ZXMgPCBudW1Nb3Zlcykge1xuICAgICAgLy9HZXQgbmV4dCBjaGlsZCBvZiBzcXVhcmVcbiAgICAgIGxldCBuZXh0TW92ZSA9IGJvYXJkW2N1cnJlbnRSb3ddW2N1cnJlbnRDb2xdW21vdmVzXTtcblxuICAgICAgaWYgKHNxdWFyZVZpc2l0ZWQodmlzaXRlZCwgbmV4dE1vdmUpID09PSBmYWxzZSkge1xuICAgICAgICAvL0tlZXAgdHJhY2sgb2YgdGhlIHByZWRlY2Vzc29yIG5vZGUgZm9yIGVhY2ggY2hpbGQgaW5zaWRlIG9mIHF1ZXVlXG4gICAgICAgIG5leHRNb3ZlLnBhcmVudCA9IGN1cnJlbnRTcXVhcmU7XG5cbiAgICAgICAgcXVldWUucHVzaChuZXh0TW92ZSk7XG4gICAgICB9XG5cbiAgICAgIG1vdmVzKys7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVGVzdHMgaWYgc3F1YXJlIGhhcyBiZWVuIHZpc2l0ZWRcbiAqIFxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gQXJyYXkgcmVwcmVzZW50aW5nIHNxdWFyZXMgdGhhdCBoYXZlIGJlZW4gdmlzaXRlZFxuICogQHBhcmFtIHtBcnJheX0gY3VycmVudFNxdWFyZSAtIEFycmF5IHJlcHJlc2VudGluZyBjb29yZGluYXRlcyBvZiBjdXJyZW50IHNxdWFyZVxuICogQHJldHVybnMgXG4gKi9cbmZ1bmN0aW9uIHNxdWFyZVZpc2l0ZWQoYXJyLCBjdXJyZW50U3F1YXJlKSB7XG4gIC8vSWYgYXJyYXkgaXMgZW1wdHksIHNxdWFyZSBoYXMgbm90IGJlZW4gdmlzaXRlZFxuICBpZiAoIWFycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCByZXN1bHQgPSBhcnIuZXZlcnkoKHNxdWFyZSkgPT4ge1xuICAgIC8vSWYgc3F1YXJlIGhhcyBhbHJlYWR5IGJlZW4gdmlzaXRlZCwgZXhpdCBtZXRob2QgYnkgcmV0dXJuaW5nIGZhbHNlXG4gICAgaWYgKHNxdWFyZVswXSA9PT0gY3VycmVudFNxdWFyZVswXSAmJiBzcXVhcmVbMV0gPT09IGN1cnJlbnRTcXVhcmVbMV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICAvL1Jlc3VsdCA9PT0gZmFsc2U7IHNxdWFyZSBoYXMgYmVlbiB2aXNpdGVkIGFuZCB2aWNlIHZlcnNhXG4gIHJldHVybiAhcmVzdWx0O1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRlZmF1bHQgYXMga25pZ2h0TW92ZXMgfSBmcm9tIFwiLi9tb2R1bGVzL2tuaWdodHNNb3ZlXCI7XG5cbi8vRHJpdmVyIGZ1bmN0aW9uXG5mdW5jdGlvbiBtYWluKCkge1xuICBrbmlnaHRNb3ZlcyhbNiwgNl0sIFs0LCAzXSk7XG4gIC8vIFlvdSBtYWRlIGl0IGluIDMgbW92ZXMhIEhlcmUncyB5b3VyIHBhdGg6IFs2LCA2XVxuICAvLyBbNywgNF1cbiAgLy8gWzUsIDVdXG4gIC8vIFs0LCAzXVxuXG4gIGtuaWdodE1vdmVzKFswLCAwXSwgWzEsIDJdKTtcbiAgLy8gWW91IG1hZGUgaXQgaW4gMSBtb3ZlISBIZXJlJ3MgeW91ciBwYXRoOlxuICAvLyBbMCwgMF1cbiAgLy8gWzEsIDJdXG5cbiAga25pZ2h0TW92ZXMoWzMsIDNdLCBbMCwgMF0pO1xuICAvLyBZb3UgbWFkZSBpdCBpbiAyIG1vdmVzISBIZXJlJ3MgeW91ciBwYXRoOlxuICAvLyBbMywgM11cbiAgLy8gWzIsIDFdXG4gIC8vIFswLCAwXVxufVxuXG5tYWluKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=