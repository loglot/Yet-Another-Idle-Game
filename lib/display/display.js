const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

const originalWidth = canvas.width;
const originalHeight = canvas.height;
var scaleX = 0;
var scaleY = 0;
export class Draw {
    game
    selectY = 250
    shopY = 0
    constructor(Game){
        this.game = Game
    }
    
    Game() { // 

        //clear screen
        this.resizeCanvasForWindowSize()
        this.ArcadeBG()

        ctx.beginPath();
        ctx.rect(1700, 50, 100, 818);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(1720, 70, 60, 778);
        ctx.fillStyle = "#bfbfbf";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(1720, 70, 60, 778 - (this.game.player.lavaKillRatio * 778));
        ctx.fillStyle = "rgba(0,0,0,.7)";
        ctx.fill();
        ctx.closePath();

        if(this.game.State == "main"){

            this.DrawStroked("Yet Another Idle Game", 250, 200)
            this.DrawStroked("Press W To Start", 260, 350)
            //this.DrawStroked("Press S For Settings", 260, 450)
            
        } else if(this.game.State == "settings") {



            this.selectY = ((this.selectY * 10)+((250 + (100*this.game.SettingSelect))))/11
            this.DrawStroked("==>                                                 <==", 110,this.selectY )
            this.DrawStroked(`Audio : ${this.game.Audios}`, 260, 250)


            this.DrawStroked("S to go back to menu", 260, 750)
        } else if(this.game.State == "game") {
            if(this.game.Style){
                this.Circ(this.game.player.R, "#afbfaf", this.game.player.X, this.game.player.Y, true, "#33363f")
                for(let i = 0; i < this.game.player.coins.length; i++){
                    this.Circ(this.game.player.coins[i].R, "#dfdf8d", this.game.player.coins[i].X, this.game.player.coins[i].Y, true, "#33363f")
                }  
                for(let i = 0; i < this.game.player.lava.length; i++){
                    this.Circ(this.game.player.lava[i].R, "#df8f8d", this.game.player.lava[i].X, this.game.player.lava[i].Y, true, "#33363f")
                }  
            }
            
            this.DrawStroked(`${this.game.Collected}`, 50, 100)
        } else if(this.game.State == "shop") {
            this.DrawStroked(`${this.game.Collected}`, 50, 100)
            this.DrawStroked("==>                                                 <==", 110,450 )
            this.shopY = (this.shopY*9 + (-100 * this.game.menu.shopSelect))/10
            for(let i = 0; i < this.game.menu.shopItems.length; i++){
                if(this.game.menu.shopItems[i].cost > this.game.Collected){
                    var color = "#555555"
                }
                else{
                    var color = "#ffffff"
                }
                this.DrawStroked(this.game.menu.shopItems[i].title + ",  costs : " + this.game.menu.shopItems[i].cost, 310,450 + (100*i) + (this.shopY), color )

            }


        } else if(this.game.State == "info") {
            this.DrawStroked(`${this.game.Collected}`, 50, 100)
            this.DrawStroked(this.game.menu.shopItems[this.game.menu.shopSelect].title + ";", 150, 200)
            this.DrawStroked(this.game.menu.shopItems[this.game.menu.shopSelect].info + ";", 150, 400)
            this.DrawStroked("costs: " + this.game.menu.shopItems[this.game.menu.shopSelect].cost + ";", 150, 850)
            
        }
    }

    ArcadeBG() {

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

    DrawStroked(text, x, y, color = "white", width = 1500) {
        ctx.font = '80px Sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.lineJoin="miter";
        ctx.miterLimit=2;
        var splitText = this.getLines(ctx, text, width)
        for(let i = 0; i < splitText.length; i++){
            ctx.strokeText(splitText[i], x, y + (75*i));
            ctx.fillStyle = color;
            ctx.fillText(splitText[i], x, y + (75*i));
        }
    }
    
    getLines(ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
    
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
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