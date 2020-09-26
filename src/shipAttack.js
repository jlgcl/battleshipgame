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
    let surroundHits = []; // used to store surrounding target hit locations if a ship is hit
    let surCollection = []; // used for checking first and subsequent hits
    let recentHit = [];

    /// PLAYER ATTACK ///
    aiGrid.map(unit => {
        unit.addEventListener("click", (e) => {
            if (unit.innerHTML === "") {
                e.preventDefault();
                for (let ship of aiShips) {
                    if (ship.currentPos.includes(unit)) {
                        ship.hit = unit;
                        if (ship.isSunk) {
                            sunkHandler(ship);
                            winHandler(ships, aiShips);
                        }
                        break; // prevent iterating to the next ship ("X")
                    } else {
                        unit.innerHTML = "&#9675";
                    }
                }
                setTimeout(() => {
                    let hitCheck = false;
                    /// AI ATTACK /// - can't modularize since separate function would reinitialize attArr @ every call
                    for (let ship of ships) {
                        if (ship.currentPos.includes(attLoc)) {
                            ship.hit = attLoc;
                            if (ship.isHit && !ship.isSunk) {
                                hitCheck = true;
                                surCollection.push("first");
                            } else if (ship.isSunk) {
                                sunkHandler(ship);
                                winHandler(ships, aiShips);
                            }
                            // contains all the surrounding grid locations
                            break;
                        } else {
                            hitCheck = false;
                            attLoc.innerHTML = "&#9675";
                        }
                    }

                    //#region 
                    ///// AI ATTACK OPERATION /////
                    // after a first hit, try the bottom of the previous hit location after initiating an array including the surrounding areas
                    if (hitCheck && surCollection.length === 1) {
                        // check surrounding coordinates for out of bounds or pre-existing markers
                        if (grid[attArr[attInd] - 1] !== undefined && grid[attArr[attInd] - 1].innerHTML === "") surroundHits.push(attArr[attInd] - 1);
                        if (grid[attArr[attInd] + 1] !== undefined && grid[attArr[attInd] + 1].innerHTML === "") surroundHits.push(attArr[attInd] + 1);
                        if (grid[attArr[attInd] - 10] !== undefined && grid[attArr[attInd] - 10].innerHTML === "") surroundHits.push(attArr[attInd] - 10);
                        if (grid[attArr[attInd] + 10] !== undefined && grid[attArr[attInd] + 10].innerHTML === "") surroundHits.push(attArr[attInd] + 10);
                        attLoc = grid[surroundHits[surroundHits.length - 1]];
                        surroundHits.splice(-1, 1);
                        hitCheck = false;
                    }
                    // if while trying to hit at surrounding location & hits the ship
                    else if (hitCheck && surCollection.length > 1) {
                        /// logic for hit towards that direction until sunkCheck === true ///
                        // STATUS: REFACTOR THE CODE: SEARCH THE SURROUNDING; IF ANY CONTAINS VALUE = "HIT", THEN DETERMINE ITS DIRECTION THEN HIT AWAY FROM THAT DIRECTION
                        if (grid[recentHit[recentHit.length - 1] - 1].innerHTML === "✖") {
                            attLoc = grid[recentHit[recentHit.length - 1] + 1];
                            recentHit.push(recentHit[recentHit.length - 1] + 1)
                        } else if (grid[recentHit[recentHit.length - 1] + 1].innerHTML === "✖") {
                            attLoc = grid[recentHit[recentHit.length - 1] - 1];
                            recentHit.push(recentHit[recentHit.length - 1] - 1)
                        } else if (grid[recentHit[recentHit.length - 1] - 10].innerHTML === "✖") {
                            attLoc = grid[recentHit[recentHit.length - 1] + 10];
                            recentHit.push(recentHit[recentHit.length - 1] + 10)
                        } else if (grid[recentHit[recentHit.length - 1] + 10].innerHTML === "✖") {
                            attLoc = grid[recentHit[recentHit.length - 1] - 10];
                            recentHit.push(recentHit[recentHit.length - 1] - 10)
                        }
                        // reset
                        hitCheck = false;
                    }
                    // if hit fails & surrounding hit options not depleted yet, try different locations left in the surroundHits array
                    else if (!hitCheck && surroundHits.length > 0) {
                        attLoc = grid[surroundHits[surroundHits.length - 1]];
                        recentHit.push(surroundHits[surroundHits.length - 1]);
                        surroundHits.splice(-1, 1);
                    }
                    // review later... generate random locations for remaining empty locations
                    else {
                        while (grid[attInd].innerHTML !== "") {
                            if (grid[attInd].innerHTML === "") break;
                            attInd = Math.floor(Math.random() * 100);
                        }
                        attLoc = grid[attArr[attInd]];
                        // if a ship is done sinking, reset surCollection
                        if (surroundHits.length === 0 && surCollection.length > 0) {
                            surCollection = [];
                        }
                    }
                }, 1000);
                //#endregion
            }

        }, false)
    })
}

function sunkHandler(ship) {
    if (ship.type === "player") {
        let parentClass = document.getElementsByClassName("playerShips")[0];
        let parentType = parentClass.getElementsByClassName("playships")[0];
        let shipInd = parentType.getElementsByClassName(ship.name)[0];
        let shipUnits = Array.from(shipInd.getElementsByClassName("playership"));
        shipUnits.map(unit => unit.style.background = "rgb(34, 28, 28");
    } else if (ship.type === "ai") {
        let parentClass = document.getElementsByClassName("aiShips")[0];
        let parentType = parentClass.getElementsByClassName("playships")[0];
        let shipInd = parentType.getElementsByClassName(ship.name)[0];
        let shipUnits = Array.from(shipInd.getElementsByClassName("aiship"));
        shipUnits.map(unit => unit.style.background = "rgb(34, 28, 28");
    }
}

function winHandler(ships, aiShips) {
    if (ships.every(ship => ship.isSunk)) {
        alert("AI Wins!");
        grid.map(unit => unit.style.pointerEvents = "none");
        aiGrid.map((unit) => unit.style.pointerEvents = "none");
    }
    if (aiShips.every(ship => ship.isSunk)) {
        alert("Player Wins!");
        grid.map(unit => unit.style.pointerEvents = "none");
        aiGrid.map((unit) => unit.style.pointerEvents = "none");
    }
}