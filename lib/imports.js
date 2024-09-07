import { KeyManager } from "./keyMan.js";
import { Player } from "./player/player.js";
import { Draw } from "./display/display.js";
import { Coin } from "./player/coin.js";

export class Game{
    keyMan 
    player
    display
    constructor(){
        this.keyMan = new KeyManager(this)
        this.player = new Player(this)
        this.display = new Draw(this)
        
    }

    MainMenu = true
    MenuState = "main"
    SettingSelect = 0

    Style = true
    Grow = false
    SpeedSelect = 2




    Collected = 0

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}