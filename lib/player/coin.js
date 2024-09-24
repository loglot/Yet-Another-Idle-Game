export class Coin {
    game
    X
    Y
    velX = 0
    velY = 0
    livingTime
    type
    color
    constructor(time = 500, Game, Type, Color){
        this.game = Game
        this.livingTime = time
        this.type = Type
        this.color = Color

        this.X = Math.floor(Math.random() * 1636) + 20
        this.Y = Math.floor(Math.random() * 878) + 20
    }

    R = 0
    Exists = false
    Collected = 0



    async grow(amount) {
        for(let i = 0; i < amount; i++) {
            this.R++;
            await this.game.sleep(10);
        }
    }

    async spawn() {
        this.R = 5
        this.Exists = true
        await this.grow(10)

    }
} 