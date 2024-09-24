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

    level = 0
    //lavaSet = [[100], [30, 50, 60, 70, 85, 90, 95, 100], [60, 90, 100], [20, 60, 80, 95, 100]]
    lavaSet = [[100], [70, 100], [60, 90, 100], [40, 70, 90, 100], [20, 50, 70, 85, 90, 95, 100]]


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
    growSpeed = 1
    magnetism = 0

    ascend = false
    ascendAnimTime = -5

    update(){
      if(!this.prestiegeAnim){
        this.gameTick()
      } else if(this.prestiegeAnim){
       this.animate()
      }
      
    }
    animate(){
      if(this.ascend){
        if(this.game.display.colorIndex >= 0){
          this.R = Math.max(5,this.R - (this.ascendAnimTime + 50) / 5)
        } 
        this.ascendAnimTime++
        if(this.R <= 6&& this.game.display.colorIndex > 0){
          this.game.display.colorIndex -= 1
          this.ascendAnimTime = -5
        }
        if(this.ascendAnimTime <= 0){
          this.R = 1000
        }
        if(this.R <= 6  && this.game.display.colorIndex <= 0){
          this.game.ascend += 1
          this.prestiegeAnim = false
          this.ascend = false
          this.die()
        }

      } else if((this.X < 850 && this.X > 826) && (this.Y < 479 && this.Y > 439)){
        this.animTime++
        this.R += this.animTime / 20
      } else{
        this.X = Math.round((this.X* 10 + 838)/11)
        this.Y = Math.round((this.Y* 10 + 459)/11) 
      }

      if(this.animTime >= 200 && !this.ascend){
        this.animTime = 0
        this.game.points += 1
        this.game.Collected = Math.round(this.game.Collected/10)
        if(this.first){
          this.game.display.prest = false
          this.first = false
        }
        if(this.game.display.colorIndex == 5){
          this.ascend = true
        } else{
          this.game.display.colorIndex++
          this.die()
          this.level++
          this.prestiegeAnim = false
        }
        
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
      this.R += (this.growSpeed - 1) / 100
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
        this.makeLava()
        if(this.checkCollision(this.lava[this.lava.length-1], 100)){
          this.lava[this.lava.length-1].X = -100
        }
        this.damageTimer = 0
      }
      for(let i = 0; i < this.coins.length; i++){
        this.coins[i].livingTime -=1
        if(this.coins[i].livingTime < 0){
          this.coins.splice(i, 1) 
        }

        if(this.checkCollision(this.coins[i], this.magnetism)){
          this.coins[i].velX =(this.coins[i].velX * (1)  + (-(this.coins[i].X - this.X) / (Math.abs(this.coins[i].X - this.X) *300))*5)
          
          this.coins[i].velY =(this.coins[i].velY * (1) + (-(this.coins[i].Y - this.Y) / (Math.abs(this.coins[i].Y - this.Y) *300))*5)

        }
        this.coins[i].X += this.coins[i].velX
        this.coins[i].Y += this.coins[i].velY
        this.coins[i].velX *= (.99)
        this.coins[i].velY *= (.99)





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

        this.lava[i].X += this.lava[i].velX
        this.lava[i].Y += this.lava[i].velY
        this.lava[i].velX *= (.97)
        this.lava[i].velY *= (.97)
        if(this.lava[i].X < 30 || this.lava[i].X > 1646){
          this.lava[i].velX = -this.lava[i].velX
        }
        if(this.lava[i].Y < 30 || this.lava[i].Y > 888){
          this.lava[i].velY = -this.lava[i].velY
        }

        if(this.lava[i].livingTime < 0){
          if(this.lava[i].type=="scatterS"){
            for(let g = 0; g < 3; g++){
              this.makeLava(true, this.lava[i].X, this.lava[i].Y, (Math.random()-.5)*20, (Math.random()-.5)*20)

            }
          }
          if(this.lava[i].type=="scatterM"){
            for(let g = 0; g < 6; g++){
              this.makeLava(true, this.lava[i].X, this.lava[i].Y, (Math.random()-.5)*20, (Math.random()-.5)*20)

            }
          }
          if(this.lava[i].type=="scatterL"){
            for(let g = 0; g < 10; g++){
              this.makeLava(true, this.lava[i].X, this.lava[i].Y, (Math.random()-.5)*20, (Math.random()-.5)*20)

            }
          }
          this.lava.splice(i, 1) 
        }
        
        if(this.checkCollision(this.lava[i], -10)){
          if(this.game.Collected <= 0){
            this.die()
          } else {
            if(this.lava[i].type == "5"){
              this.game.Collected -= 5
            }
            if(this.lava[i].type == "10"){
              this.game.Collected -= 10
            }
            if(this.lava[i].type == "10%"){
              this.game.Collected *= .9
            }
            if(this.lava[i].type == "50%"){
              this.game.Collected *= .5
            }
            if(this.lava[i].type == "90%"){
              this.game.Collected *= .1
            }
            this.game.Collected = Math.max(0, this.game.Collected)
            this.game.Collected = Math.floor(this.game.Collected)
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

    makeLava(set = false, x=0, y=0, velx=0, vely=0){
      var randomVal = Math.round(Math.random() * 99)+1
      this.game.display.coinLog = `${this.lavaSet[this.level]} : ${randomVal}` 
      if(randomVal <= this.lavaSet[this.level][0]) {
        this.lava[this.lava.length] = new Coin(5000, this.game, "5", "#dfbf8d")
      } else if(randomVal <= this.lavaSet[this.level][1]){
        this.lava[this.lava.length] = new Coin(5000, this.game, "10", "#df8f8d")

      } else if(randomVal <= this.lavaSet[this.level][2]){
        this.lava[this.lava.length] = new Coin(5000, this.game, "10%", "#cf8fdf")

      } else if(randomVal <= this.lavaSet[this.level][3]){
        this.lava[this.lava.length] = new Coin(5000, this.game, "50%", "#df5fef")

      } else if(randomVal <= this.lavaSet[this.level][4]){
        this.lava[this.lava.length] = new Coin(5000, this.game, "90%", "#ff0fff")

      } else if(randomVal <= this.lavaSet[this.level][5]){
        this.lava[this.lava.length] = new Coin(510, this.game, "scatterS", "cycle")

      } else if(randomVal <= this.lavaSet[this.level][6]){
        this.lava[this.lava.length] = new Coin(510, this.game, "scatterM", "cycle")

      } else if(randomVal <= this.lavaSet[this.level][7]){
        this.lava[this.lava.length] = new Coin(510, this.game, "scatterL", "cycle")

      } 
      this.lava[this.lava.length-1].spawn()
      if(set){
        this.lava[this.lava.length-1].X = x
        this.lava[this.lava.length-1].Y = y
        this.lava[this.lava.length-1].velX = velx
        this.lava[this.lava.length-1].velY = vely

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
      this.growSpeed = 1
      this.magnetism = 0

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