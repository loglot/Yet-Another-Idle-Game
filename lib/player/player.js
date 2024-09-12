import { Coin } from "./coin.js"

export class Player {
    game
    constructor(Game){
      this.game = Game
    }

    R = 5
    MinR = 10
    MaxR = 450
    StartingR = 70
    X = 838
    Y = 459
    velY = 0
    velX = 0
    coinSpeed = .5

    coins = []
    coinTimer = 200
    coinTimeLimit = 250
    coinAdd = 1
    
    lava = []
    damageTimer = 0
    damageTimeLimit = 150
    lavaSubt = 10

    lavaKillRatio = 0
    lavaKillTimer = 0
    lavaKillTimeLimit = 1000

    currentSpeed = 5

    update(){
      this.lavaKillRatio = this.lavaKillTimer / this.lavaKillTimeLimit
      if(this.lavaKillTimer >= this.lavaKillTimeLimit){
        if(this.game.keyMan.isKeyPressed("Space")){
          
        }
      } else{
        this.lavaKillTimer += 1
      }

      if(this.game.keyMan.isKeyPressed("KeyW")){
        this.velY -= this.currentSpeed / 7
      }
      if(this.game.keyMan.isKeyPressed("KeyS")){
        this.velY += this.currentSpeed / 7
      }
      if(this.game.keyMan.isKeyPressed("KeyA")){
        this.velX -= this.currentSpeed / 7
      }
      if(this.game.keyMan.isKeyPressed("KeyD")){
        this.velX += this.currentSpeed / 7
      }
      this.velX /= 1.05
      this.velY /= 1.05
      this.Y += this.velY
      this.X += this.velX
      this.coinTimer += this.coinSpeed
      this.damageTimer += this.coinSpeed
      if(this.coinTimer > this.coinTimeLimit){
        this.coinTimer = 0
        this.coins[this.coins.length] = new Coin(this.game)
        this.coins[this.coins.length-1].spawn()
      }
      if(this.damageTimer > this.damageTimeLimit){
        this.damageTimer = 0
        this.lava[this.lava.length] = new Coin(this.game)
        this.lava[this.lava.length-1].spawn()
      }
      for(let i = 0; i < this.coins.length; i++){
        if(this.checkCollision(this.coins[i])){
          this.game.Collected += this.coinAdd
          this.coins.splice(i, 1) 
          if(this.game.Audios){
            this.game.PlaySoundCoin()
          }
        }
      }
      for(let i = 0; i < this.lava.length; i++){
        if(this.checkCollision(this.lava[i])){
          this.game.Collected -= this.lavaSubt
          this.game.Collected = Math.max(0, this.game.Collected)
          this.lava.splice(i, 1) 
          if(this.game.Audios){
            this.game.PlaySoundCoin()
          }
        }
      }

      if (this.X < this.R + 20) {
        this.X = this.R + 20
        this.velX = 0
      }

      if (this.X > -this.R + 1656) {
        this.X = -this.R + 1656
        this.velX = 0
      }

      if (this.Y < this.R + 20) {
        this.Y = this.R + 20
        this.velY = 0
      }

      if (this.Y > -this.R + 898) {
        this.Y = -this.R + 898
        this.velY = 0
      }
    }

    checkCollision(item) {
      if (Math.hypot(this.X - item.X, this.Y - item.Y) <= this.R + item.R) {
        return(true)
      }
    }

    async grow(amount) {
        for(let i = 0; i < amount; i++) {

            this.R++;
            await this.game.sleep(10);

            if (this.R > this.MaxR) {
              this.R = this.MaxR
            }

        }

    }

}