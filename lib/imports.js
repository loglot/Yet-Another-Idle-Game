import { KeyManager } from "./keyMan.js";
import { Player } from "./player/player.js";

export class Game{
    keyMan 
    player
    constructor(){
        this.keyMan = new KeyManager(this)
        this.player = new Player(this)
    }
}