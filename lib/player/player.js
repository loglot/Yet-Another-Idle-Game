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

    coins = []
    coinTimer = 0
    coinTimeLimit = 100

    snailSpeedOption = 0
    slowSpeedOption = 1
    mediumSpeedOption = 2
    fastSpeedOption = 3
    unstableSpeedOption =4
    

    snailSpeed = 1
    slowSpeed = 5
    mediumSpeed = 10
    fastSpeed = 20
    unstableSpeed = 500

    currentSpeed = 10

    update(){
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
      this.coinTimer++
      if(this.coinTimer > this.coinTimeLimit){
        this.coinTimer = 0
        this.coins[this.coins.length] = new Coin(this.game)
        this.coins[this.coins.length-1].spawn()
      }
      for(let i = 0; i < this.coins.length; i++){
        this.checkCoinCollision(i)
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
      this.changeSpeedBasedOnOption()
    }

    checkCoinCollision(i) {
      if (Math.hypot(this.X - this.coins[i].X, this.Y - this.coins[i].Y) <= this.R + this.coins[i].R) {
          this.game.Collected++
          this.coins.splice(i, 1) 
          if (this.game.Grow) {
            this.grow(10)
          }
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

    async move(xChange, yChange) {
        if (xChange < 0) {
            var abs_xChange = 0 - xChange
          } else {
            var abs_xChange = xChange
          }
  
          if (yChange < 0) {
            var abs_yChange = 0 - yChange
          } else {
            var abs_yChange = yChange
          }
  
          for (let i = 0; i < abs_xChange; i++) {
            if (xChange < 0) {
              this.X--;
  
              if (this.X < this.R + 25) {
                this.X = this.R + 25
              }

              await misc.sleep(10);
  
            } else {
              this.X++;
  
              if (this.X > -this.R + 1650) {
                this.X = -this.R + 1650
              }

              await misc.sleep(10);
            };
  
          }
  
            for (let i = 0; i < abs_yChange; i++) {
              if (yChange < 0) {
                this.Y--;
  
                if (this.Y < this.R + 28) {
                  this.Y = this.R + 28
                }

                await misc.sleep(10);
              } else {
                this.Y++;
  
                if (this.Y > -this.R + 890) {
                  this.Y = -this.R + 890
                }

                await misc.sleep(10);
              }
        }
    }



    changeSpeedBasedOnOption() {
      switch (this.game.SpeedSelect) {
        case this.snailSpeedOption:
          this.currentSpeed = this.snailSpeed;
        break;
        case this.slowSpeedOption:
          this.currentSpeed = this.slowSpeed;
          break;
        case this.mediumSpeedOption:
          this.currentSpeed = this.mediumSpeed;
          break
        case this.fastSpeedOption:
          this.currentSpeed = this.fastSpeed;
          break;
        case this.unstableSpeedOption:
          this.currentSpeed = this.unstableSpeed;
          break;
      }
    }
}