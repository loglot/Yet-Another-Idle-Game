import { ShopItem } from "./shopItem.js"

export class Menu{
    game
    shopItems = []
    shopSelect = 0
    constructor(game){
        this.game = game
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
        this.shopItems[this.shopItems.length] = new ShopItem("coin speed up", "increses the rate at which coin and lava gets made", 5, 2, "x")
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
            this.shopSelect++
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowDown") && this.game.State == "shop"){
            this.shopSelect--
        }else if(this.game.keyMan.wasKeyJustPressed("ArrowLeft") && this.game.State == "shop"){

        }else if(this.game.keyMan.wasKeyJustPressed("ArrowRight") && this.game.State == "shop"){

        }else if(this.game.keyMan.wasKeyJustPressed("Enter") && this.game.State == "shop"){

        }else if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.State == "shop"){
            this.this.game.State = "info"
        }
    }
}