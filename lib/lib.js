let player = {

    R : 5,
    MinR : 10,
    MaxR : 450,
    StartingR : 70,
    X : 838,
    Y : 459,
    GrowOnCoin : true,

    async shrink(amount){
        for(let i = 0; i < amount; i++) {
          this.R--;
          if (this.R < this.MinR) {
            player.R = player.MinR
          }
          // draw.game();
          await misc.sleep (10);
        }
    
    },

    async grow(amount) {
        for(let i = 0; i < amount; i++) {

            player.R++;
            // draw.game();
            await misc.sleep(10);

            if (player.R > player.MaxR) {
              player.R = player.MaxR
            }

            if (player.X < player.R + 5) {
              player.X = player.R + 5
            }

            if (player.X > -player.R + 1670) {
              player.X = -player.R + 1670
            }

            if (player.Y < player.R + 8) {
              player.Y = player.R + 8
            }

            if (player.Y > -player.R + 910) {
              player.Y = -player.R + 910
            }

        }

    },

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
              player.X--;
  
              if (player.X < player.R + 25) {
                player.X = player.R + 25
              }
  
              // draw.game();
              await misc.sleep(10);
  
            } else {
              player.X++;
  
              if (player.X > -player.R + 1650) {
                player.X = -player.R + 1650
              }
  
              // draw.game();
              await misc.sleep(10);
            };
  
          }
  
            for (let i = 0; i < abs_yChange; i++) {
              if (yChange < 0) {
                player.Y--;
  
                if (player.Y < player.R + 28) {
                  player.Y = player.R + 28
                }
  
                // draw.game();
                await misc.sleep(10);
              } else {
                player.Y++;
  
                if (player.Y > -player.R + 890) {
                  player.Y = -player.R + 890
                }
  
                // draw.game();
                await misc.sleep(10);
              };
  
    }

    }
}

let misc = {

    MainMenu : true,

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

}

let coin = {

    X : Math.floor(Math.random() * 1636) + 20,
    Y : Math.floor(Math.random() * 878) + 20,
    R : 0, //temp
    Exists : false,
    Collected : 0,

    checkPlayerCollision() {
        if (Math.hypot(player.X - coin.X, player.Y - coin.Y) <= player.R + coin.R) {
            this.Exists = false;
            this.Collected++
            console.log("Before // draw.game() is good")
            // draw.game()
            console.log("After // draw.game() is good")
            if (player.GrowOnCoin) {
                player.grow(10)
            }
            this.spawnCoin(1500)
        }
    },

    async grow(amount) {
        for(let i = 0; i < amount; i++) {
            this.R++;
            // draw.game();
            await misc.sleep(10);
        }
    },

    async spawnCoin(delay) {
        this.Exists = false
        await misc.sleep(delay)
        this.X = Math.floor(Math.random() * 1436) + 120;
        this.Y = Math.floor(Math.random() * 778) + 70;
        this.R = 5
        this.Exists = true
        await this.grow(10)

    }
}

let keyManager = {
    /*
        Space = 0
        KeyT = 1
        KeyW = 2
        KeyA = 3
        KeyS = 4
        KeyD = 5
     */
    keysPressed : new Array(6),

    isKeyPressed(code) {
        switch (code) {
            case "Space": return this.keysPressed[0]
            case "KeyT": return this.keysPressed[1]
            case "KeyW": return this.keysPressed[2]
            case "KeyA": return this.keysPressed[3]
            case "KeyS": return this.keysPressed[4]
            case "KeyD": return this.keysPressed[5]
        }
    },

    setKeyPressed(code, pressed) {
        switch (code) {
            case "Space":
                this.keysPressed[0] = pressed
                break
            case "KeyT":
                this.keysPressed[1] = pressed
                break
            case "KeyW":
                this.keysPressed[2] = pressed
                break
            case "KeyA":
                this.keysPressed[3] = pressed
                break
            case "KeyS":
                this.keysPressed[4] = pressed
                break
            case "KeyD":
                this.keysPressed[5] = pressed
        }
    },

    updateKeys() {
        if (misc.MainMenu) {
            if (this.isKeyPressed("Space")) {
                misc.MainMenu = false
                coin.spawnCoin(3000)
                // draw.game()
                player.grow(player.StartingR)
            }

            if (this.isKeyPressed("KeyT")) {
                misc.GrowPlayerOnCoin = !misc.GrowPlayerOnCoin;
                // draw.game()
            }
        } else{
            if (this.isKeyPressed("KeyW")) {
                player.move(0, -20)
            }
            if (this.isKeyPressed("KeyS")) {
                player.move(0, 20)
            }
            if (this.isKeyPressed("KeyA")) {
                player.move(-20, 0)
            }
            if (this.isKeyPressed("KeyD")) {
                player.move(20, 0)
            }

        }
    }
}