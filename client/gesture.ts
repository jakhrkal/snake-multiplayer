import { GestureType } from "../interface/types.js";

const THRESHOLD_TIME = 500;
const THRESHOLD_DISTANCE = 50;

export class Gesture {

    private gestStart: any;
    private gestEnd: any;
    private gestTracking: any;
    private element: any;

    constructor(element) {
        this.gestStart = {};
        this.gestEnd = {};
        this.gestTracking = false;
        this.element = element;
    }

    listenForGestures(callback) {
        this.element.addEventListener('pointerdown', event => this.gestureStart(event, this), false);
        this.element.addEventListener('pointermove', event => this.gestureMove(event, this), false);
        this.element.addEventListener('pointerup', event => this.gestureEnd(event, callback, this), false);
    }

    gestureStart(e, gestureObject) {
        gestureObject.gestTracking = true;
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        gestureObject.gestStart.t = new Date().getTime();
        gestureObject.gestStart.x = e.clientX;
        gestureObject.gestStart.y = e.clientY;
    }

    gestureMove(e, gestureObject) {
        if (gestureObject.gestTracking) {
            e.preventDefault();
            gestureObject.gestEnd.x = e.clientX;
            gestureObject.gestEnd.y = e.clientY;
        }
    }

    gestureEnd(e, callback, gestureObject) {
        gestureObject.gestTracking = false;
        var now = new Date().getTime();
        var deltaTime = now - gestureObject.gestStart.t;
        var deltaX = gestureObject.gestEnd.x - gestureObject.gestStart.x;
        var deltaY = gestureObject.gestEnd.y - gestureObject.gestStart.y;
        /* work out what the movement was */
        if (deltaTime > THRESHOLD_TIME) {
            /* gesture too slow */
            return;
        } else {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {/*most significant*/
                if (deltaX > THRESHOLD_DISTANCE) {
                    /* right swipe */
                    callback(GestureType.RIGHT);
                } else if (-deltaX > THRESHOLD_DISTANCE) {
                    /* left swipe */
                    callback(GestureType.LEFT);
                } else {
                    callback(GestureType.TAP);
                }
            } else {
                if (deltaY > THRESHOLD_DISTANCE) {
                    /* down swipe */
                    callback(GestureType.DOWN);
                } else if (-deltaY > THRESHOLD_DISTANCE) {
                    /* up swipe */
                    callback(GestureType.UP);
                } else {
                    callback(GestureType.TAP);
                }
            }
        }
    }
}



