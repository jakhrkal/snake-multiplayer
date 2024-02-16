export interface Coords {
    x: number;
    y: number;
}

export class MessageType {
    public static readonly STATE_UPDATE = 'STATE_UPDATE';
}

export class GestureType { 
    public static readonly UP = "UP";
    public static readonly RIGHT = "RIGHT";
    public static readonly DOWN = "DOWN";
    public static readonly LEFT = "LEFT";
    public static readonly TAP = "TAP";
}