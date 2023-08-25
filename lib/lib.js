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
          if (this.R < this.R) {
            player.R = player.MinR
          };
          draw.Game();
          await sleep (10);
        }
    
    },

    async grow(amount) {
        for(let i = 0; i < amount; i++) {

            player.R++;
            draw.Game();
            await sleep(10);

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
  
              draw.Game();
              await sleep(10);
  
            } else {
              player.X++;
  
              if (player.X > -player.R + 1650) {
                player.X = -player.R + 1650
              }
  
              draw.Game();
              await sleep(10);
            };
  
          }
  
            for (let i = 0; i < abs_yChange; i++) {
              if (yChange < 0) {
                player.Y--;
  
                if (player.Y < player.R + 28) {
                  player.Y = player.R + 28
                }
  
                draw.Game();
                await sleep(10);
              } else {
                player.Y++;
  
                if (player.Y > -player.R + 890) {
                  player.Y = -player.R + 890
                }
  
                draw.Game();
                await sleep(10);
              };
  
    }

    }
}

let misc = {
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    keyManager() {
        if (miscVar.MainMenu) {
            if (name == "Space") {
              miscVar.MainMenu = false
              spawnCoin(3000)
              draw.Game()
              player.grow(player.StartingR)
            }
  
            if (name == "KeyT") {
                miscVar.GrowPlayerOnCoin = !miscVar.GrowPlayerOnCoin;
              draw.Game()
            }
          } else{
            if (name == "KeyW") {
              player.move(0, -20)
            }
            if (name == "KeyS") {
              player.move(0, 20)
            }
            if (name == "KeyA") {
              player.move(-20, 0)
            }
            if (name == "KeyD") {
              player.move(20, 0)
            }
  
          }
    }

}

let coin = {

    x : Math.floor(Math.random() * 1636) + 20,
    y : Math.floor(Math.random() * 878) + 20,
    r : 0,
    exists : false,
    collected : 0,

    checkPlayerCollision() {
        if (this.x < player.X + player.R && this.x > player.X - player.R &&
            this.y < player.Y + player.R && this.y > player.Y - player.R && this.exists) {
        this.exists = false;
        this.collected++
        draw.Game()
        if(player.GrowOnCoin){
            player.grow(10)
        }
        this.spawnCoin(1500)
        console.log(this.collected)
        }
    },

    async grow(amount) {
        for(let i = 0; i < amount; i++) {
            this.r++;
            draw.Game();
            await misc.wait(10);
        }
    },

    async spawnCoin(delay) {
        coinVar.Exists = false
        await misc.wait(delay)
        coinVar.X = Math.floor(Math.random() * 1636) + 20;
        coinVar.Y = Math.floor(Math.random() * 878) + 20;
        coinVar.R = 5
        coinVar.Exists = true
        growCoin(10)

    }
}