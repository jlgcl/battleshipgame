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

let shipCollection = document.getElementsByClassName("ship-item");
let shipSelect = Array.from(shipCollection);

export function Gameboard() {
    // ship instances - player (manual)
    let carrier = Ship("carrier");
    let battleship = Ship("battleship");
    let cruiser = Ship("cruiser");
    let submarine = Ship("submarine");
    let destroyer = Ship("destroyer");
    let ships = [carrier, battleship, cruiser, submarine, destroyer];
    // ship instances - AI
    let aiCarrier = Ship("carrier");
    let aiBattleship = Ship("battleship");
    let aiCruiser = Ship("cruiser");
    let aiSubmarine = Ship("submarine");
    let aiDestroyer = Ship("destroyer");
    let aiShips = [aiCarrier, aiBattleship, aiCruiser, aiSubmarine, aiDestroyer];

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