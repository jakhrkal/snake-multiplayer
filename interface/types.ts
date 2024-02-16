export interface Coords {
    x: number;
    y: number;
}

export interface Message {
    type: MessageType;
    data: MessageData;
}

export interface MessageData {

}

export interface ArenaData extends MessageData {

}

export interface PlayerData {
    id: string;
    body: Coords[];
}

export class MessageType {
    public static readonly GAME_CREATED = 'GAME_CREATED';
    public static readonly UPDATE_ARENA = 'UPDATE_ARENA';
    public static readonly UPDATE_COINS = 'UPDATE_COINS';
    public static readonly UPDATE_PLAYERS = 'UPDATE_PLAYERS';
}

export class GestureType { 
    public static readonly UP = "UP";
    public static readonly RIGHT = "RIGHT";
    public static readonly DOWN = "DOWN";
    public static readonly LEFT = "LEFT";
    public static readonly TAP = "TAP";
}