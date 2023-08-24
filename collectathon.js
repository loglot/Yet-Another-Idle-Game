      const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      var playerR = 5
      var minPlayerR = 10
      var maxPlayerR = 450
      var startingPlayerR = 70
      var playerX = 838
      var playerY = 459
      var coinX = Math.floor(Math.random() * 1636) + 20;
      var coinY = Math.floor(Math.random() * 878) + 20;
      var coinR = 0
      var coinExists = false
      var coinsCollected = 0
      var mainMenu = true
      var growPlayerOnCoin = true

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
          playerR--;
          if (playerR < minPlayerR) {
            playerR = minPlayerR
          };
          drawGame();
          await sleep (10);
        }
      };

      async function growCirc(ammount){
        for(let i = 0; i < ammount; i++) {

            playerR++;
            drawGame();
            await sleep(10);

            if (playerR > maxPlayerR) {
              playerR = maxPlayerR
            }

            if (playerX < playerR + 5) {
              playerX = playerR + 5
            }

            if (playerX > -playerR + 1670) {
              playerX = -playerR + 1670
            }

            if (playerY < playerR + 8) {
              playerY = playerR + 8
            }

            if (playerY > -playerR + 910) {
              playerY = -playerR + 910
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
            playerX--;

            if (playerX < playerR + 25) {
              playerX = playerR + 25
            }

            drawGame();
            await sleep(10);

          } else {
            playerX++;

            if (playerX > -playerR + 1650) {
              playerX = -playerR + 1650
            }

            drawGame();
            await sleep(10);
          };

        }

          for (let i = 0; i < abs_yc; i++) {
            if (yc < 0) {
              playerY--;

              if (playerY < playerR + 28) {
                playerY = playerR + 28
              }

              drawGame();
              await sleep(10);
            } else {
              playerY++;

              if (playerY > -playerR + 890) {
                playerY = -playerR + 890
              }

              drawGame();
              await sleep(10);
            };

          };

//          console.log (playerX, y)

      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      function keyManager(name) {
        if (mainMenu) {
          if (name == "Space") {
            mainMenu = false
            spawnCoin(3000)
            drawGame()
            growCirc(startingPlayerR)
          }

          if (name == "KeyT") {
              growPlayerOnCoin = !growPlayerOnCoin;
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
        coinExists = false
        await sleep(delay)
        coinX = Math.floor(Math.random() * 1636) + 20;
        coinY = Math.floor(Math.random() * 878) + 20;
        coinR = 5
        coinExists = true
        growCoin(10)

      }

      async function growCoin(ammount) {
        for(let i = 0; i < ammount; i++) {
          coinR++;
          drawGame();
          await sleep(10);
        }
      }

      function coinCheck() {

        if (coinX < playerX + playerR && coinX > playerX - playerR && coinY < playerY + playerR && coinY > playerY - playerR && coinExists) {
          coinExists = false
          coinsCollected++
          drawGame()
          growCirc(10)
          spawnCoin(1500)
          console.log(coinsCollected)
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


        if (mainMenu) {
          drawStroked("yet another collectathon", 250, 200)
          drawStroked("press space to start", 260, 500)
          drawStroked(`growth on coin: ${growPlayerOnCoin ? "yes" : "no"} (press t to flip)`, 260, 600)
        } else{
          coinCheck()
          draw_circ(playerR, "#afbfaf", playerX, playerY)
          if (coinExists) {
//            console.log (coin)
            draw_circ(coinR, "yellow", coinX, coinY)
            
          }
          drawStroked(`${coinsCollected}`, 50, 100)
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
