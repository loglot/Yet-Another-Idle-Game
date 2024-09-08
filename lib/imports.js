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

    soundMenu = new Audio('../assets/menu.wav')


    MainMenu = true
    MenuState = "main"
    SettingSelect = 0

    Style = true
    Grow = false
    SpeedSelect = 2
    Audios = true




    Collected = 0
    

    PlaySoundCoin(V=.15){
        var RGC = Math.ceil(Math.random() * 4)
        var soundCoin = new Audio(`../assets/coin${RGC}.wav`)
        soundCoin.volume = V
        soundCoin.play()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}