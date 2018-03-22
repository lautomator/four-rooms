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
        roomSize: [175, 175] // w, h
    };

    // views
    function renderPointer(pos) {
        var pointerEl = model.htmlTargets.pointer;
        pointerEl.style.left = pos[0].toString() + "px";
        pointerEl.style.top = pos[1].toString()  + "px";
    }

    function renderRooms(dimensions) {
        var roomEl = model.htmlTargets.mainRoom;
        roomEl.style.width = dimensions[0];
        roomEl.style.height = dimensions[1];
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
                // check perimieter
                if (y > limitY[0]) {
                    y -= incr; // up
                }
            } else if (k === "ArrowRight" || k === "6" || k === "k") {
                if (x < limitX[1]) {
                    x += incr; // right
                }
            } else if (k === "ArrowLeft" || k === "4" || k === "h") {
                if (x > limitX[0]) {
                    x -= incr; // left
                }
            } else {
                if (y < limitY[1]) {
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
        // renderRooms(model.roomSize);
        renderPointer(model.pos);
    }
    init();
};
fourRoomsApp(data);