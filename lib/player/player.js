import { Coin } from "./coin.js"

export class Player {
    game
    constructor(Game){
      this.game = Game
    }

    growT = 0
    R = 5
    StartingR = 70
    X = 838
    Y = 459
    velY = 0
    velX = 0
    coinSpeed = .5
    first = true


    coins = []
    coinTimer = 200
    coinTimeLimit = 250
    coinAdd = 1
    coinMultiply = 1

    lava = []
    damageTimer = 50
    damageTimeLimit = 200
    lavaSubt = 10

    lavaKillRatio = 0
    lavaKillTimer = 0
    lavaKillTimeLimit = 1000
    lavaKillTimerSpeed = .5
    lavaKillNumber = 1

    growRatio = 0

    currentSpeed = 5

    prestiegeAnim = false

    animTime = 0
    growSpeed = 0

    update(){
      if(!this.prestiegeAnim){
        this.gameTick()
      } else if(this.prestiegeAnim){
       this.animate()
      }
      
    }
    animate(){
      if((this.X < 850 && this.X > 826) && (this.Y < 479 && this.Y > 439)){
        this.animTime++
        this.R += this.animTime / 20
      } else{
        this.X = Math.round((this.X* 10 + 838)/11)
        this.Y = Math.round((this.Y* 10 + 459)/11) 
      }
      if(this.animTime >= 200){
        this.game.display.colorIndex++
        this.prestiegeAnim = false
        this.animTime = 0
        this.game.points += 1
        if(this.first){
          this.game.display.prest = false
          this.first = false
        }
        if(this.game.display.colorIndex == 6){
          this.game.display.colorIndex = 0
        }
        
        this.die()
      }
    }

    gameTick(){
      this.lavaKillRatio = this.lavaKillTimer / this.lavaKillTimeLimit
      this.growRatio = Math.max((this.R - 75) / 350, 0)
      if(this.growT > 0){

        this.R++;
        this.growT--
      }
      if(this.lavaKillTimer >= this.lavaKillTimeLimit){
        if(this.game.keyMan.wasKeyJustPressed("Space")){
          for(let i = 0; i < this.lavaKillNumber; i++){
            var deadLava = Math.round(Math.random() * (this.lava.length-1))
            this.lava.splice(deadLava, 1) 
            this.lavaKillTimer = 0
            if(this.game.Audios){
              this.game.PlaySoundExpload()
            }
          }

        }
      } else{
        this.lavaKillTimer += this.lavaKillTimerSpeed
        if(this.lavaKillTimer >= this.lavaKillTimeLimit){
          this.lavaKillTimer = this.lavaKillTimeLimit
        }
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
      if(this.game.keyMan.isKeyPressed("KeyP")){
        if(this.growRatio == 1){

          this.prestiegeAnim = true
        }
      }
      this.velX /= 1.05
      this.velY /= 1.05
      this.Y += this.velY
      this.X += this.velX
      this.R += this.growSpeed / 100
      if(this.R >= 425){
        this.R= 425
      }
      this.coinTimer += this.coinSpeed
      this.damageTimer += this.coinSpeed
      if(this.coinTimer > this.coinTimeLimit){
        this.coinTimer = 0
        this.coins[this.coins.length] = new Coin(5000, this.game)
        this.coins[this.coins.length-1].spawn()
      }
      if(this.damageTimer > this.damageTimeLimit){
        this.damageTimer = 0
        this.lava[this.lava.length] = new Coin(5000, this.game)
        this.lava[this.lava.length-1].spawn()
        if(this.checkCollision(this.lava[this.lava.length-1], 100)){
          this.lava[this.lava.length-1].X = -100

        }
      }
      for(let i = 0; i < this.coins.length; i++){
        this.coins[i].livingTime -=1
        if(this.coins[i].livingTime < 0){
          this.coins.splice(i, 1) 
        }

        if(this.checkCollision(this.coins[i])){
          this.game.Collected += this.coinAdd * this.coinMultiply
          this.coins.splice(i, 1) 
          if(this.game.Audios){
            this.game.PlaySoundCoin()
          }
        }
        
      }
      for(let i = 0; i < this.lava.length; i++){
        this.lava[i].livingTime -=1
        if(this.lava[i].livingTime < 0){
          this.lava.splice(i, 1) 
        }
        
        if(this.checkCollision(this.lava[i], -5)){
          if(this.game.Collected <= 0){
            this.die()
          } else {
            this.game.Collected -= this.lavaSubt
            this.game.Collected = Math.max(0, this.game.Collected)
            this.lava.splice(i, 1) 
          }
          if(this.game.Audios){
            this.game.PlaySoundHurt()
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

    die(){

      this.R = 5
      this.StartingR = 70
      this.X = 838
      this.Y = 459
      this.velY = 0
      this.velX = 0
      this.coinSpeed = .5
      this.growT = 0
  
      this.coins = []
      this.coinTimer = 200
      this.coinTimeLimit = 250
      this.coinAdd = 1
      
      this.lava = []
      this.damageTimer = 0
      this.damageTimeLimit = 150
      this.lavaSubt = 10
  
      this.lavaKillRatio = 0
      this.lavaKillTimer = 0
      this.lavaKillTimeLimit = 1000
      this.lavaKillTimerSpeed = .5
      this.lavaKillNumber = 1
  
      this.currentSpeed = 5

      this.game.State = "main"
    }

    checkCollision(item, leeway = 0) {
      if (Math.hypot(this.X - item.X, this.Y - item.Y) <= this.R + item.R + leeway) {
        return(true)
      }
    }

    async grow(amount) {
      this.growT += amount

    }

}