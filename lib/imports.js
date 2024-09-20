import { KeyManager } from "./keyMan.js";
import { Player } from "./player/player.js";
import { Draw } from "./display/display.js";
import { Coin } from "./player/coin.js";
import { Menu } from "./menu/menus.js";

export class Game{
    keyMan 
    player
    display
    menu
    constructor(){
        this.keyMan = new KeyManager(this)
        this.player = new Player(this)
        this.display = new Draw(this)
        this.menu = new Menu(this)
        
    }

    soundMenu = new Audio('../assets/menu.wav')


    State = "main"
    SettingSelect = 0

    Style = true
    Grow = false
    SpeedSelect = 2
    Audios = true
    points = 0
    ascend = 0




    Collected = 0
    

    PlaySoundCoin(V=.15){
        var RGC = Math.ceil(Math.random() * 4)
        var soundCoin = new Audio(`../assets/coin${RGC}.wav`)
        soundCoin.volume = V
        soundCoin.play()
    }
    PlaySoundHurt(V=.15){
        var RGC = Math.ceil(Math.random() * 4)
        var soundCoin = new Audio(`../assets/hurt${RGC}.wav`)
        soundCoin.volume = V
        soundCoin.play()
    }
    PlaySoundExpload(V=.15){
        var RGC = Math.ceil(Math.random() * 4)
        var soundCoin = new Audio(`../assets/expload${RGC}.wav`)
        soundCoin.volume = V
        soundCoin.play()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}