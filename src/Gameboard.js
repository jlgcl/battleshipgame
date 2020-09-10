import {
    board,
    grid
} from "./index.js";
import {
    Ship
} from "./Ship";

let shipCollection = document.getElementsByClassName("ship-item");
let shipSelect = Array.from(shipCollection);

export function Gameboard() {
    // ship placements - manual
    let carrier = Ship("carrier", null, null, null);
    let battleship = Ship("battleship", null, null, null);
    let cruiser = Ship("cruiser", null, null, null);
    let submarine = Ship("submarine", null, null, null);
    let destroyer = Ship("destroyer", null, null, null);
    let ships = [carrier, battleship, cruiser, submarine, destroyer];

    shipSelect.map(select => {
        select.addEventListener("click", (e) => {
            for (let ship of ships) {
                if (ship.name === select.parentNode.className) placeShip(ship);
            }
        })
    })
}

function placeShip(ship) {
    ship.orient = "horizontal"; // placeholder for testing
    //console.log(ship);
    grid.map(unit => {
        unit.addEventListener("click", (e) => {
            let index = grid.indexOf(unit);
            if (ship.orient === "horizontal") {
                placeHoriz(ship, index, e);
            }
            if (ship.orient === "vertical") {
                placeVert(ship, index, e);
            }
        })
    })
}

function placeHoriz(ship, index, e) {
    console.log(ship);
    let checker = 0;
    if (e.target.innerHTML === "") {
        // for-loop in series to check the x-limit
        for (let i = index; i < index + ship.length; i++) {
            if (grid[i].innerHTML === "" && xyFinder(i).i === xyFinder(index).i) {
                checker++;
            }
        }
        for (let i = index; i < index + ship.length; i++) {
            if (checker === ship.length) {
                grid[i].innerHTML = "X";
            }
        }
    }
}

function placeVert(ship, index, e) {
    let checker = 0;
    if (e.target.innerHTML === "") {
        for (let j = index; j < index + (10 * ship.length); j = j + 10) {
            if (grid[j] !== undefined) {
                if (grid[j].innerHTML === "" && xyFinder(j).j === xyFinder(index).j) {
                    checker++;
                }
            }
        }
        for (let j = index; j < index + (10 * ship.length); j = j + 10) {
            if (checker === ship.length && grid[j] !== undefined) {
                grid[j].innerHTML = "X";
            }
        }
    }
}

function xyFinder(index) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (index === board[i][j])
                return {
                    i,
                    j
                };
        }
    }
}