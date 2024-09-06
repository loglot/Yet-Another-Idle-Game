export class Player {

    R = 5
    MinR = 10
    MaxR = 450
    StartingR = 70
    X = 838
    Y = 459

    snailSpeedOption = 0
    slowSpeedOption = 1
    mediumSpeedOption = 2
    fastSpeedOption = 3
    unstableSpeedOption =4
    
    currentSpeedOption = 2
    GrowOnCoinOption = false

    snailSpeed = 1
    slowSpeed = 5
    mediumSpeed = 10
    fastSpeed = 20
    unstableSpeed = 500

    currentSpeed = 10

    async grow(amount) {
        for(let i = 0; i < amount; i++) {

            this.R++;
            await misc.sleep(10);

            if (this.R > this.MaxR) {
              this.R = this.MaxR
            }

            if (this.X < this.R + 5) {
              this.X = this.R + 5
            }

            if (this.X > -this.R + 1670) {
              this.X = -this.R + 1670
            }

            if (this.Y < this.R + 8) {
              this.Y = this.R + 8
            }

            if (this.Y > -this.R + 910) {
              this.Y = -this.R + 910
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

    cycleSpeedOption() {
        this.currentSpeedOption++;

        if (this.currentSpeedOption == this.unstableSpeedOption+1) {
          this.currentSpeedOption = this.snailSpeedOption;
        }

        this.changeSpeedBasedOnOption();
    }

    changeSpeedBasedOnOption() {
      switch (this.currentSpeedOption) {
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