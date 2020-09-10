// FF encapsulation
export function Ship(ship, orientIn, loc, strike) {
    let name = ship;
    let length = null;
    let orient = orientIn; // user input
    let location = loc; // array of coordinates, passed in from Gameboard during placement
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
    // potentially modularize the methods below (single responsibility)
    // hit() is called in Gameboard to mark the hit spot.
    const hit = () => {
        if (location.find((coord) => coord == strike)) {
            // strike hits one of the placement coordinates (return true)
            grid[coord].innerHTML = "O"; // mark the hit location
            hitCount++;
        }
    };
    const isSunk = () => {
        if (hitCount === length) return true;
    };
    return {
        name,
        length,
        orient,
    };
}