      const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

    //  const { player, coin, misc } = require('./lib/var.js')
    //  import {player, coin, misc} from './lib/var.js'
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

       player.StartingR = 70
 
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log(player.StartingR)
      drawGame()

      document.addEventListener('keypress', (event) => {
        var code = event.code;
        keyManager(code)
      }, false);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// library
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      async function shrinkCirc(ammount){
        for(let i = 0; i < ammount; i++) {
          player.R--;
          if (player.R < player.MinR) {
            player.R = player.MinR
          };
          draw.drawGame();
          await sleep (10);
        }
      };

      async function growCirc(ammount){
        for(let i = 0; i < ammount; i++) {

            player.R++;
            drawGame();
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

        };

//        console.log (r)

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
            player.X--;

            if (player.X < player.R + 25) {
              player.X = player.R + 25
            }

            drawGame();
            await sleep(10);

          } else {
            player.X++;

            if (player.X > -player.R + 1650) {
              player.X = -player.R + 1650
            }

            drawGame();
            await sleep(10);
          };

        }

          for (let i = 0; i < abs_yc; i++) {
            if (yc < 0) {
              player.Y--;

              if (player.Y < player.R + 28) {
                player.Y = player.R + 28
              }

              drawGame();
              await sleep(10);
            } else {
              player.Y++;

              if (player.Y > -player.R + 890) {
                player.Y = -player.R + 890
              }

              drawGame();
              await sleep(10);
            };

          };

//          console.log (player.X, y)

      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      function keyManager(name) {
        if (misc.MainMenu) {
          if (name == "Space") {
            misc.MainMenu = false
            spawnCoin(3000)
            drawGame()
            growCirc(player.StartingR)
          }

          if (name == "KeyT") {
              misc.GrowPlayerOnCoin = !misc.GrowPlayerOnCoin;
            drawGame()
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

      async function spawnCoin(delay) {
        coin.Exists = false
        await sleep(delay)
        coin.X = Math.floor(Math.random() * 1636) + 20;
        coin.Y = Math.floor(Math.random() * 878) + 20;
        coin.R = 5
        coin.Exists = true
        growCoin(10)

      }

      async function growCoin(ammount) {
        for(let i = 0; i < ammount; i++) {
          coin.R++;
          drawGame();
          await sleep(10);
        }
      }

      function coinCheck() {

        if (coin.X < player.X + player.R && coin.X > player.X - player.R && coin.Y < player.Y + player.R && coin.Y > player.Y - player.R && coin.Exists) {
          coin.Exists = false
          coin.Collected++
          drawGame()
          growCirc(10)
          spawnCoin(1500)
          console.log(coin.Collected)
        }
        
      }

      function drawStroked(text, x, y) {
        ctx.font = '80px Sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.lineJoin="miter";
        ctx.miterLimit=2;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y);
      }


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//frame drawing
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


      function drawGame() {

        //clear screen

        draw_rect()


        if (misc.MainMenu) {
          drawStroked("yet another collectathon", 250, 200)
          drawStroked("press space to start", 260, 500)
          drawStroked(`growth on coin: ${misc.GrowPlayerOnCoin ? "yes" : "no"} (press t to flip)`, 260, 600)
        } else{
          coinCheck()
          draw_circ(player.R, "#afbfaf", player.X, player.Y)
          if (coin.Exists) {
//            console.log (coin)
            draw_circ(coin.R, "yellow", coin.X, coin.Y)
            
          }
          drawStroked(`${coin.Collected}`, 50, 100)
        }
      }


      function draw_circ(radius, color, x, y, shadow) {
        inline = radius - 5

        //outline

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //shadow

        if (shadow == "no"){

        } else {
        ctx.beginPath();
        ctx.arc(x - 5, y + 5, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(0, 0, 0, .1)";
        ctx.fill();
        ctx.closePath();
        }

        //main color

        ctx.beginPath();
        ctx.arc(x, y, inline, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

      };

      function draw_rect() {

        if (true) {

          ctx.beginPath();
          ctx.rect(0, 20, 1676, 878);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.rect(20, 0, 1636, 918);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();

          draw_circ(20, "black", 20, 20, "no")
          draw_circ(20, "black", 1656, 20, "no")
          draw_circ(20, "black", 20, 898, "no")
          draw_circ(20, "black", 1656, 898, "no")

        }


        ctx.beginPath();
        ctx.rect(20, 20, 1636, 878);
        ctx.fillStyle = "#90b0c0";
        ctx.fill();
        ctx.closePath();

      }
