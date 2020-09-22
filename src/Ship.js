import {
    grid,
    aiGrid
} from "./index"

// FF encapsulation - importance of this.property vs property in accessors
export function Ship(playerType, ship) {
    let type = playerType;
    let name = ship;
    let selected = "none";
    let orientation = "horizontal";
    let length = null;
    let location = []; // array of coordinates, passed in from Gameboard during placement
    let hitCount = 0;
    switch (ship) {
        case "carrier":
            length = 5;
            break;
        case "battleship":
            length = 4;
            break;
        case "cruiser":
            length = 3;
            break;
        case "submarine":
            length = 3;
            break;
        case "destroyer":
            length = 2;
            break;
    }
    return {
        get isSunk() {
            if (hitCount === length) return true;
            else return false;
        },
        set hit(strike) {
            if (location.includes(strike) && (type === "player" && strike.parentNode.className === "player-container")) {
                // strike hits one of the placement coordinates (return true)
                strike.innerHTML = "&#10006"; // mark the hit location
                hitCount++;
            } else if (location.includes(strike) && (type === "ai" && strike.parentNode.className === "ai-container")) {
                strike.innerHTML = "&#10006";
                hitCount++;
            }
        },
        set orient(val) {
            if (val === "hozirontal" || val === "vertical") {
                this.orientation = val;
            } else throw "invalid input";
        },
        get currentPos() {
            return this.location;
        },
        set setPos(loc) {
            if (grid.includes(loc) || aiGrid.includes(loc)) {
                location = location.concat(loc);
                this.location = location;
            } else if (loc === "clear") {
                let newLoc = [];
                this.location = newLoc;
            } else throw "Invalid Input";
        },
        set selection(val) {
            this.selected = val;
        },
        get selection() {
            return this.selected;
        },
        type,
        name,
        length,
        location,
        selected,
    };
}