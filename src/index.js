import { default as knightMoves } from "./modules/knightsMove";

//Driver function
function main() {
  knightMoves([6, 6], [4, 3]);
  // You made it in 3 moves! Here's your path: [6, 6]
  // [7, 4]
  // [5, 5]
  // [4, 3]

  knightMoves([0, 0], [1, 2]);
  // You made it in 1 move! Here's your path:
  // [0, 0]
  // [1, 2]

  knightMoves([3, 3], [0, 0]);
  // You made it in 2 moves! Here's your path:
  // [3, 3]
  // [2, 1]
  // [0, 0]
}

main();
