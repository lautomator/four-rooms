var fourRoomsApp = function (d) {
    "use strict";

    /* Key options:
     * ArrowUp, ArrowRight, ArrowLeft, ArrowDown
     * 8 (up), 6 (right), 4 (left), 2 (down)
     * u (up), k (right), h (left), n (down) */

    var model = {
        htmlTargets: d.targets,
        actionKeys: ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown", "8", "6", "4", "2", "u", "k", "h", "n"],
        pos: [25, 25], // x, y
        incr: 25,
        perimeter: {
            x: [25, 575], // min, max
            y: [25, 575]
        },
        rooms: {
            roomA: {
                perimeter: {
                    h: [25, 25],    // height: x, y
                    w: [425, 200]   // width:: x, y
                },
                doors: [
                    {
                        x: [175, 200],  // x: start, end
                        y: [225, 225]   // y: start, end
                    },
                    {
                        x: [300, 325],
                        y: [225, 225]
                    }
                ]
            },
            roomB: {
                perimeter: {
                    h: [475, 25],
                    w: [575, 200]
                },
                doors: [
                    {
                        x: [500, 525],
                        y: [225, 225]
                    }
                ]
            },
            roomC: {
                perimeter: {
                    h: [25, 250],
                    w: [225, 575]
                },
                doors: [
                    {
                        x: [175, 200],
                        y: [225, 225]
                    }
                ]
            },
            roomD: {
                perimeter: {
                    h: [275, 250],
                    w: [575, 575]
                },
                doors: [
                    {
                        x: [300, 325],
                        y: [225, 225]
                    },
                    {
                        x: [500, 525],
                        y: [225, 225]
                    }
                ]
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
        const perim = model.perimeter;

        if (model.actionKeys.indexOf(k) > -1) {
            if (k === "ArrowUp" || k === "8" || k === "u") {
                // if (y > limitY[0]) {
                //     if (x > 150 && y === 175) {
                //         console.log("out of bounds");
                //     } else if (x !== 125 && y ===175) {
                //         console.log("that's a wall");
                //     } else if (x !== 375 && y === 350) {
                //         console.log("that's a wall");
                //     } else {
                //         y -= incr; // up
                //     }
                // } else {
                //     console.log("out of bounds");
                // }

                if (y > perim.y[0]) {
                    y -= incr; // up
                }
            } else if (k === "ArrowRight" || k === "6" || k === "k") {
                // if (x < limitX[1]) {
                //     if (x === 150 && y < 175) {
                //         console.log("out of bounds");
                //     } else if (x === 150 & y !== 250) {
                //         console.log("that's a wall");
                //     } else if (x === 325 && y !== 250) {
                //         console.log("that's a wall");
                //     } else {
                //         x += incr; // right
                //     }
                // } else {
                //     console.log("out of bounds");
                // }

                if (x < perim.x[1]) {
                    x += incr; // right
                }
            } else if (k === "ArrowLeft" || k === "4" || k === "h") {
                // if (x > limitX[0]) {
                //     if (x === 350 && y > 325) {
                //         console.log("out of bounds");
                //     } else if (x === 175 & y !== 250) {
                //         console.log("that's a wall");
                //     } else if (x === 350 && y !== 250) {
                //         console.log("that's a wall");
                //     } else {
                //         x -= incr; // left
                //     }
                // } else {
                //     console.log("out of bounds");
                // }
                if (x > perim.x[0]) {
                    x -= incr; // left
                }

            } else {
                // if (y < limitY[1]) {
                //     if (x < 350 && y === 325) {
                //         console.log("out of bounds");
                //     } else if (x !== 125 && y === 150) {
                //         console.log("that's a wall");
                //     } else if (x !== 375 && y === 325) {
                //         console.log("that's a wall");
                //     } else {
                //         y += incr; // down
                //     }
                // } else {
                //     console.log("out of bounds");
                // }

                if (y < perim.y[1]) {
                    y += incr; // down
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