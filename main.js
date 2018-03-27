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
                perim: {
                    x: [25, 425],    // min, max
                    y: [25, 200]
                },
                doors: [
                    [175, 200], // x, y starting point
                    [300, 200]
                ]
            },
            roomB: {
                perim: {
                    x: [475, 575],
                    y: [25, 200]
                },
                doors: [
                    [500, 200]
                ]
            },
            roomC: {
                perim: {
                    x: [25, 225],
                    y: [250, 575]
                },
                doors: [
                    [175, 250]
                ]
            },
            roomD: {
                perim: {
                    x: [275, 575],
                    y: [250, 575]
                },
                doors: [
                    [300, 250],
                    [500, 250]
                ]
            }
        }
    };

    function getPointerLocation(pos) {
        // Returns the room the pointer
        // is located in <num>. Takes in
        // the position <array>.
        // position (pos) = [x, y].
        var room = null;
        var rooms = model.rooms;

        if (pos[0] >= rooms.roomA.perim.x[0] && pos[0] <= rooms.roomA.perim.x[1] && pos[1] >= rooms.roomA.perim.y[0] && pos[1] <= rooms.roomA.perim.y[1]) {
            // room A
            room = 1;
        } else if (pos[0] >= rooms.roomB.perim.x[0] && pos[0] <= rooms.roomB.perim.x[1] && pos[1] >= rooms.roomB.perim.y[0] && pos[1] <= rooms.roomB.perim.y[1]) {
            // room B
            room = 2;
        } else if (pos[0] >= rooms.roomC.perim.x[0] && pos[0] <= rooms.roomC.perim.x[1] && pos[1] >= rooms.roomC.perim.y[0] && pos[1] <= rooms.roomC.perim.y[1]) {
            // room C
            room = 3;
        } else if (pos[0] >= rooms.roomD.perim.x[0] && pos[0] <= rooms.roomD.perim.x[1] && pos[1] >= rooms.roomD.perim.y[0] && pos[1] <= rooms.roomD.perim.y[1]) {
            // room D
            room = 4;
        } else {
            // could be a doorway or other
            room = -1;
        }
        return room;
    }

    function getRoomPerimeter(room) {
        // Returns a room's perimeter
        // limits <obj> and door specs
        // <obj>. Takes in the room <num>.
        var perim = {
            limit: null,
            except: null
        }

        if (room === 1) {
            perim.limit = model.rooms.roomA.perim;
            perim.except = model.rooms.roomA.doors;
        } else if (room === 2) {
            perim.limit = model.rooms.roomB.perim;
            perim.except = model.rooms.roomB.doors;
        }  else if (room === 3) {
            perim.limit = model.rooms.roomC.perim;
            perim.except = model.rooms.roomC.doors;
        }  else {
            // room 4
            perim.limit = model.rooms.roomD.perim;
            perim.except = model.rooms.roomD.doors;
        }
        return perim;
    }

    function movePointer(k, room) {
        // Takes in the key name <str>
        // and the room <num>.
        const incr = model.incr;
        var x = model.pos[0];
        var y = model.pos[1];
        var loc = getPointerLocation(model.pos);
        var perim = getRoomPerimeter(room);
        var index = 0;

        if (model.actionKeys.indexOf(k) > -1) {
            if (k === "ArrowUp" || k === "8" || k === "u") {
                while (index < perim.except.length) {
                    if (y === perim.except[index][1] && x >= perim.except[index][0] && x <= perim.except[index][0] + incr || y < perim.limit.y[1] || y > perim.limit.y[0]) {
                        y -= incr; // up
                        break;
                    }
                    index += 1;
                }
            } else if (k === "ArrowRight" || k === "6" || k === "k") {
                if (x < perim.limit.x[1]) {
                    x += incr; // right
                }
            } else if (k === "ArrowLeft" || k === "4" || k === "h") {
                if (x > perim.limit.x[0]) {
                    x -= incr; // left
                }
            } else {
                while (index < perim.except.length) {
                    if (y === perim.except[index][1] && x >= perim.except[index][0] && x <= perim.except[index][0] + incr || y < perim.limit.y[1]) {
                        y += incr; // down
                        break;
                    }
                    index += 1;
                }
            }
            model.pos = [x, y];
        }
    }

    // views
    function renderPointer(pos) {
        var pointerEl = model.htmlTargets.pointer;
        pointerEl.style.left = pos[0].toString() + "px";
        pointerEl.style.top = pos[1].toString()  + "px";
    }

    // controller
    document.addEventListener("keydown", function (item) {
        const keyName = item.key;
        var room = getPointerLocation(model.pos);
        movePointer(keyName, room);
        renderPointer(model.pos);
        console.log(model.pos, "|", room);
    });

    function init() {
        renderPointer(model.pos);
    }
    init();
};
fourRoomsApp(data);