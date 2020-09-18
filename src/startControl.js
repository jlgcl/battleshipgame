import {
    grid
} from "./index.js";
import {
    placeAIShip
} from "./shipPlacement";

let playerShips = document.getElementsByClassName("playerShips");
let aiShipsCol = document.getElementsByClassName("aiShips");
let selectionShips = document.getElementsByClassName("shipSelection");
let start = document.getElementsByClassName("start");
let restart = document.getElementsByClassName("restart");

export function gameStart(ships, aiShips) {
    let restartCnt = 0; // counter to reset the AI ships after reset

    start[0].addEventListener("click", (e) => {
        e.preventDefault();
        let isShipPlaced = ships.every(ship => ship.currentPos.length !== 0);
        if (isShipPlaced) {
            start[0].style.display = "none";
            restart[0].style.display = "unset";
            selectionShips[0].style.display = "none";
            playerShips[0].style.display = "flex";
            aiShipsCol[0].style.display = "flex";

            grid.forEach(unit => unit.style.pointerEvents = "none");

            if (restartCnt === 1) {
                restartCnt = 0;
                placeAIShip(aiShips);
            }
        }
    })
    restart[0].addEventListener("click", (e) => {
        e.preventDefault();
        restartCnt = 1;
        start[0].style.display = "unset";
        restart[0].style.display = "none";

        selectionShips[0].style.display = "unset";
        playerShips[0].style.display = "none";
        aiShipsCol[0].style.display = "none";


        aiShips.forEach(ship => {
            ship.setPos = "clear";
            ship.selection = "none";
        });
        ships.forEach(ship => {
            ship.setPos = "clear";
            ship.selection = "none";
        });
        grid.map(unit => {
            unit.style.background = "rgb(214, 199, 112)";
            unit.value = "";
            unit.style.pointerEvents = "unset";
        });
    })
}