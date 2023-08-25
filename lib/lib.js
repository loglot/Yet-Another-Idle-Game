let player = {
    Shrink = async function(ammount){
        for(let i = 0; i < ammount; i++) {
          playerVar.R--;
          if (playerVar.R < playerVar.MinR) {
            playerVar.R = playerVar.MinR
          };
          draw.Game();
          await sleep (10);
        }
    
    },

    Grow = async function() {
        for(let i = 0; i < ammount; i++) {

            playerVar.R++;
            draw.Game();
            await sleep(10);

            if (playerVar.R > playerVar.MaxR) {
              playerVar.R = playerVar.MaxR
            }

            if (playerVar.X < playerVar.R + 5) {
              playerVar.X = playerVar.R + 5
            }

            if (playerVar.X > -playerVar.R + 1670) {
              playerVar.X = -playerVar.R + 1670
            }

            if (playerVar.Y < playerVar.R + 8) {
              playerVar.Y = playerVar.R + 8
            }

            if (playerVar.Y > -playerVar.R + 910) {
              playerVar.Y = -playerVar.R + 910
            }

        }

    },

    Move = async function(xChange, yChange) {
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
              playerVar.X--;
  
              if (playerVar.X < playerVar.R + 25) {
                playerVar.X = playerVar.R + 25
              }
  
              draw.Game();
              await sleep(10);
  
            } else {
              playerVar.X++;
  
              if (playerVar.X > -playerVar.R + 1650) {
                playerVar.X = -playerVar.R + 1650
              }
  
              draw.Game();
              await sleep(10);
            };
  
          }
  
            for (let i = 0; i < abs_yChange; i++) {
              if (yChange < 0) {
                playerVar.Y--;
  
                if (playerVar.Y < playerVar.R + 28) {
                  playerVar.Y = playerVar.R + 28
                }
  
                draw.Game();
                await sleep(10);
              } else {
                playerVar.Y++;
  
                if (playerVar.Y > -playerVar.R + 890) {
                  playerVar.Y = -playerVar.R + 890
                }
  
                draw.Game();
                await sleep(10);
              };
  
    }

    }

}

let misc = {
    Wait = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    KeyManager = function() {
        if (miscVar.MainMenu) {
            if (name == "Space") {
              miscVar.MainMenu = false
              spawnCoin(3000)
              draw.Game()
              growCirc(playerVar.StartingR)
            }
  
            if (name == "KeyT") {
                miscVar.GrowPlayerOnCoin = !miscVar.GrowPlayerOnCoin;
              draw.Game()
            }
          } else{
            if (name == "KeyW") {
              moveCirc(0, -20)
            }
            if (name == "KeyS") {
              moveCirc(0, 20)
            }
            if (name == "KeyA") {
              moveCirc(-20, 0)
            }
            if (name == "KeyD") {
              moveCirc(20, 0)
            }
  
          }
    }

}