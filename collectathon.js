      const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      var r = 5
      var min = 10
      var max = 4502
      var start = 70
      var x = 838
      var y = 459
      var coin_x = Math.floor(Math.random() * 1636) + 20;
      var coin_y = Math.floor(Math.random() * 878) + 20;
      var coin_r = 0
      var coin = 0
      var collection = 0
      var menu = 1

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      draw_game()

      document.addEventListener('keypress', (event) => {
        var name = event.key;
        var code = event.code;
        key_man(name)
        }, false);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// library
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      async function shrink_circ(ammount){
        for(let i = 0; i < ammount; i++) {
          r--;
          if (r < min) {
            r = min
          };
          draw_game();
          await sleep (10);
        }
      };

      async function grow_circ(ammount){
        for(let i = 0; i < ammount; i++) {

            r++;
            draw_game();
            await sleep(10);

            if (r > max) {
              r = max
            }

            if (x < r + 5) {
              x = r + 5
            }

            if (x > -r + 1670) {
              x = -r + 1670
            }

            if (y < r + 8) {
              y = r + 8
            }

            if (y > -r + 910) {
              y = -r + 910
            }

        };

//        console.log (r)

      };

      async function move_circ(xc, yc) {
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
            x--;

            if (x < r + 25) {
              x = r + 25
            }

            draw_game();
            await sleep(10);

          } else {
            x++;

            if (x > -r + 1650) {
              x = -r + 1650
            }

            draw_game();
            await sleep(10);
          };

        }

          for (let i = 0; i < abs_yc; i++) {
            if (yc < 0) {
              y--;

              if (y < r + 28) {
                y = r + 28
              }

              draw_game();
              await sleep(10);
            } else {
              y++;

              if (y > -r + 890) {
                y = -r + 890
              }

              draw_game();
              await sleep(10);
            };

          };

//          console.log (x, y)

      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      function key_man(name) {
        if (menu == 1) {
          if (name == " ") {
            menu++
            spawn_coin(3000)
            draw_game()
            grow_circ(start)
          }
        }else{
//        if (name == "-") (
//          shrink_circ(20)
//        )
//        if (name == "=" || name == "+") {
//          grow_circ(20)
//        }
          if (name == "w" || name == "ArrowUp") {
      	    move_circ(0, -20)
          }
          if (name == "s") {
            move_circ(0, 20)
      	  }
       	  if (name == "a") {
       	    move_circ(-20, 0)
          }
          if (name == "d") {
            move_circ(20, 0)
					}
        }
      };

      async function spawn_coin(delay) {
        coin = 0
        await sleep(delay)
        coin_x = Math.floor(Math.random() * 1636) + 20;
        coin_y = Math.floor(Math.random() * 878) + 20;
        coin_r = 5
        coin = 1
        grow_coin(10)

      }

      async function grow_coin(ammount) {
        for(let i = 0; i < ammount; i++) {
          coin_r++;
          draw_game();
          await sleep(10);
        }
      }

      function coin_check() {

        if (coin_x < x + r && coin_x > x - r && coin_y < y + r && coin_y > y - r && coin == 1) {
          coin = 0
          collection++
          draw_game()
          grow_circ(10)
          spawn_coin(1500)
          console.log(collection)
        }
        
      }

      function drawStroked(text, x, y) {
        ctx.font = '80px Sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y);
      }


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//circle drawing
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      function draw_game() {

        //clear screen

        draw_rect()

				
        if (menu == 1) {
          drawStroked("yet another collectathon", 250, 200)
          drawStroked("press space to start", 260, 500)
        } else{
        coin_check()
        draw_circ(r, "#afbfaf", x, y)
        if (coin == 1) {
//          console.log (coin)
          draw_circ(coin_r, "yellow", coin_x, coin_y)
					}
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
