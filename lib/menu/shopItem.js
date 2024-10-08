export class ShopItem{
    title
    info
    cost 
    growthRate
    growthType  
    game
    limiting
    amount = 0
    func
    unct
    
    constructor(T = "unknown", I = "unknown", C = 0, GR = 0, GT = "+", fn = function fun(){}, game, limit = NaN, coinRemoval = "collected"){
        this.title = T
        this.info = I
        this.cost = C
        this.growthRate = GR
        this.growthType = GT
        this.game = game
        this.limiting = limit
        this.func = fn
        this.unct = coinRemoval
    }

    buy(){
        var check = false
        if(this.unct == "collected"){
            if(this.game.Collected >= this.cost && this.cost != -1){
                this.game.Collected -= this.cost
                this.amount++
                check = true    
            }
        }else {
            if(this.game.points >= this.cost && this.cost != -1){
                this.game.points -= this.cost
                this.amount++
                check = true    
            }
        }   
        if(check){
            if(this.growthType == "+"){
                this.cost += this.growthRate
            } else if (this.growthType == "x"){
                this.cost *= this.growthRate
            }
            this.cost = Math.ceil(this.cost)
            this.func()
        
        }
            
        if(this.limiting <= this.amount){
            this.cost = -1
        }
    }
}