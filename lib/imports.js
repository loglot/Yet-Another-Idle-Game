import { KeyManager } from "./keyMan.js";
import { Player } from "./player/player.js";
import { Draw } from "./display/display.js";

export class Game{
    keyMan 
    player
    display
    constructor(){
        //this.keyMan = new KeyManager(this)
        //this.player = new Player(this)
        this.display = new Draw(this)
    }
}