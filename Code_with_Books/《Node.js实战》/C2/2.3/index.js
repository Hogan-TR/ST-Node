class Currency {
    constructor(canadiaDollar) {
        this.canadiaDollar = canadiaDollar;
    }
    roundTwo(amount) {
        return Math.round(amount * 100) / 100;
    }
    cTu(canadian) {
        return this.roundTwo(canadian * this.canadiaDollar);
    }
    uTc(us) {
        return this.roundTwo(us / this.canadiaDollar);
    }
}

module.exports = Currency;