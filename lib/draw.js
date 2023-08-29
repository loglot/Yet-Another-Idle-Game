let draw = {
    Game() {
        console.log("Frame drawn!")
        keyManager.updateKeys();

        //clear screen

        draw.Rect()

        if (misc.MainMenu) {
          this.DrawStroked("yet another collectathon", 250, 200)
          this.DrawStroked("press space to start", 260, 500)
          this.DrawStroked(`growth on coin: ${player.GrowOnCoin ? "yes" : "no"} (press t to flip)`, 260, 600)
        } else {
            if (coin.Exists) {
                coin.checkPlayerCollision()
                this.Circ(player.R, "#afbfaf", player.X, player.Y, true)
                this.Circ(coin.R, "yellow", coin.X, coin.Y, true)
            
            }
            this.DrawStroked(`${coin.Collected}`, 50, 100)
        }
    },

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
        draw.Circ(20, "black", 20, 20, "no")
        draw.Circ(20, "black", 1656, 20, "no")
        draw.Circ(20, "black", 20, 898, "no")
        draw.Circ(20, "black", 1656, 898, "no")
  
  
        ctx.beginPath();
        ctx.rect(20, 20, 1636, 878);
        ctx.fillStyle = "#90b0c0";
        ctx.fill();
        ctx.closePath();
    },

    Circ(radius, color, x, y, shadow) {
        inline = radius - 5

        //outline

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
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

    },

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
}