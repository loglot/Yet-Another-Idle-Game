export class ShopItem{
    title
    info
    cost 
    growthRate
    growthType  
    
    constructor(T = "unknown", I = "unknown", C = 0, GR = 0, GT = "+"){
        this.title = T
        this.info = I
        this.cost = C
        this.growthRate = GR
        this.growthType = GT
    }

    buy(){
        if(this.growthType == "+"){
            this.cost += this.growthRate
        } else if (this.growthType == "x"){
            this.cost *= this.growthRate
        }
    }
}