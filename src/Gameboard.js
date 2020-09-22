import {
    board,
    grid,
    aiGrid
} from "./index.js";
import {
    Ship
} from "./Ship";
import {
    placeShip,
    placeAIShip,
    placeHoriz,
    placeVert
} from "./shipPlacement";
import {
    boardReset
} from "./boardReset";
import {
    gameStart
} from "./startControl";

let shipCollection = document.getElementsByClassName("ship-item");
let shipSelect = Array.from(shipCollection);

function Gameboard() {
    // ship instances - player (manual)
    let carrier = Ship("player", "carrier");
    let battleship = Ship("player", "battleship");
    let cruiser = Ship("player", "cruiser");
    let submarine = Ship("player", "submarine");
    let destroyer = Ship("player", "destroyer");
    let ships = [carrier, battleship, cruiser, submarine, destroyer];
    // ship instances - AI
    let aiCarrier = Ship("ai", "carrier");
    let aiBattleship = Ship("ai", "battleship");
    let aiCruiser = Ship("ai", "cruiser");
    let aiSubmarine = Ship("ai", "submarine");
    let aiDestroyer = Ship("ai", "destroyer");
    let aiShips = [aiCarrier, aiBattleship, aiCruiser, aiSubmarine, aiDestroyer];

    aiGrid.forEach(unit => unit.style.pointerEvents = "none");

    gameStart(ships, aiShips);
    shipSelector(ships);
    placeShip(ships);
    placeAIShip(aiShips);
    boardReset(ships);
}

function shipSelector(ships) {
    var clickHandler = function (e) {
        for (let ship of ships) {
            if (ship.name === e.target.parentNode.className && ship.selected === "none") {
                ship.selection = "staged";
            }
        }
    }
    shipSelect.map((select) => {
        // REMEMBER: this function's scope is lost inside the callback (closure)
        select.addEventListener("click", clickHandler, false);
    });
}

export {
    Gameboard,
    shipSelect
}