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
    shopDrawn = false
    iPressed = false
    purchace = false
    leave = false
    down = false
    constructor(Game){
        this.game = Game
    }
    
    Game() { // 

        //clear screen
        this.resizeCanvasForWindowSize()
        this.ArcadeBG()
        this.sidebar()

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
            this.drawGame()

        } else if(this.game.State == "shop") {
            this.drawShop()

        } else if(this.game.State == "info") {
            this.drawInfo()
            
        }
    }

    drawShop(){
        this.DrawStroked(`${this.game.Collected}` + "$", 50, 100)
        this.DrawStroked("==>                                                 <==", 110,450 )
        this.shopY = (this.shopY*9 + (-100 * this.game.menu.shopSelect))/10
        
        this.shopDrawn = true
        for(let i = 0; i < this.game.menu.shopItems.length; i++){
            if(this.game.menu.shopItems[i].cost > this.game.Collected){
                var color = "#555555"
            }
            else{
                var color = "#ffffff"
            }
            var ything = 450 + (100*i) + (this.shopY)
            if(this.game.menu.shopItems[i].cost == -1){
                color = "#555555"
                this.DrawStroked(this.game.menu.shopItems[i].title + " : " + "Out Of Stock", (310-i*200)-(this.shopY*2 ),ything + (((ything)-450)*((ything)-450))/40, color, 10000, 80 + i*20 +(this.shopY/5 ))

            } else {
                //this.DrawStroked(this.game.menu.shopItems[i].title + " : " + this.game.menu.shopItems[i].cost + "$", 310,450 + (100*i) + (this.shopY), color )
                this.DrawStroked(this.game.menu.shopItems[i].title + " : " + this.game.menu.shopItems[i].cost + "$", (310-i*200)-(this.shopY*2 ),ything + (((ything)-450)*((ything)-450))/40, color, 10000, 80 + i*20 +(this.shopY/5 ))
            }
        }
        if(this.iPressed == false){
            this.DrawStroked("I to look at the items info", 770, 100)
        }else if(this.purchace == false){
            this.DrawStroked("Enter to Buy the item", 900, 100)
        }else if(this.leave == false){
            this.DrawStroked("E to leave the shop", 950, 100)
        }else if(this.down == false){
            this.DrawStroked("Down Arrow to look at more of the shop", 240, 100)
        }
    }


    drawInfo(){
        this.DrawStroked(`${this.game.Collected}` + "$", 50, 100)
        this.DrawStroked(this.game.menu.shopItems[this.game.menu.shopSelect].title + ";", 150, 200)
        this.DrawStroked(this.game.menu.shopItems[this.game.menu.shopSelect].info + ";", 150, 400)
        this.DrawStroked("costs: " + this.game.menu.shopItems[this.game.menu.shopSelect].cost + "$" + ";", 150, 850)

        if(this.iPressed == false){
            this.DrawStroked("I to go back to the shop", 800, 100)
        }
    }


    drawGame(){
        if(this.game.Style){
            if(this.shopDrawn == false && this.game.Collected >= 3){
                this.DrawStroked("E to go to the shop", 950, 100)
            }
            this.Circ(this.game.player.R, "#afbfaf", this.game.player.X, this.game.player.Y, true, "#33363f")

            for(let i = 0; i < this.game.player.coins.length; i++){
                this.Circ(this.game.player.coins[i].R, "#dfdf8d", this.game.player.coins[i].X, this.game.player.coins[i].Y, true, "#33363f")
            }  
            for(let i = 0; i < this.game.player.lava.length; i++){
                this.Circ(this.game.player.lava[i].R, "#df8f8d", this.game.player.lava[i].X, this.game.player.lava[i].Y, true, "#33363f")
            }  
        }
        
        this.DrawStroked(`${this.game.Collected}` + "$", 50, 100)
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

    sidebar(){
        this.Circ(20, "black", 1720, 70, "no")
        this.Circ(20, "black", 1720, 848, "no")
        this.Circ(20, "black", 1780, 848, "no")
        this.Circ(20, "black", 1780, 70, "no")

        ctx.beginPath();
        ctx.rect(1720, 50, 60, 818);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(1700, 70, 100, 778);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(1720, 70, 60, 778);
        ctx.fillStyle = "#ff9f9f";
        ctx.fill();
        ctx.closePath();

        this.DrawStroked("S P A C E", 1723, 135, "white", 0)
        this.DrawStroked("L B", 1723, 735, "white", 0)

        ctx.beginPath();
        ctx.rect(1720, 70, 60, 778 - (this.game.player.lavaKillRatio * 778));
        ctx.fillStyle = "rgba(0,0,0,.7)";
        ctx.fill();
        ctx.closePath();

    }

    DrawStroked(text, x, y, color = "white", width = 1500, size = 80, shadow = true) {
        ctx.font = `${size}px Sans-serif`;
        ctx.lineWidth = 8;
        ctx.lineJoin="miter";
        ctx.miterLimit=2;
        var splitText = this.getLines(ctx, text, width)
        for(let i = 0; i < splitText.length; i++){
            if(shadow == true){
                ctx.strokeStyle = 'rgba(0,0,0,.1)';
                ctx.strokeText(splitText[i], x - 5, (y + 5) + (75*i));
            }
            ctx.strokeStyle = 'black';
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