import {
    aiGrid,
    grid
} from "./index.js";
import {
    placeAIShip
} from "./shipPlacement";
import {
    shipAttack
} from "./shipAttack";

let playerShips = document.getElementsByClassName("playerShips");
let aiShipsCol = document.getElementsByClassName("aiShips");
let selectionShips = document.getElementsByClassName("shipSelection");
let start = document.getElementsByClassName("start");
let restart = document.getElementsByClassName("restart");

export function gameStart(ships, aiShips) {
    let restartCnt = 0; // counter to reset the AI ships after reset
    let startCnt = 0; // counter to check start to execute the game

    // start button clicked
    start[0].addEventListener("click", (e) => {
        e.preventDefault();
        startCnt = 1;
        let isShipPlaced = ships.every((ship) => ship.currentPos.length !== 0); // check length of FF property through getter
        if (isShipPlaced) {
            start[0].style.display = "none";
            restart[0].style.display = "unset";
            selectionShips[0].style.display = "none";
            playerShips[0].style.display = "flex";
            aiShipsCol[0].style.display = "flex";

            grid.forEach((unit) => (unit.style.pointerEvents = "none"));
            aiGrid.forEach(unit => unit.style.pointerEvents = "unset");

            if (restartCnt === 1) {
                restartCnt = 0;
                placeAIShip(aiShips);
            }
            if (startCnt == 1) shipAttack(ships, aiShips);
        }
    });

    // restart button clicked
    restart[0].addEventListener("click", (e) => {
        e.preventDefault();
        startCnt = 0;
        restartCnt = 1;
        start[0].style.display = "unset";
        restart[0].style.display = "none";
        aiGrid.forEach(unit => unit.style.pointerEvents = "none");

        selectionShips[0].style.display = "unset";
        playerShips[0].style.display = "none";
        aiShipsCol[0].style.display = "none";

        // clear ship positions
        aiShips.forEach((ship) => {
            ship.setPos = "clear";
            ship.selection = "none";
        });
        ships.forEach((ship) => {
            ship.setPos = "clear";
            ship.selection = "none";
        });
        // clear grid values set during ship placement
        grid.map((unit) => {
            unit.style.background = "rgb(214, 199, 112)";
            unit.innerHTML = "";
            unit.value = "";
            unit.style.pointerEvents = "unset";
        });
        aiGrid.map((unit) => {
            unit.style.background = "#6b5d5d";
            unit.innerHTML = "";
            unit.value = "";
            unit.style.pointerEvents = "unset";
        });
    });

}