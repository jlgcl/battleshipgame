// FF encapsulation - importance of this.property vs property in accessors

export function Ship(ship) {
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
            if (this.hitCount === length) return true;
            else return false;
        },
        set hit(strike) {
            if (location.find((coord) => coord == strike)) {
                // strike hits one of the placement coordinates (return true)
                grid[coord].innerHTML = "O"; // mark the hit location
                this.hitCount++;
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
            if (Number.isInteger(loc)) {
                let newLoc = location.concat(loc);
                this.location = newLoc;
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
        name,
        length,
        location,
        selected,
    };
}