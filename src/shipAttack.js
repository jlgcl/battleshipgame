import {
    grid,
    aiGrid
} from "./index";

export function shipAttack(ships, aiShips) {

    // initialize these AI variables outside the execution function:
    let attArr = [];
    for (let i = 0; i < 100; i++) attArr.push(i);
    let attInd = Math.floor(Math.random() * (attArr.length - 1));
    let attLoc = grid[attArr[attInd]];

    // player attack
    aiGrid.map(unit => {
        unit.addEventListener("click", (e) => {
            e.preventDefault();
            for (let ship of aiShips) {
                if (ship.currentPos.includes(unit)) {
                    ship.hit = unit;
                    //if (ship.isSunk) sunkShip(ship);
                    break; // prevent iterating to the next ship ("X")
                } else {
                    unit.innerHTML = "&#9675";
                }
            }
            setTimeout(() => {
                // STATUS: add logic for contiguous attack if a ship is found
                // AI attack - can't modularize since separate function would reinitialize attArr @ every call
                for (let ship of ships) {
                    if (ship.currentPos.includes(attLoc)) {
                        ship.hit = attLoc;
                        break;
                    } else {
                        attLoc.innerHTML = "&#9675";
                    }
                }
                attArr.splice(attInd, 1);
                attInd = Math.floor(Math.random() * (attArr.length - 1));
                attLoc = grid[attArr[attInd]];
            }, 1000);
        })
    })
}




function sunkShip(ship) {

}