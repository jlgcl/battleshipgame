/*
    METHODS:
    Ship FF: create ships objects, their lengths, hit/not, isSunk(), orientation?
    Gameboard FF: place ships (using Ship function), receiveAttack (receives coordinates, determine if it hit a ship, then sends the 'hit' function to the correct ship)
    Player: take turns attacking

    REMEMBER OOP:
    - encapsulation, inheritance, abstraction, polymorphism

    REMEMBER SOLID:
    S: single Responsibility
    O: methods not open to modification, but extension only
    L: abstraction that can be instantiated broadly (birdsFly -> eagles -> chicken?)
    I: parent methods don't have properties that aren't needed in any instances
    D: don't need to depend on or know the details of children implementation - create abstractions

    REMEMBER FP (NOT USED HERE):
    1) pure functions (try to use recursions)
    2) declarative (avoid statements & operators)
    3) immutability (pay attention to objects)
    4) no shared state
    5) composition - inheritance required since we are working with ships
    6) avoid side effects
*/

import {
  Gameboard
} from "./Gameboard";

let gridCollection = document.getElementsByClassName("player-item");
let aiCollection = document.getElementsByClassName("ai-item");
let rotate = document.getElementsByClassName("rotate");
let shipsDiv = document.getElementsByClassName("ships");
let reset = document.getElementsByClassName("reset");
let grid = Array.from(gridCollection);
let aiGrid = Array.from(aiCollection);

// reference board
let board = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
  [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
  [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
  [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
  [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
];
// may need an index finder to translate coordinate to grid # vice-versa.

export {
  board,
  grid,
  aiGrid,
  rotate,
  shipsDiv,
  reset
};

Gameboard();