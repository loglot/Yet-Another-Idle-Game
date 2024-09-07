const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

const originalWidth = canvas.width;
const originalHeight = canvas.height;
var scaleX = 0;
var scaleY = 0;
export class Draw {
    game
    constructor(Game){
        this.game = Game
    }
    
    Game() {

        //clear screen
        this.resizeCanvasForWindowSize()
        this.Rect()

        if (this.game.MainMenu) {

        if(this.game.MenuState == "main"){

            this.DrawStroked("Yet Another Collectathon", 250, 200)
            this.DrawStroked("Press W To Start", 260, 350)
            this.DrawStroked("Press S For Settings", 260, 450)
            
        } else if(this.game.MenuState == "settings") {
            if (this.game.SpeedSelect == this.game.player.snailSpeedOption) {
                var speed_option_eng = "snail";
              } else if (this.game.SpeedSelect == this.game.player.slowSpeedOption) {
                var speed_option_eng = "slow";
              } else if (this.game.SpeedSelect == this.game.player.mediumSpeedOption) {
                var speed_option_eng = "medium"
              } else if (this.game.SpeedSelect == this.game.player.fastSpeedOption) {
                var speed_option_eng = "fast"
              }  else if (this.game.SpeedSelect == this.game.player.unstableSpeedOption) {
                var speed_option_eng = "unstable"
              }


            this.DrawStroked(`New Style : ${this.game.Style}`, 260, 250)
            
            this.DrawStroked(`Coin Collect Growth? : ${this.game.Grow}`, 260, 350)
            this.DrawStroked("==>                                                 <==", 110, 250 + (100*this.game.SettingSelect))
            this.DrawStroked(`Speed : ${speed_option_eng}`, 260, 450)


            this.DrawStroked("S to go back to menu", 260, 750)
        }
        //   this.DrawStroked(`growth on coin: ${this.game.player.GrowOnCoinOption ? "yes" : "no"} (press 1 to flip)`, 260, 500)
        //   this.DrawStroked(`speed : ${speed_option_eng} (press 2 to flip)`, 260, 600)
        //  this.DrawStroked(" ==> to move", 756, 767) 
        } else {
            if(this.game.Style){
                this.Circ(this.game.player.R, "#afbfaf", this.game.player.X, this.game.player.Y, true, "#33363f")
                for(let i = 0; i < this.game.player.coins.length; i++){
                    this.Circ(this.game.player.coins[i].R, "#dfdf8d", this.game.player.coins[i].X, this.game.player.coins[i].Y, true, "#33363f")
                }  
            } else {
                this.Circ(this.game.player.R, "#afbfaf", this.game.player.X, this.game.player.Y, true)
                for(let i = 0; i < this.game.player.coins.length; i++){
                    this.Circ(this.game.player.coins[i].R, "yellow", this.game.player.coins[i].X, this.game.player.coins[i].Y, true)
                }  
            }
            
            this.DrawStroked(`${this.game.Collected}`, 50, 100)
        }
    }

    Rect() {

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
        this.Circ(20, "black", 20, 20, "no")
        this.Circ(20, "black", 1656, 20, "no")
        this.Circ(20, "black", 20, 898, "no")
        this.Circ(20, "black", 1656, 898, "no")
  
  
        ctx.beginPath();
        ctx.rect(20, 20, 1636, 878);
        ctx.fillStyle = "#90b0c0";
        ctx.fill();
        ctx.closePath();
    }

    Circ(radius, color, x, y, shadow, OLColor = "black") {
        let inline = radius - 5

        //outline

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = OLColor;
        ctx.fill();
        ctx.closePath();

        //shadow

        if (shadow === true){
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

    }

    DrawStroked(text, x, y) {
        ctx.font = '80px Sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.lineJoin="miter";
        ctx.miterLimit=2;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y);
    }
    
    resizeCanvasForWindowSize() {

        var currentWidth = canvas.width;
        var currentHeight = canvas.height;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        
        var desiredWidth = windowWidth;
        var aspectRatio = originalWidth / originalHeight;
        var desiredHeight = desiredWidth / aspectRatio;
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        scaleX = (desiredWidth / originalWidth);
        scaleY = (desiredHeight / originalHeight);
        ctx.setTransform(scaleY, 0, 0, scaleX, 0, 0)
  
         currentWidth = canvas.width;
         currentHeight = canvas.height;
  
        if (currentHeight >= windowHeight) {
           desiredHeight = windowHeight;
           aspectRatio = originalWidth / originalHeight;
           desiredWidth = desiredHeight * aspectRatio;
          canvas.width = desiredWidth;
          canvas.height = desiredHeight;
          scaleX = (desiredWidth / originalWidth);
          scaleY = (desiredHeight / originalHeight);
          ctx.setTransform(scaleY, 0, 0, scaleX, 0, 0)
        }
  
  
    }
}