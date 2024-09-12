import { ShopItem } from "./shopItem.js"

export class Menu{
    game
    shopItems = []
    shopSelect = 0
    constructor(game){
        this.game = game
        this.shopItems[this.shopItems.length] = new ShopItem("Spawn Speed Up", "increses the rate at which coin and lava gets made slightly", 1, 1, "+", function func(){ this.game.player.coinSpeed += .3}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Lava Speed Down", "reduces the rate at which lava gets made", 5, 1.5, "x", function func(){ this.game.player.damageTimeLimit += 50}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Coin Collection", "increses the amount of score you get from collecting a coin by one", 10, 1.5, "x", function func(){ this.game.player.coinAdd += 1}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Lava Insurance", "increses the amount of score you loose from collecting lava by one, (can go into the negatives)", 50, 1.25, "x", function func(){ this.game.player.lavaSubt -= 1}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("LB Speed", "null", 0, 50, "*", function func(){ this.game.player.lavaKillTimerSpeed *= 2 }, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("LB Scattershot", "null", 0, 1, "x", function func(){ this.game.player.lavaKillNumber += 1 }, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("null", "null", 0, 1, "x", function func(){ console.log(null) }, this.game)
    }

    tick(){
        if(this.game.keyMan.wasKeyJustPressed("ArrowUp") && this.game.State == "settings"){
            if(this.game.SettingSelect > 0){
              this.game.SettingSelect -= 1
            }
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowDown") && this.game.State == "settings"){
            
            if(this.game.SettingSelect < 0){
                this.game.SettingSelect += 1
            }
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowLeft") && this.game.State == "settings"){
            if(this.game.SettingSelect == 0){
                this.game.Audios = !this.game.Audios
            }
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowRight") && this.game.State == "settings"){
            if(this.game.SettingSelect == 0){
                this.game.Audios = !this.game.Audios
            }
        }

        if(this.game.keyMan.wasKeyJustPressed("ArrowUp") && this.game.State == "shop"){
            if(this.shopSelect > 0){
                this.shopSelect--
            }
            
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowDown") && this.game.State == "shop"){
            if(this.shopSelect < this.shopItems.length - 1){
                this.shopSelect++
            }
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowLeft") && this.game.State == "shop"){

        }else if(this.game.keyMan.wasKeyJustPressed("ArrowRight") && this.game.State == "shop"){

        }else if(this.game.keyMan.wasKeyJustPressed("Enter") && this.game.State == "shop"){
            this.shopItems[this.shopSelect].buy()
            console.log("pur-chase")
        }else if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.State == "shop"){
            this.game.State = "info"
        }else if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.State == "info"){
            this.game.State = "shop"
        }
    }
}