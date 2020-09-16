import {
    grid,
    board,
    aiGrid
} from "./index";

// RESOLVED ISSUE: function saves previous ship selection to call stack
// that's because ship event listener adds new unit.addEventListener whenever it's the ship is clicked (nested event listeners not good)
function placeShip(ships) {
    var shipChoice = "";
    for (let unit of grid) {
        let index = grid.indexOf(unit);
        unit.addEventListener("click", (e) => { // attaches event listeners w/ this callback to each grid unit
            for (let ship of ships) {
                if (ship.selected === "staged") shipChoice = ship;
            }
            if (shipChoice !== "") {
                placeHoriz(shipChoice, index, unit, grid);
                // shipChoice.selection = "placed"; // different variable name, but changes original's property
                shipChoice = "";
            } else alert("ship already placed");
        });
    }
}

function placeAIShip(ships) {
    let randArr = [];
    let randOrient = Math.floor(Math.random());

    for (let i = 0; i < 100; i++) {
        randArr.push(i);
    }

    let randIndex = Math.round(Math.random() * (randArr.length - 1));
    let randPos = randArr[randIndex];
    let aiUnit = aiGrid[randPos];
    let randLoc = aiGrid.indexOf(aiUnit);
    console.log(randIndex);

    for (let ship of ships) {
        while (ship.selection !== "placed") {
            if (randOrient === 1) placeHoriz(ship, randLoc, aiUnit, aiGrid);
            else if (randOrient === 0) placeVert(ship, randLoc, aiUnit, aiGrid);

            // re-declare the values after obtaining new random number
            randOrient = Math.round(Math.random());
            randArr.splice(randIndex, 1); // prevent repeat random number
            randIndex = Math.floor(Math.random() * (randArr.length - 1));
            console.log(randIndex);
            randPos = randArr[randIndex];
            aiUnit = aiGrid[randPos];
            randLoc = aiGrid.indexOf(aiUnit);
            if (randArr.length === 0) break;
        }
    }
}

function placeHoriz(ship, index, unit, gridBoard) {
    let checker = 0;
    if (unit.innerHTML === "") {
        // for-loop in series to check the x-limit
        for (let i = index; i < index + ship.length; i++) {
            if (gridBoard[i] !== undefined) {
                if (gridBoard[i].innerHTML === "" && xyFinder(i).i === xyFinder(index).i) {
                    checker++;
                }
            }
        }
        for (let i = index; i < index + ship.length; i++) {
            if (checker === ship.length) {
                gridBoard[i].innerHTML = "X";
                ship.selection = "placed"; // set "placed" only after actual placement
            }
        }
    }
}

function placeVert(ship, index, unit, gridBoard) {
    let checker = 0;
    if (unit.innerHTML === "") {
        for (let j = index; j < index + 10 * ship.length; j = j + 10) {
            if (gridBoard[j] !== undefined) {
                if (grid[j].innerHTML === "" && xyFinder(j).j === xyFinder(index).j) {
                    checker++;
                }
            }
        }
        for (let j = index; j < index + 10 * ship.length; j = j + 10) {
            if (checker === ship.length && grid[j] !== undefined) {
                gridBoard[j].innerHTML = "X";
                ship.selection = "placed"; // set "placed" only after actual placement
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
                    j,
                };
        }
    }
}

export {
    placeShip,
    placeAIShip,
    placeHoriz,
    placeVert
}