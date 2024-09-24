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
    prest = true
    xOffset = 150
    colors = ["#90b0c0", "#afbfaf", "#c0b090", "#bfafbf", "#bfcfaf", "#dfafaf", "#ffffff"]
    colorIndex = 0
    coinLog = ""
    debugInfo = false
    cycleColorThingOne = 0
    cycleColorThingTwo = 255
    cycleColorThingThree = 0
    cycleState = "+"
    constructor(Game){
        this.game = Game
        
    }
    
    Game() { // 
        
        //clear screen
        this.resizeCanvasForWindowSize()
        this.sidebar()
        this.ArcadeBG()
        if(this.cycleState == "+"){
            this.cycleColorThingOne++
            this.cycleColorThingTwo--
        }
        if(this.cycleState == "-"){
            this.cycleColorThingOne--
            this.cycleColorThingTwo++
        }
        if(this.cycleColorThingOne == 255){
            this.cycleState = "-"
        }
        if(this.cycleColorThingOne == 0){
            this.cycleState = "+"
        }
        if(this.game.keyMan.wasKeyJustPressed("KeyI") && this.game.keyMan.isKeyPressed("Backslash")){
            this.debugInfo = !this.debugInfo
        }
        if(this.debugInfo){
            this.DrawStroked(`${this.coinLog}`, 50, 850, "rgba(0,0,0,0)", 9999, 80, false, "rgba(0,0,0,.1)", 2)
            this.DrawStroked(`rgb(${this.cycleColorThingOne},${this.cycleColorThingThree},${this.cycleColorThingTwo})`, 50, 650, "rgba(0,0,0,0)", 9999, 80, false, "rgba(0,0,0,.1)", 2)
            this.DrawStroked(`X : ${Math.round(this.game.player.X)} + ${Math.round(this.game.player.velX)}   Y : ${Math.round(this.game.player.Y)} + ${Math.round(this.game.player.velY)}`, 50, 750, "rgba(0,0,0,0)", 9999, 80, false, "rgba(0,0,0,.1)", 2)
        }


        if(this.game.State == "main"){

            this.DrawStroked("Yet Another Idle Game", 250, 200)
            this.DrawStroked("Press W To Start", 260, 350)
            if(this.game.points > 0){
                this.DrawStroked(`${this.game.points}` + "!", 260, 650)
            }
            if(this.game.ascend > 0){
                this.DrawStroked(`${this.game.ascend}` + "#", 460, 650)
            }
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

        } else if(this.game.State == "prestShop") {
            this.drawShopII()

        } else if(this.game.State == "info") {
            this.drawInfo()
            
        }
    }

    drawShop(){
        this.DrawStroked(`${this.game.Collected}` + "$", 50, 100)
        this.DrawStroked("==>                                                 <==", 110,450 )
        this.shopY = (this.shopY*9 + (-100 * this.game.menu.shopSelect))/10
        
        this.shopDrawn = true
        ctx.rect(20 + this.xOffset, 20, 1636, 878);
        ctx.clip()
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
        }else if(this.prest == false){
            this.DrawStroked("       P to use the special prestige points", 240, 100)
        }else if(this.purchace == false){
            this.DrawStroked("Enter to Buy the item", 900, 100)
        }else if(this.leave == false){
            this.DrawStroked("E to leave the shop", 950, 100)
        }else if(this.down == false){
            this.DrawStroked("Down Arrow to look at more of the shop", 240, 100)
        }
    }
    drawShopII(){
        this.DrawStroked(`${this.game.points}` + "!", 50, 100)
        this.DrawStroked("==>                                                 <==", 110,450 )
        this.shopY = (this.shopY*9 + (-100 * this.game.menu.shopSelectII))/10
        
        ctx.rect(20 + this.xOffset, 20, 1636, 878);
        ctx.clip()
        for(let i = 0; i < this.game.menu.prestigeShop.length; i++){
            if(this.game.menu.prestigeShop[i].cost > this.game.points){
                var color = "#555555"
            }
            else{
                var color = "#ffffff"
            }
             var ything = 450 + (100*i) + (this.shopY)
            if(this.game.menu.prestigeShop[i].cost == -1){
                color = "#555555"
                this.DrawStroked(this.game.menu.prestigeShop[i].title + " : " + "Out Of Stock", (310-i*200)-(this.shopY*2 ),ything + (((ything)-450)*((ything)-450))/40, color, 10000, 80 + i*20 +(this.shopY/5 ))

            } else {
                //this.DrawStroked(this.game.menu.prestigeShop[i].title + " : " + this.game.menu.prestigeShop[i].cost + "$", 310,450 + (100*i) + (this.shopY), color )
                this.DrawStroked(this.game.menu.prestigeShop[i].title + " : " + this.game.menu.prestigeShop[i].cost + "!", (310-i*200)-(this.shopY*2 ),ything + (((ything)-450)*((ything)-450))/40, color, 10000, 80 + i*20 +(this.shopY/5 ))
            }
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
        ctx.rect(20 + this.xOffset, 20, 1636, 878);
        ctx.clip()
        if(this.game.Style){
            if(!this.game.player.ascend){
                this.Circ(this.game.player.R + this.game.player.magnetism, "rgba(200,100,0,.1)", this.game.player.X, this.game.player.Y, false, "rgba(0,0,0,0)")

                this.DrawStroked(`${this.game.Collected}` + "$", 50, 100)
                if(this.shopDrawn == false && this.game.Collected >= 3){
                    this.DrawStroked("E to go to the shop", 950, 100)
                }
                
                for(let i = 0; i < this.game.player.coins.length; i++){
                    this.Circ(this.game.player.coins[i].R, "#dfdf8d", this.game.player.coins[i].X, this.game.player.coins[i].Y, true, "#6f6f33")
                }  
                for(let i = 0; i < this.game.player.lava.length; i++){
                    if(this.game.player.lava[i].color == "cycle"){
                        this.Circ(this.game.player.lava[i].R, `rgb(${this.cycleColorThingOne},${this.game.player.lava[i].livingTime/2},${this.cycleColorThingTwo})`, this.game.player.lava[i].X, this.game.player.lava[i].Y, true, "#33363f")                
                    } else{
                        this.Circ(this.game.player.lava[i].R, this.game.player.lava[i].color, this.game.player.lava[i].X, this.game.player.lava[i].Y, true, "#af4343")
                    }
                }  
            }
            this.Circ(this.game.player.R, this.colors[this.colorIndex + 1], this.game.player.X, this.game.player.Y, true, "#33363f")

        }
        if(!this.game.player.prestiegeAnim){

            this.DrawStroked(`${this.game.Collected}` + "$", 50, 100, "white", 10000, 80, false)
        }
    }

    ArcadeBG() {
        this.Rect(0, 20, 1676, 878);
        this.Rect(20, 0, 1636, 918);
        this.Circ(20, "black", 20, 20, "no")
        this.Circ(20, "black", 1656, 20, "no")
        this.Circ(20, "black", 20, 898, "no")
        this.Circ(20, "black", 1656, 898, "no")
  
  
        this.Rect(20, 20, 1636, 878, this.colors[this.colorIndex]);
    }

    Rect(x, y, width, height, color = "black"){
        ctx.beginPath();
        ctx.rect(x + this.xOffset, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    Circ(radius, color, x, y, shadow, OLColor = "black") {
        let inline = radius - 5

        //outline

        ctx.beginPath();
        ctx.arc(x + this.xOffset, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = OLColor;
        ctx.fill();
        ctx.closePath();

        //shadow

        if (shadow === true){
            ctx.beginPath();
            ctx.arc(x + this.xOffset - 5, y + 5, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgba(0, 0, 0, .1)";
            ctx.fill();
            ctx.closePath();
        }

        //main color

        ctx.beginPath();
        ctx.arc(x + this.xOffset, y, inline, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

    }

    sidebar(){
        this.Circ(20, "black", 1720, 70, "no")
        this.Circ(20, "black", 1720, 848, "no")
        this.Circ(20, "black", 1780, 848, "no")
        this.Circ(20, "black", 1780, 70, "no")

        this.Rect(1720, 50, 60, 818);
        this.Rect(1700, 70, 100, 778);
        this.Rect(1720, 70, 60, 778,"#ff9f9f");

        this.DrawStroked("S P A C E", 1723, 135, "white", 0)
        this.DrawStroked("L B", 1723, 735, "white", 0)

        this.Rect(1720, 70, 60, 778 - (this.game.player.lavaKillRatio * 778),"rgba(0,0,0,.7)");

        this.sidebarII()
    }
    sidebarII(){
        this.Circ(20, "black", -45, 70, "no")
        this.Circ(20, "black", -45, 848, "no")
        this.Circ(20, "black", -105, 848, "no")
        this.Circ(20, "black", -105, 70, "no")

        this.Rect(-105, 50, 60, 818);
        this.Rect(-125, 70, 100, 778);

        if(this.colorIndex < 5){

            this.Rect(-105, 70, 60, 778,"#ff9fff");

            this.DrawStroked("P R E S T   I G E", -103, 135, "white", 0)
            this.DrawStroked(" P", -103, 735, "white", 0)

        } else {
         
            this.Rect(-105, 70, 60, 778,"#9fff9f");

            this.DrawStroked("A S C E N D", -103, 135, "white", 0)
            this.DrawStroked(" P", -103, 735, "white", 0)
   
        }
        this.Rect(-105, 70, 60, 778 - (this.game.player.growRatio * 778),"rgba(0,0,0,.7)");

    }

    DrawStroked(text, x, y, color = "white", width = 1500, size = 80, shadow = true, stroke = "black", linewidth = 8) {
        ctx.font = `${size}px Sans-serif`;
        ctx.lineWidth = linewidth;
        ctx.lineJoin="miter";
        ctx.miterLimit=2;
        var splitText = this.getLines(ctx, text, width)
        for(let i = 0; i < splitText.length; i++){
            if(shadow == true){
                ctx.strokeStyle = 'rgba(0,0,0,.1)';
                ctx.strokeText(splitText[i], x - 5+ this.xOffset, (y + 5) + (75*i));
            }
            ctx.strokeStyle = stroke;
            
            ctx.strokeText(splitText[i], x+ this.xOffset, y + (75*i));
            ctx.fillStyle = color;
            ctx.fillText(splitText[i], x+ this.xOffset, y + (75*i));
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