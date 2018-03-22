var fourRoomsApp = function (d) {
    "use strict";

    /* Key options:
     * ArrowUp, ArrowRight, ArrowLeft, ArrowDown
     * 8 (up), 6 (right), 4 (left), 2 (down)
     * u (up), k (right), h (left), n (down) */

    var model = {
        htmlTargets: d.targets,
        actionKeys: ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown", "8", "6", "4", "2", "u", "k", "h", "n"],
        pos: [250, 250], // x, y
        incr: 25,
        perimeter: {
            x: [0, 500], // min, max
            y: [0, 500]
        },
        rooms: {
            M: {
                perimeter: {
                    x: [175, 325],
                    y: [175, 325]
                }
            },
            A: {
                perimeter: {
                    x: [0, 150],
                    y: [0, 150]
                }
            },
            B: {
                perimeter: {
                    x: [0, 150],
                    y: [175, 325]
                }
            },
            C: {
                perimeter: {
                    x: [350, 500],
                    y: [175, 325]
                }
            },
            D: {
                perimeter: {
                    x: [350, 500],
                    y: [350, 500]
                }
            }
        }
    };

    // views
    function renderPointer(pos) {
        var pointerEl = model.htmlTargets.pointer;
        pointerEl.style.left = pos[0].toString() + "px";
        pointerEl.style.top = pos[1].toString()  + "px";
    }

    function movePointer(k) {
        // Takes in the key name <str>.
        var x = model.pos[0];
        var y = model.pos[1];
        const incr = model.incr;
        const limitX = model.perimeter.x;
        const limitY = model.perimeter.x;

        if (model.actionKeys.indexOf(k) > -1) {
            if (k === "ArrowUp" || k === "8" || k === "u") {
                if (y > limitY[0]) {
                    if (x > 150 && y === 175) {
                        console.log("out of bounds");
                    } else if (x !== 125 && y ===175) {
                        console.log("that's a wall");
                    } else if (x !== 375 && y === 350) {
                        console.log("that's a wall");
                    } else {
                        y -= incr; // up
                    }
                } else {
                    console.log("out of bounds");
                }
            } else if (k === "ArrowRight" || k === "6" || k === "k") {
                if (x < limitX[1]) {
                    if (x === 150 && y < 175) {
                        console.log("out of bounds");
                    } else if (x === 150 & y !== 250) {
                        console.log("that's a wall");
                    } else if (x === 325 && y !== 250) {
                        console.log("that's a wall");
                    } else {
                        x += incr; // right
                    }
                } else {
                    console.log("out of bounds");
                }
            } else if (k === "ArrowLeft" || k === "4" || k === "h") {
                if (x > limitX[0]) {
                    if (x === 350 && y > 325) {
                        console.log("out of bounds");
                    } else if (x === 175 & y !== 250) {
                        console.log("that's a wall");
                    } else if (x === 350 && y !== 250) {
                        console.log("that's a wall");
                    } else {
                        x -= incr; // left
                    }
                } else {
                    console.log("out of bounds");
                }
            } else {
                if (y < limitY[1]) {
                    if (x < 350 && y === 325) {
                        console.log("out of bounds");
                    } else if (x !== 125 && y === 150) {
                        console.log("that's a wall");
                    } else if (x !== 375 && y === 325) {
                        console.log("that's a wall");
                    } else {
                        y += incr; // down
                    }
                } else {
                    console.log("out of bounds");
                }
            }
            model.pos = [x, y];
        }
    }

    // controller
    document.addEventListener("keydown", function (item) {
        const keyName = item.key;
        movePointer(keyName);
        renderPointer(model.pos);
        console.log(model.pos);
    });

    function init() {
        renderPointer(model.pos);
    }
    init();
};
fourRoomsApp(data);