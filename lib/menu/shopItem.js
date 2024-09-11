export class ShopItem{
    title
    info
    cost 
    growthRate
    growthType  
    game
    func
    
    constructor(T = "unknown", I = "unknown", C = 0, GR = 0, GT = "+", fn = function fun(){}, game){
        this.title = T
        this.info = I
        this.cost = C
        this.growthRate = GR
        this.growthType = GT
        this.game = game
        this.func = fn
    }

    buy(){
        if(this.growthType == "+"){
            this.cost += this.growthRate
        } else if (this.growthType == "x"){
            this.cost *= this.growthRate
        }
        this.func()
    }
}