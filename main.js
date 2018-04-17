var fourRoomsApp = function (d) {
    "use strict";

    /* Key options:
     * ArrowUp, ArrowRight, ArrowLeft, ArrowDown
     * 8 (up), 6 (right), 4 (left), 2 (down)
     * u (up), k (right), h (left), n (down)
     * action: spacebar */

    var model = {
        htmlTargets: d.targets,
        actionKeys: {
            up: ["ArrowUp", "8", "u"],
            down: ["ArrowDown", "2", "n"],
            left: ["ArrowLeft", "4", "h"],
            right: ["ArrowRight", "6", "k"],
            action: 32 // spacebar
        },
        pos: {
            current: [25, 25], // x, y
            previous: [25, 25]
        },
        incr: 25,
        map: [[0, 0], [25, 0], [50, 0], [75, 0], [100, 0], [125, 0], [150, 0], [175, 0], [200, 0], [225, 0], [250, 0], [275, 0], [300, 0], [325, 0], [350, 0], [375, 0], [400, 0], [425, 0], [450, 0], [475, 0], [500, 0], [525, 0], [550, 0], [575, 0], [600, 0], [600, 25], [600, 50], [600, 75], [600, 100], [600, 125], [600, 150], [600, 175], [600, 200], [600, 225], [600, 250], [600, 275], [600, 300], [600, 325], [600, 350], [600, 375], [600, 400], [600, 425], [600, 450], [600, 475], [600, 500], [600, 525], [600, 550], [600, 575], [600, 600], [575, 600], [550, 600], [525, 600], [500, 600], [475, 600], [450, 600], [425, 600], [400, 600], [375, 600], [350, 600], [325, 600], [300, 600], [275, 600], [250, 600], [225, 600], [200, 600], [175, 600], [150, 600], [125, 600], [100, 600], [75, 600], [50, 600], [25, 600], [0, 600], [0, 575], [0, 550], [0, 525], [0, 500], [0, 475], [0, 450], [0, 425], [0, 400], [0, 375], [0, 350], [0, 325], [0, 300], [0, 275], [0, 250], [0, 225], [0, 200], [0, 175], [0, 150], [0, 125], [0, 100], [0, 75], [0, 50], [0, 25], [450, 25], [450, 50], [450, 75], [450, 100], [450, 125], [450, 200], [25, 225], [50, 225], [75, 225], [100, 225], [125, 225], [150, 225], [175, 225], [200, 225], [225, 225], [250, 225], [250, 250], [250, 275], [250, 300], [250, 325], [250, 350], [250, 375], [250, 400], [250, 425], [250, 450], [250, 475], [250, 500], [275, 225], [250, 575], [350, 225], [375, 225], [400, 225], [425, 225], [450, 225], [475, 225], [500, 225], [525, 225], [550, 225], [575, 225], [300, 225], [325, 225]],
        items: {
            key: {
                pos: [550, 50],
                act: false
            },
            sword: {
                pos: [75, 300],
                act: false
            },
            door: {
                pos: [300, 225],
                act: false
            }
        }
    };

    function checkMap(pos) {
        // Takes in the pos <array>.
        // Returns true if the
        // position is on a map
        // line; false if not.
        const map = model.map;
        var index = 0;
        var len = map.length;
        var inMap = true;

        while (index < len) {
            if (pos[0] === map[index][0] && pos[1] === map[index][1]) {
                // the pointer is on a perimeter
                inMap = false;
                break;
            }
            index += 1;
        }
        return inMap;
    }

    function movePointer(k) {
        // Takes in the key hit <array>.
        // Returns the new position <array>.
        const incr = model.incr;
        var keyName = k[0];
        var keyCode = k[1];
        var x = model.pos.current[0];
        var y = model.pos.current[1];
        var pos = {
            current: [x, y],
            previous: model.pos.previous
        };

        pos.previous = [x, y];

        if (model.actionKeys.up.indexOf(keyName) > -1) {
            y -= incr; // up
        } else if (model.actionKeys.right.indexOf(keyName) > -1) {
            x += incr; // right
        } else if (model.actionKeys.left.indexOf(keyName) > -1) {
            x -= incr; // left
        } else if (model.actionKeys.down.indexOf(keyName) > -1) {
            y += incr; // down
        } else {
            if (keyCode === model.actionKeys.action) {
                // action
                console.log("action");
            }
        }

        pos.current = [x, y];

        // check to see if move is valid before
        // updating the actual position of the pointer
        if (checkMap(pos.current) === false) {
            // revert
            pos.current = pos.previous;
            pos.previous = model.pos.previous;
        }

        return pos;
    }

    function updateItems(pointerPos, items) {
        // Returns the updated items <obj>.
        // Takes in the pointer position
        // <array> and the items <obj>.
        var updated = items;
        var x = pointerPos[0];
        var y = pointerPos[1];
        var index = 0;
        var len = items.length;

        while (index < len) {
            console.log(items[index]);
            index += 1;
        }


        // if (pos.current[0] === model.objects.sword.pos[0] && pos.current[1] === model.objects.sword.pos[1]) {
        //     model.objects.sword.has = true;
        //     model.objects.sword.pos = pos.current;
        // }

    }

    // views
    function renderPointer(pos) {
        var pointerEl = model.htmlTargets.pointer;
        pointerEl.style.left = pos[0].toString() + "px";
        pointerEl.style.top = pos[1].toString() + "px";
    }

    function renderItems(items) {
        var itemEl = model.htmlTargets.sword;
        itemEl.style.left = pos[0].toString() + "px";
        itemEl.style.top = pos[1].toString() + "px";
    }

    // controller
    function main(m) {
        renderPointer(m.pos.current);

        document.addEventListener("keydown", function (item) {
            var keyHit = [item.key, item.keyCode];
            var pos = movePointer(keyHit);
            var items = updateItems(pos, m.items);

            model.pos.current = pos.current;
            model.pos.previous = pos.previous;
            // model.items = items;

            renderPointer(m.pos.current);
            // renderItems(m.items);

            console.log("pos:", model.pos.current);
        });
    }
    main(model);
};
fourRoomsApp(data);