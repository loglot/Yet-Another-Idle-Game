    const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      export var mainMenu = true;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      draw.Game()


    // Worry about later
      document.addEventListener('keypress', (event) => {
        var code = event.code;
        misc.keyManager(code)
      }, false);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// library
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
      async function shrinkCirc(ammount){
        for(let i = 0; i < ammount; i++) {
          playerVar.R--;
          if (playerVar.R < playerVar.MinR) {
            playerVar.R = playerVar.MinR
          };
          draw.draw.Game();
          await sleep (10);
        }
      };

      async function growCirc(ammount){
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

        };

      };


      async function moveCirc(xc, yc) {
        if (xc < 0) {
          var abs_xc = 0 - xc
        } else {
          var abs_xc = xc
        }

        if (yc < 0) {
          var abs_yc = 0 - yc
        } else {
          var abs_yc = yc
        }

        for (let i = 0; i < abs_xc; i++) {
          if (xc < 0) {
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

          for (let i = 0; i < abs_yc; i++) {
            if (yc < 0) {
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

          };

//          console.log (playerVar.X, y)

      }



      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      function keyManager(name) {
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
        }else{
//        if (name == "-") (
//          shrinkCirc(20)
//        )
//        if (name == "=" || name == "+") {
//          growCirc(20)
//        }
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
      };
*/

