let player = {
    R : 5,
    minR : 10,
    maxR : 450,
    startingR : 70,
    X : 838,
    Y : 459
};

let coin = {
    X : Math.floor(Math.random() * 1636) + 20,
    Y : Math.floor(Math.random() * 878) + 20,
    R : 0,
    Exists : false,
    Collected : 0
};

let misc = {
    MainMenu : true,
    GrowPlayerOnCoin : true
};

export { player };
export { coin };
export { misc };