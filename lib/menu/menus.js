import { ShopItem } from "./shopItem.js"

export class Menu{
    game
    shopItems = []
    shopStore = []
    shopSelect = 0
    start = 0
    constructor(game){
        this.game = game

        this.shopItems[this.shopItems.length] = new ShopItem("null", "null", 0, 1, "x", function func(){ console.log(null) }, this.game)
    }

    loadShop(){
        this.shopItems = []
        this.shopItems[this.shopItems.length] = new ShopItem("Lava Speed Down", "reduces the rate at which lava gets made", 1, 1.5, "x", function func(){ this.game.player.damageTimeLimit += 50; this.game.display.purchace = true}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Spawn Speed Up", "increses the rate at which coin and lava gets made slightly", 5, 1.3, "x", function func(){ this.game.player.coinSpeed += .3}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Coin Collection", "increses the amount of score you get from collecting a coin by one", 10, 1.75, "x", function func(){ this.game.player.coinAdd += 1}, this.game)
        //this.shopItems[this.shopItems.length] = new ShopItem("Lava Insurance", "reduces the amount of score you loose from collecting lava by one, (can go into the negatives)", 50, 1.5, "x", function func(){ this.game.player.lavaSubt -= 1}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("LB Speed", "increses the speed of the lava blaster", 50, 50, "+", function func(){ this.game.player.lavaKillTimerSpeed *= 2 }, this.game, 4)
        this.shopItems[this.shopItems.length] = new ShopItem("LB Scattershot", "increses the amount of lava the lava blaster removes", 25, 2, "x", function func(){ this.game.player.lavaKillNumber += 1 }, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("Grow", "Grows the player, grow 7 times and see what happens", 500, 2, "x", function func(){ this.game.player.grow(50) }, this.game, 7)
        //this.shopItems[this.shopItems.length] = new ShopItem("Spawn Speed Up", "increses the rate at which coin and lava gets made slightly", 0, 1.3, "x", function func(){ this.game.player.coinSpeed += 1000}, this.game)
        this.shopItems[this.shopItems.length] = new ShopItem("null", "null", 0, 1, "x", function func(){ console.log(null) }, this.game, 3)
        this.shopItems[this.shopItems.length] = new ShopItem("null", "null", 0, 1, "x", function func(){ console.log(null) }, this.game)
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
            this.game.display.down = true
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowLeft") && this.game.State == "shop"){
            console.log(this.shopItems)
            console.log(this.shopStore)
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowRight") && this.game.State == "shop"){
            console.log(this.shopItems[this.shopSelect])
        }else if(this.game.keyMan.wasKeyJustPressed("Enter") && this.game.State == "shop"){
            this.shopItems[this.shopSelect].buy()
            console.log("pur-chase")
        }else if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.State == "shop"){
            this.game.State = "info"
        }else if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.State == "info"){
            this.game.State = "shop"
            this.game.display.iPressed = true
        }
    }
}
