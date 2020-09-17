import {
    grid,
    board,
    aiGrid,
    reset
} from "./index";

export function boardReset(ships) {
    reset[0].addEventListener("click", (e) => {
        e.preventDefault();
        ships.forEach(ship => {
            ship.setPos = "clear";
            ship.selection = "none";
        });
        grid.map(unit => unit.style.background = "rgb(214, 199, 112)");
    })
}