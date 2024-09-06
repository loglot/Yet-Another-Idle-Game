'use strict';

// let player = {

//     R : 5,
//     MinR : 10,
//     MaxR : 450,
//     StartingR : 70,
//     X : 838,
//     Y : 459,

//     snailSpeedOption : 0,
//     slowSpeedOption : 1,
//     mediumSpeedOption : 2,
//     fastSpeedOption : 3,
//     unstableSpeedOption :4,
    
//     currentSpeedOption : 2,
//     GrowOnCoinOption : false,

//     snailSpeed : 1,
//     slowSpeed : 5,
//     mediumSpeed : 10,
//     fastSpeed : 20,
//     unstableSpeed : 500,

//     currentSpeed : 10,

//     async grow(amount) {
//         for(let i = 0; i < amount; i++) {

//             player.R++;
//             await misc.sleep(10);

//             if (player.R > player.MaxR) {
//               player.R = player.MaxR
//             }

//             if (player.X < player.R + 5) {
//               player.X = player.R + 5
//             }

//             if (player.X > -player.R + 1670) {
//               player.X = -player.R + 1670
//             }

//             if (player.Y < player.R + 8) {
//               player.Y = player.R + 8
//             }

//             if (player.Y > -player.R + 910) {
//               player.Y = -player.R + 910
//             }

//         }

//     },

//     async move(xChange, yChange) {
//         if (xChange < 0) {
//             var abs_xChange = 0 - xChange
//           } else {
//             var abs_xChange = xChange
//           }
  
//           if (yChange < 0) {
//             var abs_yChange = 0 - yChange
//           } else {
//             var abs_yChange = yChange
//           }
  
//           for (let i = 0; i < abs_xChange; i++) {
//             if (xChange < 0) {
//               player.X--;
  
//               if (player.X < player.R + 25) {
//                 player.X = player.R + 25
//               }

//               await misc.sleep(10);
  
//             } else {
//               player.X++;
  
//               if (player.X > -player.R + 1650) {
//                 player.X = -player.R + 1650
//               }

//               await misc.sleep(10);
//             };
  
//           }
  
//             for (let i = 0; i < abs_yChange; i++) {
//               if (yChange < 0) {
//                 player.Y--;
  
//                 if (player.Y < player.R + 28) {
//                   player.Y = player.R + 28
//                 }

//                 await misc.sleep(10);
//               } else {
//                 player.Y++;
  
//                 if (player.Y > -player.R + 890) {
//                   player.Y = -player.R + 890
//                 }

//                 await misc.sleep(10);
//               }
//         }
//     },

//     cycleSpeedOption() {
//         player.currentSpeedOption++;

//         if (player.currentSpeedOption == player.unstableSpeedOption+1) {
//           player.currentSpeedOption = player.snailSpeedOption;
//         }

//         this.changeSpeedBasedOnOption();
//     },

//     changeSpeedBasedOnOption() {
//       switch (this.currentSpeedOption) {
//         case this.snailSpeedOption:
//           this.currentSpeed = this.snailSpeed;
//         break;
//         case this.slowSpeedOption:
//           this.currentSpeed = this.slowSpeed;
//           break;
//         case this.mediumSpeedOption:
//           this.currentSpeed = this.mediumSpeed;
//           break
//         case this.fastSpeedOption:
//           this.currentSpeed = this.fastSpeed;
//           break;
//         case this.unstableSpeedOption:
//           this.currentSpeed = this.unstableSpeed;
//           break;
//       }
//     }
// }

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
            if (player.GrowOnCoinOption) {
                player.grow(10)
            }
            this.spawnCoin(1500)
        }
    },

    async grow(amount) {
        for(let i = 0; i < amount; i++) {
            this.R++;
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
        Digit1 = 1
        KeyW = 2
        KeyA = 3
        KeyS = 4
        KeyD = 5
        Digit2 = 6
     */
    keysPressed : new Array(7),
    keysJustPressed : new Array(7),

    wasKeyJustPressed(code) {
      switch (code) {
        case "Space": return this.keysJustPressed[0]
            case "Digit1": return this.keysJustPressed[1]
              case "KeyW": return this.keysJustPressed[2]
     case "KeyA": return this.keysJustPressed[3]
     case "KeyS": return this.keysJustPressed[4]
          case "KeyD": return this.keysJustPressed[5]
          case "Digit2": return this.keysJustPressed[6]
      }
    },

    isKeyPressed(code) {
        switch (code) {
            case "Space": return this.keysPressed[0]
               case "Digit1": return this.keysPressed[1]
         case "KeyW": return this.keysPressed[2]
         case "KeyA": return this.keysPressed[3]
            case "KeyS": return this.keysPressed[4]
 case "KeyD": return this.keysPressed[5]
            case "Digit2": return this.keysPressed[6]
        }
    },

    setKeyPressed(code, pressed) {
        switch (code) {
            case "Space":
              this.keysPressed[0] = pressed
              this.keysJustPressed[0] = pressed;
              break
            case "Digit1":
              this.keysPressed[1] = pressed
              this.keysJustPressed[1] = pressed;
              break
            case "KeyW":
              this.keysPressed[2] = pressed
              this.keysJustPressed[2] = pressed;
              break
            case "KeyA":
              this.keysPressed[3] = pressed
              this.keysJustPressed[3] = pressed;
              break
            case "KeyS":
              this.keysPressed[4] = pressed
              this.keysJustPressed[4] = pressed;
              break
            case "KeyD":
              this.keysPressed[5] = pressed
              this.keysJustPressed[5] = pressed
              break;
            case "Digit2":
              this.keysPressed[6] = pressed
              this.keysJustPressed[6] = pressed
        }
    },

    doActionsFromKeyInput() {
        if (misc.MainMenu) {
            if (this.isKeyPressed("Space")) {
                misc.MainMenu = false
                coin.spawnCoin(3000)
                player.grow(player.StartingR)
            }
            if (this.wasKeyJustPressed("Digit1")) {
                player.GrowOnCoinOption = !player.GrowOnCoinOption;
            }
            if (this.wasKeyJustPressed("Digit2")) {
                player.cycleSpeedOption();
            }
        } else {
            if (this.isKeyPressed("KeyW")) {
                player.move(0, -player.currentSpeed)
            }
            if (this.isKeyPressed("KeyS")) {
                player.move(0, player.currentSpeed)
            }
            if (this.isKeyPressed("KeyA")) {
                player.move(-player.currentSpeed, 0)
            }
            if (this.isKeyPressed("KeyD")) {
                player.move(player.currentSpeed, 0)
            }
        }
    },

    onTick() {
      for (let i = 0; i < this.keysJustPressed.length; i++) {
        this.keysJustPressed[i] = false;
      }
    }
}
