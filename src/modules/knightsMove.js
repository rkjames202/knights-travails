export default knightMoves;

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
 * @param {Number} start - Start coordinates
 * @param {Number} end  - End coordinates
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

